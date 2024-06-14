import style from './FormInput.module.css';
import { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, name, durationType, setDurationType, ...inputProps } =
    props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const today = new Date().toISOString().split('T')[0];


  return (
    <Stack spacing={0.5} sx={{ width: '100%' }}>
      <Typography variant="subtitle2" sx={{ ml: 1.5, color: 'grey' }}>
        {label}
      </Typography>
      <Box className={style.inputContainer} sx={{ display: 'flex', gap: '6px' }}>
        {
          name === 'startDate' &&
          <input
            className={style.formInput}
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            name={name}
            style={{ width: name === 'duration' && '120px' }}
            min={today}
          />
        }

        {
          name === "startTime" &&
          <input
            className={style.formInput}
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            name={name}
            style={{ width: name === 'duration' && '120px' }}
            min={currentTime}
          />
        }

        {
          name !== 'startDate' && name !== 'startTime' &&

          <input
            className={style.formInput}
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            name={name}
            style={{ width: name === 'duration' && '120px' }}

          />
        }
        {name === 'duration' && (
          <select
            className={style.formInput}
            value={durationType}
            style={{ width: '100px', padding: '6px', flexGrow: 0 }}
            onChange={(e) => setDurationType(e.target.value)}
          >
            <option>days</option>
            <option>hours</option>
            <option>minutes</option>
          </select>
        )}


      </Box>
      <Typography className={style.errorMsg}>{errorMessage}</Typography>
    </Stack>
  );
};

export default FormInput;
