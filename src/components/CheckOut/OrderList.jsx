import { Box, Divider, Grid, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import OrderItem from './OrderItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { handleAlert } from '../../utils/handleAlert';
import { useEffect } from 'react';
import { plansAPI } from '../../api/requests/plans';
import ShipingDetails from './index';

const OrderList = ({ planId, selectPlan }) => {
  const [loading, setLoading] = useState(false);
  
  const [validUpTo, setValidUpTo] = useState();
  const planToBuy = JSON.parse(localStorage.getItem('planToBuy'));
  const [price, setPrice] = useState();
  const [currentPlan, setCurrentPlan] = useState();
  const [coupon, setCoupon] = useState('');
  const [month, setMonth] = useState('1');
  const [couponValidate, setCouponValidate] = useState();
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [promoCodeRes, setPromoCodeRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalCal, setTotalCal] = useState({
    Total: price,
    discountPrice: 0,
  });

  const getPriceAfterPromocode = async () => {
    if (!month) {
      setMonth('1');
    }
    if (month === '0') return handleAlert('Month cannot be 0', 'error');
    else if (parseInt(month) < 0) {
      return handleAlert('Month cannot be negative', 'error');
    }
    setIsLoading(true);
    await plansAPI
      .getPriceForOrderedPlan(planId, month, coupon)
      .then((data) => {
        setPrice(data?.actualPrice);
        setIsLoading(false);
        setValidUpTo(data?.validUpTo);
        data?.message !== 'promocode not found'
          ? setCouponValidate(true)
          : setCouponValidate(false);
        if (data?.message !== 'promocode not found') setPromoCodeRes(data && data);
        else {
          setPromoCodeRes(null);
          setTotalCal((prevState) => ({ ...prevState, Total: price, discountPrice: 0 }));
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setCouponValidate(false);
        handleAlert('Promocode not found', 'error');
      });
  };

  useEffect(() => {
    if (planId) {
      setTotalCal((prevState) => ({
        ...prevState,
        Total: promoCodeRes?.price,
        discountPrice: promoCodeRes?.codeDiscount,
      }));
    }
  }, [promoCodeRes]);
  useEffect(() => {
    setLoading(true);
    const promo = coupon !== '' ? coupon : null;
    if (month !== '') {
      plansAPI
        .getPriceForOrderedPlan(planToBuy?.id, month, promo)
        .then((data) => {
          setPrice(data?.actualPrice);
          setLoading(false);
          setTotalCal((prevState) => ({
            ...prevState,
            Total: data?.price,
            discountPrice: data?.codeDiscount,
          }));
          setValidUpTo(data?.validUpTo);
          setCurrentPlan(data?.currentPlanData);
        })
        .catch((err) => {});
    }
  }, [month]);

  return (
    <>
      {' '}
      <ShipingDetails
        price={couponValidate === true ? totalCal.Total : price}
        month={month}
        appliedCoupon={couponValidate === true ? appliedCoupon : ''}
        selectPlan={selectPlan}
        id={planId}
        setMonth={setMonth}
        currentPlan={currentPlan}
        loading={loading}
        validUpTo={validUpTo}
      />
      <Grid item xs={12} md={4} sx={{ px: '16px', mt: { xs: 0, md: 7 } }}>
        <Typography variant="h6" sx={{ color: '#868686' }}>
          Apply Coupon
        </Typography>

        <Divider sx={{ mb: 4 }} />
        {appliedCoupon ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Typography
              variant="caption"
              textAlign={'right'}
              sx={{
                color: '#888888',
                lineHeight: '18px',
              }}
            >
              Applied coupon {coupon}
            </Typography>
          </Box>
        ) : null}
        <form>
          <Box sx={{ display: 'flex' }}>
            <TextField
              error={couponValidate === false}
              helperText={couponValidate === false ? 'invalid coupon.' : null}
              variant="standard"
              placeholder="Enter Coupon"
              fullWidth={true}
              sx={{ display: 'inline' }}
              value={coupon}
              onChange={(event) => {
                setCoupon(event.target.value);
              }}
            />
            <LoadingButton
              variant={'contained'}
              loadingPosition="start"
              size={'small'}
              display="inline"
              sx={{ borderRadius: '0px', height: '32px', width: '120px' }}
              color={couponValidate === false ? 'ErrorBtn' : 'primary'}
              onClick={() => {
                getPriceAfterPromocode();
              }}
              loading={isLoading}
              disabled={!coupon}
            >
              apply
            </LoadingButton>
          </Box>
        </form>

        <Divider sx={{ pt: 4 }} />

        {couponValidate === true ? (
          <Box>
            <Box
              sx={{
                pt: 4,
                pb: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '18px' }}>
                Sub Total
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '18px' }}>
                ₹ {price}
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '18px' }}>
                Discount
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '18px' }}>
                - ₹ {totalCal?.discountPrice}
              </Typography>
            </Box>
          </Box>
        ) : null}

        <Box
          sx={{
            pb: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '18px' }}>
            Total
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '18px' }}>
            ₹ {couponValidate ? totalCal?.Total : price}
          </Typography>
        </Box>
        <Button
          fullWidth={true}
          variant={'contained'}
          size={'small'}
          sx={{ py: 1, borderRadius: '0px' }}
          onClick={(e) => {
            if (month === '0') return handleAlert('Month cannot be 0', 'error');
            if (!month) setMonth('1');
            else if (parseInt(month) < 0) {
              return handleAlert('Month cannot be negative', 'error');
            }
            if (couponValidate === true) {
              selectPlan(e, planId, month, coupon);
            } else selectPlan(e, planId, month);
          }}
        >
          PURCHASE ₹ {couponValidate ? totalCal?.Total : month > 1 ? price * month : price}
        </Button>
        <Divider />
      </Grid>
    </>
  );
};

export default OrderList;
