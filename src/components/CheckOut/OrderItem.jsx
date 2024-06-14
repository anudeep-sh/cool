import { CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import defaultImage from '../../assets/CourseImages/Thumbnail.png';

const OrderItem = ({ item, promoCodeRes, discountPriceFromOrderList }) => {
  const [itemMatched, setItemMatched] = useState(true);
  const [isCouponShow, setIsCouponShow] = useState(false);
  const [showDiscont, setShowDiscont] = useState(false);

  useEffect(() => {
    if (promoCodeRes?.filter((item2) => item2?.courseId === item?.id).length) {
      setIsCouponShow(true);
    } else {
      setIsCouponShow(false);
    }
  }, [item, promoCodeRes]);

  useEffect(() => {
    if (promoCodeRes?.filter((course) => course?.courseId === item?.id).length) {
      setShowDiscont(true);
    } else {
      setShowDiscont(false);
    }
  }, [item, promoCodeRes]);

  return (
    <>
      <Grid container sx={{ paddingBottom: 2 }}>
        <Grid item xs={3} sx={{ paddingRight: 1.5 }}>
          <img
            component="img"
            style={{
              height: '80px',
              objectFit: 'cover',
              width: '100%',
            }}
            alt={item.title}
            src={item.imageUrl}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultImage;
            }}
          />
        </Grid>
        <Grid item xs={9} md={6}>
          <Typography
            gutterBottom
            variant="body2"
            sx={{
              fontWeight: '500',
              display: '-webkit-box!important',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
          >
            {item?.title}
          </Typography>
          {isCouponShow
            ? promoCodeRes?.map((dataitem, index) => {
                if (dataitem.courseId === item.id)
                  return (
                    <Typography
                      variant="body2"
                      sx={{ color: '#698AFF', fontWeight: '300!important' }}
                      key={index}
                    >{`Coupon Discount: ₹ ${dataitem.discountPrice}`}</Typography>
                  );
              })
            : null}
          <Typography sx={{ display: 'block!important' }} gutterBottom variant="caption">
            {'Anudeep'}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: '400',
              display: { xs: 'block', md: 'none' },
              lineHeight: '20px',
            }}
          >
            ₹ {item?.price}
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          sx={{
            paddingLeft: 1.5,
            alignContent: 'end',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: '400',
            }}
          >
            ₹ {item?.price}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default OrderItem;
