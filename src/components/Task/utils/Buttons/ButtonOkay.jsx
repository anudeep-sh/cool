import { Button, Box } from '@mui/material';

const ButtonOkay = ({ setOpen }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        size="small"
        sx={{ maxWidth: 'fit-content', minWidth: 'fit-content', px: 2 }}
        variant="contained"
        onClick={() => setOpen(false)}
      >
        Okay
      </Button>
    </Box>
  );
};

export default ButtonOkay;
