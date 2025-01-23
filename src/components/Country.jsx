
import { useState } from "react";

function Country() {
  const [name, setName] = useState("United States");
  const [gold, setGold] = useState(0);

  function handleClick() {
    setGold(gold + 1);
  }

  return (
    <div className="country">
      <div className="country-name">{name}</div>
      <div className="medal-container">
        <div className="medal-count">Gold medals: {gold}</div>
        <button className="medal-button" onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
}

export default Country;