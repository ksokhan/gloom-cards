import React from 'react';
import './Header.css'

export const Header = ({
  switchCharacter,
  toggleEditing,
  editing,
  cards,
  classes,
  character
}) => (
  <div>
    <div className="character-panel">
      <select
        className="character-picker"
        value={character || ''}
        onChange={(event) => switchCharacter(event.target.value)}
        >
          <option value="" disabled>Pick a character</option>
        {Object.keys(classes).map( (item, i) => (
          <option value={item} key={i}>{item}{classes[item].locked ? ' (locked)' : ''}</option>
        ))}
      </select>
    </div>

    <div className="edit-cards-panel">
      {cards.reduce( (prev, card) => {
        return card.visible ? prev + 1 : prev
      }, 0)} of {cards.length}

      <span
        className="edit-cards"
        onClick={toggleEditing}
      >
        {editing ? "Done" : "Edit available cards"}
      </span>
    </div>
  </div>
)
