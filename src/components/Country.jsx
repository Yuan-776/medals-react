import Medal from "./Medal";

export default function Country({ country, medals, onDelete }) {
  return (
    <div className="country">
      <div className="country-header">
        <div className="country-name">{country.name}</div>
        <button 
          className="delete-button" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(country.id);
          }}
          aria-label="Delete country"
        >
          🗑️
        </button>
      </div>
      <div className="medals-container">
        {medals.map(medal => (
          <Medal key={medal.id} name={medal.name} />
        ))}
      </div>
    </div>
  );
}