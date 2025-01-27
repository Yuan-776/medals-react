export default function Country({ country, onDelete }) {
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
      <div className="medal-info">
        Gold medals: {country.gold}
      </div>
    </div>
  );
}