import { Box, Grid } from '@mui/material';
import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from './ProductCard';

const ProductCarousel = ({ Title, dataFromHome }) => {
  const btnPressnext = () => {};
  const btnPressPrev = () => {};
  return (
    <>
      <Grid className="product-carousel" sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            border: 'none',
            height: '90%',

            position: 'absolute',
            top: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            left: 0,
          }}
        >
          <button
            className="prev-btn"
            onClick={btnPressPrev}
            variant="contained"
            style={{
              border: 'none',
              borderRadius: '500%',
              padding: '12px',
              cursor: 'pointer',
              background: '#1C1D1f',
              boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 16, color: '#fff' }} />
            </Box>
          </button>
        </Box>
        <Box
          sx={{
            border: 'none',
            width: '60px',
            height: '90%',

            position: 'absolute',
            top: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            right: 0,
          }}
        >
          <button
            className="next-btn"
            onClick={btnPressnext}
            variant="contained"
            style={{
              border: 'none',
              borderRadius: '100%',
              padding: '12px',
              cursor: 'pointer',
              background: '#1C1D1f',
              boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 16, color: '#fff' }} />
            </Box>
          </button>
        </Box>
        <Grid
          container
          wrap="nowrap"
          className="product-container"
          sx={{ overflowX: 'hidden', scrollBehavior: 'smooth' }}
        >
          {/* this props is coming from Home then from ProductCarousel to ProductCard then it will be map on ProductCard page */}
          <ProductCard title={Title} dataRender={dataFromHome} />
        </Grid>
      </Grid>
    </>
  );
};
export default ProductCarousel;
