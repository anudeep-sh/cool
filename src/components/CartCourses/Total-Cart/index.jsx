import { Button, Grid, Typography } from '@mui/material';
import { Box, margin } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TotalCart = ({ title, price }) => {
  const cartItems = useSelector((state) => state.CartReducer.cartItems);

  const navigate = useNavigate();
  const handleGoToCheckOut = () => {
    navigate('/check-out');
  };

  return (
    <>
      {cartItems?.length ? (
        <>
          <Grid
            item
            sx={{
              backgroundColor: ' #FAFCFE',
              padding: '8px 16px',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontSize: { xs: '16px', md: '18px' }, fontWeight: '700' }}
            >
              {`${title}`}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              border: '1px solid #F0EFF2',
              padding: ' 16px',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Typography variant="h5" sx={{ fontSize: '28px', fontWeight: '700' }}>
              ₹ {price}
            </Typography>

            <Button
              fullWidth={true}
              variant={'contained'}
              size={'small'}
              sx={{ py: 1, mt: 2 }}
              onClick={() => handleGoToCheckOut()}
              // disabled={CartLength.length}
            >
              CHECK OUT
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              position: 'fixed',
              bottom: '0px',
              width: '-webkit-fill-available',
              justifyContent: 'space-between',
              mt: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              border: '1px solid #F0EFF2',
              padding: ' 16px',
              boxShadow: '0px 0px 10px rgb(0 0 0 / 10%)',
              backgroundColor: '#fff',
              margin: { sm: '0px -16px -16px -16px' },
            }}
          >
            <Typography variant="h5" sx={{ fontSize: '28px', fontWeight: '700' }}>
              ₹ {price}
            </Typography>
            <Button
              variant={'contained'}
              size={'medium'}
              sx={{ px: 2, py: 1 }}
              onClick={() => handleGoToCheckOut()}
              // disabled={CartLength.length}
            >
              CHECK OUT
            </Button>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default TotalCart;
