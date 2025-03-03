import axios from "axios";
import { useState, useEffect } from "react";
import Country from "./components/Country";
import NewCountry from "./components/NewCountry";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = "/api/country";
  const handleDelete = async (countryId) => {
    const originalCountries = countries;
    
    setCountries(countries.filter((c) => c.id !== countryId));
    
    try {
      await axios.delete(`${apiEndpoint}/${countryId}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("The record does not exist - it may have already been deleted");
      } else {
        console.error("An error occurred while deleting a country:", ex);
        setCountries(originalCountries);
      }
    }
  };

  const handleAddCountry = async (name) => {
    try {
      const newCountry = {
        name: name,
        gold: 0,
        silver: 0,
        bronze: 0
      };
      
      const { data: savedCountry } = await axios.post(apiEndpoint, newCountry);
      
      setCountries([...countries, savedCountry]);
    } catch (ex) {
      console.error("Error adding country:", ex);
      alert("Failed to add country. Please try again.");
    }
  };

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
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: fetchedCountries } = await axios.get(apiEndpoint);
        setCountries(fetchedCountries);
      } catch (ex) {
        console.error("Error fetching countries:", ex);
        setCountries([
          { id: 1, name: "United States", gold: 2, silver: 2, bronze: 3 },
          { id: 2, name: "China", gold: 3, silver: 1, bronze: 0 },
          { id: 3, name: "France", gold: 0, silver: 2, bronze: 2 }
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const totalMedals = countries.reduce((total, country) => {
    return total + country.gold + country.silver + country.bronze;
  }, 0);

  if (loading && countries.length === 0) {
    return <div className="app-header">Loading countries...</div>;
  }

  return (
    <div>
      <header className="app-header">Olympic Medals {totalMedals}</header>
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