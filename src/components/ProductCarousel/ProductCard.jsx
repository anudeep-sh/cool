import React from 'react';
import { ContainerOfTitle, VideoSliderContainer } from '../../Styles/VideoSlider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductCard = ({ title, dataRender }) => {
  // this above props coming from ProductCarousel file
  // const { loading = false } = props;

  return (
    <>f
      <VideoSliderContainer>
        <Grid>
          <ContainerOfTitle variant="h5">{title}</ContainerOfTitle>
          <Grid container wrap="nowrap">
            {dataRender.map((item, index) => (
              <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 4 }}>
                {item ? (
                  <img
                    className="product-img"
                    style={{ width: '100%', height: 118, objectFit: 'cover' }}
                    alt={item.title}
                    src={item.src}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}

                {item ? (
                  <Box sx={{ pr: 2 }}>
                    <Typography gutterBottom variant="body2">
                      {item.title}
                    </Typography>
                    <Typography display="block" variant="caption" color="text.secondary">
                      {item.channel}
                    </Typography>
                    <Box
                      sx={{
                        mt: 0.5,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{ mr: 0.5, fontWeight: '500' }}
                        variant="caption"
                        color="#faaf00"
                      >
                        {item.views}
                      </Typography>
                      <Stack spacing={1} sx={{ mr: 0.5 }}>
                        <Rating
                          sx={{ fontSize: '12px' }}
                          name="half-rating"
                          defaultValue={item.views}
                          precision={0.5}
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {` (${item.createdAt})`}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                )}
              </Box>
            ))}
          </Grid>
        </Grid>
      </VideoSliderContainer>
    </>
  );
};

export default ProductCard;
