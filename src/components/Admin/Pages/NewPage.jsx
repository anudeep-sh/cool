import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';

const NewPage = () => {
  const [api, setApi] = useState([{ apiMethod: '', link: '', description: '' }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...api];
    list[index][name] = value;
    setApi(list);
  };

  const handleAddClick = () => {
    setApi([...api, { apiMethod: '', link: '', description: '' }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...api];
    list.splice(index, 1);
    setApi(list);
  };

  return (
    <div>
      {api.map((item, index) => {
        return (
          <div key={index}>
            <TextField
              type="text"
              name="link"
              value={item.apiMethod}
              onChange={(e) => handleInputChange(e, index)}
            />
            <select
              name="apiMethod"
              value={item.apiMethod}
              onChange={(e) => handleInputChange(e, index)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <TextField
              type="text"
              name="link"
              value={item.link}
              onChange={(e) => handleInputChange(e, index)}
            />
            <TextField
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleInputChange(e, index)}
            />
            {api.length !== 1 && <button onClick={() => handleRemoveClick(index)}>Remove</button>}
          </div>
        );
      })}
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default NewPage;
