import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { BannerContainerImage } from '../../theme/Banner';
import { Paper, Typography } from '@mui/material';
import { ContainerOfTitle } from '../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { fetchAllImages } from '../../utils/images';

const UpcomingContestCarousel = (props) => {
  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  const data = [];
  if (imagesObj) {
    Object.keys(imagesObj).forEach((key) => {
      if (key.includes('upcoming_contest_carousel_banner')) {
        data.push(imagesObj[key]);
      }
    });
  }

  useEffect(() => {
    (async () => {
      {
        await fetchAllImages();
      }
    })();
  }, []);

  return (
    <>
      <Grid container mt={4}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            bgcolor: '#FAFCFE',
            p: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EmojiEventsOutlinedIcon
            sx={{
              mb: 0,
              padding: 0,
              fontSize: { xs: '16px', lg: '20px' },
              mr: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: '700', fontSize: { xs: '16px', lg: '18px' } }}>
            Upcoming Contests
          </Typography>
        </Grid>
        <Grid
          sx={{
            border: 1,
            borderColor: '#e5e5e5',
            backgroundColor: '#g1g1g1',
            width: '100%',
          }}
        >
          <Carousel
            indicators={false}
            sx={{
              width: '99%',
              // height: { lg: "400px", md: "240px", sm: "260px" },
              height: { md: '180px', lg: '200px' },
            }}
            className="carousel1"
          >
            {data.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </>
  );

  function Item(props) {
    return (
      <Paper sx={{ boxShadow: 'none' }} className="carousel-item">
        <BannerContainerImage src={props.item} />
      </Paper>
    );
  }
};

export default UpcomingContestCarousel;
