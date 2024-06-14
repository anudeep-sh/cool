import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import '../../App.css';

const ReponsiveCarousel = ({ Title, dataFromHome }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
      <h1>{Title}</h1>
      <Carousel
        swipeable={true}
        draggable={false}
        // showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        keyBoardControl={true}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        // customRightArrow={ <ArrowBackIosNewIcon sx={{ fontSize: 16, color: "#fff" }} />}
      >
        {/* <Grid wrap="nowrap"> */}
        {dataFromHome.map((item, index) => (
          <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 4 }} className="Card-container">
            {item ? (
              <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
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
                  <Typography sx={{ mr: 0.5, fontWeight: '500' }} variant="caption" color="#faaf00">
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
      </Carousel>
    </>
  );
};

export default ReponsiveCarousel;
