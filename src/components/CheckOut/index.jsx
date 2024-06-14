import {
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  CircularProgress,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';


const ShipingDetails = ({ month, setMonth, currentPlan, loading, validUpTo }) => {
  
  const planToBuy = JSON.parse(localStorage.getItem('planToBuy'));
  const planPrice = planToBuy?.price;
  const userProfile = useSelector((state) => state.UserReducer.userData);
  const planDescription = planToBuy?.description;

  const planName = planToBuy?.name;
  return (
    <>
      <Grid item xs={12} md={8} sx={{ px: '16px' }}>
        <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: '28px', md: '34px' } }}>
          Checkout
        </Typography>

        <Typography variant="h7" sx={{ color: '#868686', fontWeight: '600' }}>
          Plan details
        </Typography>
        <Divider />
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" sx={{ pb: 0.5, fontSize: '18px' }}>
              {planName}
            </Typography>
            <Typography variant="body2" sx={{ pb: 0.5 }}>
              {planDescription}
            </Typography>
            <Typography variant="body2" sx={{ pb: 0.5, fontSize: '18px' }}>
              ₹{planPrice}/month
            </Typography>
            <Typography variant="body2" sx={{ pb: 0.5, fontSize: '18px' }}>
              Valid Upto: {new Date(parseInt(validUpTo)).toDateString().slice(4)}
            </Typography>
          </Box>
          <br />
          <Box
            sx={{
              width: '20%',
            }}
          >
            <TextField
              required
              id="outlined-basic"
              label="Months"
              type="number"
              variant="outlined"
              inputProps={{ min: 1 }}
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box sx={{ py: 4 }}>
          <Accordion style={{ backgroundColor: '#eee' }}>
            <AccordionSummary expandIcon={loading ? <CircularProgress /> : <ArrowDropDownIcon />}>
              <Typography sx={{ fontWeight: '600' }}>Current plan details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ pb: 0.5, fontSize: '18px' }}>
                {currentPlan?.name}
              </Typography>
              <Typography variant="body2" sx={{ pb: 0.5 }}>
                {currentPlan?.description}
              </Typography>
              <Typography variant="body2" sx={{ pb: 0.5, fontSize: '18px' }}>
                ₹ {currentPlan?.price}/month
              </Typography>
              {currentPlan?.validUpTo !== 0 && (
                <Typography variant="body2" sx={{ pb: 0.5, fontSize: '18px' }}>
                  Valid upto : {new Date(parseInt(currentPlan?.validUpTo)).toDateString().slice(4)}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </>
  );
};

export default ShipingDetails;
