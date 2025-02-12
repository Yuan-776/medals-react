import { useState } from "react";
import Country from "./components/Country";
import NewCountry from "./components/NewCountry";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([
    { id: 1, name: "United States", gold: 2, silver: 2, bronze: 3 },
    { id: 2, name: "China", gold: 3, silver: 1, bronze: 0 },
    { id: 3, name: "France", gold: 0, silver: 2, bronze: 2 },
  ]);

  function handleDelete(countryId) {
    setCountries(countries.filter((c) => c.id !== countryId));
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

  function handleAddCountry(name) {
    const newId = Math.max(...countries.map(c => c.id)) + 1;
    const newCountry = {
      id: newId,
      name: name,
      gold: 0,
      silver: 0,
      bronze: 0
    };
    setCountries([...countries, newCountry]);
  }

  const totalMedals = countries.reduce((total, country) => {
    return total + country.gold + country.silver + country.bronze;
  }, 0);

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