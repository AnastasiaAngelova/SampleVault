import React, { useState } from 'react';

import "./Dropdown.css"

function Dropdown({ onChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  // ToDo: сделать dropdown не стандартным элементом
  return (
    <div>
      <select className="generation-dropdown" onChange={handleChange}>
        <option value="option1">Промпт</option>
        <option value="option2">Изображение</option>
        <option value="option3">Аудио</option>
      </select>
    </div>
  );
}

export default Dropdown;