import { useState, useEffect } from "react";
import Country from "./components/Country";
import NewCountry from "./components/NewCountry";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://medals-api-6.azurewebsites.net/api/country";

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setCountries(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching countries:", err);
      setError("Failed to load countries from API. Using local data.");
      
      setCountries([
        { id: 1, name: "United States", gold: 2, silver: 2, bronze: 3 },
        { id: 2, name: "China", gold: 3, silver: 1, bronze: 0 },
        { id: 3, name: "France", gold: 0, silver: 2, bronze: 2 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  async function handleDelete(countryId) {
    try {
      setCountries(countries.filter((c) => c.id !== countryId));
      
      const response = await fetch(`${API_URL}/${countryId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }
    } catch (err) {
      console.error("Error deleting country:", err);
    }
  }

  function handleIncrement(countryId, medalType) {
    const countriesCopy = [...countries];
    const idx = countriesCopy.findIndex((c) => c.id === countryId);
    countriesCopy[idx][medalType] += 1;
    setCountries(countriesCopy);
  }

  function handleDecrement(countryId, medalType) {
    const countriesCopy = [...countries];
    const idx = countriesCopy.findIndex((c) => c.id === countryId);
    if (countriesCopy[idx][medalType] > 0) {
      countriesCopy[idx][medalType] -= 1;
      setCountries(countriesCopy);
    }
  }

  async function handleAddCountry(name) {
    try {
      const tempId = Math.max(...countries.map(c => c.id), 0) + 1;
      const newCountry = {
        id: tempId,
        name: name,
        gold: 0,
        silver: 0,
        bronze: 0
      };
      
      setCountries([...countries, newCountry]);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          gold: 0,
          silver: 0,
          bronze: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`Add country failed: ${response.status}`);
      }

    } catch (err) {
      console.error("Error adding country:", err);
    }
  }

  const totalMedals = countries.reduce((total, country) => {
    return total + country.gold + country.silver + country.bronze;
  }, 0);

  if (loading && countries.length === 0) {
    return <div className="app-header">Loading countries...</div>;
  }

  return (
    <div>
      <header className="app-header">
        Olympic Medals {totalMedals}
        {error && (
          <div className="medal-totals" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </header>
      <div className="countries-container">
        {countries.map((country) => (
          <Country 
            key={country.id} 
            country={country} 
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <NewCountry onAdd={handleAddCountry} />
    </div>
  );
}

export default App;