import { useState } from 'react';
import trigger from '../assets/trigger.svg';

export default function NewCountry({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      onAdd(trimmedName);
      setName('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <img 
        src={trigger}
        alt="New Country" 
        id="trigger" 
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <>
          <div id="overlay" onClick={() => setIsOpen(false)} />
          <form id="dialog" onSubmit={handleSubmit}>
            <h2>Enter new country name</h2>
            <div>
              <input
                id="text"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="enter name"
                autoFocus
              />
            </div>
            <div>
              <button 
                id="save"
                type="submit" 
                disabled={!name.trim()}
              >
                save
              </button>
            </div>
            <div>
              <button 
                id="cancel"
                type="button" 
                onClick={() => {
                  setIsOpen(false);
                  setName('');
                }}
              >
                cancel
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}