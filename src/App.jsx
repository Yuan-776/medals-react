import { useState } from "react";
import Country from "./components/Country";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([
    { id: 1, name: "United States", gold: 2, silver: 2, bronze: 3 },
    { id: 2, name: "China", gold: 3, silver: 1, bronze: 0 },
    { id: 3, name: "France", gold: 0, silver: 2, bronze: 2 },
  ]);

  function handleDelete(countryId) {
    console.log(`delete country: ${countryId}`);
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

  function getTotalMedalCount(medalType) {
    return countries.reduce((sum, country) => sum + country[medalType], 0);
  }

  const totalMedals = getTotalMedalCount('gold') + 
                      getTotalMedalCount('silver') + 
                      getTotalMedalCount('bronze');

  return (
    <div>
      <header className="app-header">
        <div>Olympic Medals {totalMedals}</div>
        <div className="medal-totals">
          Gold: {getTotalMedalCount('gold')}, 
          Silver: {getTotalMedalCount('silver')}, 
          Bronze: {getTotalMedalCount('bronze')}
        </div>
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
    </div>
  );
}

export default App;