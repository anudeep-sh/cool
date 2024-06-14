import React, { memo } from 'react';
import Grid from '@mui/material/Grid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../../components/ProductCarousel/Product.css';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Skeletons from '../../Skeleton/Skeletons';
import EditProblemCard from './EditProblemCard';

const EditProblemCarousel = ({ title, dataRender, loading }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 6000, min: 1024 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
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

  const navigate = useNavigate();

  return (
    <>
      <Grid>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            display: '-webkit-box!important',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: ' vertical',
          }}
        >
          {title}
        </Typography>

        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          keyBoardControl={true}
          removeArrowOnDeviceType={['mobile']}
        >
          {loading ? (
            <Box sx={{ display: 'flex' }} className="mainSkeletonContainer">
              <Skeletons type="feed1" />
            </Box>
          ) : dataRender.length ? (
            dataRender.map((item, index) => {
              return <EditProblemCard key={index} Problem={item} loading={loading} />;
            })
          ) : (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                sx={{ p: 4, justifyItems: 'center' }}
              >
                <Box>
                  <Typography
                    sx={{
                      m: 'auto',
                      fontWeight: '200',
                      fontSize: '13px',
                    }}
                    paragraph
                  >
                    No Problems Here,
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Carousel>
      </Grid>
    </>
  );
};

export default memo(EditProblemCarousel);
