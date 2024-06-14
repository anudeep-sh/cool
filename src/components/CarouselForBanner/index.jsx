import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CardMedia, Paper } from '@mui/material';

const Carousel1 = ({ BannerImages, lgHeight, mb }) => {
  return (
    <>
      <Carousel
        sx={{
          width: '100%',
          height: { lg: lgHeight, md: '240px', xs: '240px' },
          marginBottom: mb,
        }}
        className="carousel1"
      >
        {BannerImages &&
          BannerImages?.map((item, index) => {
            return <Item item={item} key={index} />;
          })}
      </Carousel>
    </>
  );

  function Item({ item, index }) {
    return (
      <Paper sx={{ boxShadow: 'none' }} className="carousel-item">
        <CardMedia
          image={item}
          sx={{
            height: { xs: '240px', md: '260px', lg: lgHeight },
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
          }}
        />
      </Paper>
    );
  }
};

export default Carousel1;
