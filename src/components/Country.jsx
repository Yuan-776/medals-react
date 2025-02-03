import Medal from "./Medal";

export default function Country({ country, onIncrement, onDecrement, onDelete }) {
  const totalMedals = country.gold + country.silver + country.bronze;
  const medals = [
    { name: 'gold', label: 'gold medals:', count: country.gold },
    { name: 'silver', label: 'silver medals:', count: country.silver },
    { name: 'bronze', label: 'bronze medals:', count: country.bronze }
  ];

  return (
    <div className="country">
      <div className="country-header">
        <div className="country-name">{country.name}</div>
        <div>{totalMedals}</div>
        <button 
          className="delete-button" 
          onClick={() => onDelete(country.id)}
          aria-label="Delete country"
        >
          🗑️
        </button>
      </div>
      <div className="medals-container">
        {medals.map(medal => (
          <Medal 
            key={medal.name}
            name={medal.name}
            label={medal.label}
            count={medal.count}
            countryId={country.id}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ))}
      </div>
    </div>
  );
}