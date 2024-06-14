import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import OrderList from '../../components/CheckOut/OrderList';
import Skeletons from '../../components/Skeleton/Skeletons';
import { plansAPI } from '../../api/requests/plans';

const CheckOut = () => {
  const drawerWidth = 240;
  const [loading, setLoading] = useState(false);
  const planToBuy = JSON.parse(localStorage.getItem('planToBuy'));
  const planId = planToBuy?.id;
  const planPrice = planToBuy?.price;
  const selectPlan = async (e, planId, month, coupon) => {
    await handlePayment(e, planId, month, coupon);
  };
  function isDate(val) {
    return Object.prototype.toString.call(val) === '[object Date]';
  }

  function isObj(val) {
    return typeof val === 'object';
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', action);

    Object.keys(params)?.forEach((key) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    setLoading(false);
    form.submit();
    form.remove();
  }

  const getData = async (data) => {
    setLoading(false);
    try {
      const response = await plansAPI.PlansPayment(data);
      return response;
    } catch (err) {
      return console.log(err);
    }
  };

  const handlePayment = async (e, planId, planMonth, code) => {
    const months = parseInt(planMonth);
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      getData({ planId, months, code })
        .then((response) => {
          var information = {
            action: 'https://securegw.paytm.in/order/process',
            params: response,
          };
          post(information);
        })
        .catch((err) => {});
    }, 1500);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          p: { xs: 0, md: 0, lg: 4 },
          m: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
            <Skeletons type="CircularLoader" />
          </Box>
        ) : (
          <>
            <OrderList price={planPrice} planId={planId} selectPlan={selectPlan} />
          </>
        )}
      </Grid>
    </>
  );
};
export default CheckOut;
