export default function Medal({ name, label, count, onIncrement, onDecrement, countryId }) {
  return (
    <div className="medal-row">
      <span>{label}</span>
      <div className="medal-controls">
        <button 
          className="medal-button"
          onClick={() => onDecrement(countryId, name)}
          disabled={count === 0}
        >
          -
        </button>
        <span className="medal-count">{count}</span>
        <button 
          className="medal-button"
          onClick={() => onIncrement(countryId, name)}
        >
          +
        </button>
      </div>
    </div>
  );
}