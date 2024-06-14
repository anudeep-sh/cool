import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.ChipColor.main,
  color: theme.palette.ChipColor.contrastText,
  textTransform: 'capitalize',
  boxShadow: 'none',
  fontSize: '12px',
  borderRadius: '20px',
  '&:hover': {
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.01), 0px 1px 5px 0px rgba(0,0,0,0.02)',
    backgroundColor: theme.palette.ChipColor.main,
  },
  border: '1px solid #DEE6FB',
  '&.Mui-disabled': {
    color: 'black',
  },
}));

const ReusableButton = ({ Title, onClick, size, disabled }) => (
  <StyledButton
    variant="contained"
    onClick={onClick}
    size={size}
    disabled={disabled}
    sx={{
      p: { xs: '2px 12px!important', md: '6px 16px!important' },
      fontWeight: { xs: '400', md: '500' },
    }}
  >
    {Title}
  </StyledButton>
);

export default ReusableButton;
