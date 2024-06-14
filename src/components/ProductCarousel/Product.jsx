import React, { memo } from 'react';
import Grid from '@mui/material/Grid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Product.css';
import Skeletons from '../Skeleton/Skeletons';
import CarouselItem from './CarouselItem';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getOrgName } from '../../utils/appendOrgQuery';

const Product = ({
  title,
  dataRender,
  loading,
  isEditable,
  isUserProfileInProduct,
  domainData,
  getCourses,
  courses,
  accessCourses,
  disableHover,
  showDescription,
  containerHeight,
  forSuggestedOrgPopup,
}) => {
  const orgName = getOrgName();
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
      <Grid
        sx={{
          backgroundColor: '#F7F7F7',
          borderRadius: '15px',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          padding: '10px',
          p: '12px',
          overflow: 'scroll',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            display: '-webkit-box!important',
            // WebkitLineClamp: 1,
            // overflow: 'scroll',
            // textOverflow: 'ellipsis',
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
          className="carousel"
        >
          {loading ? (
            <Box sx={{ display: 'flex' }} className="mainSkeletonContainer">
              <Skeletons type="feed1" />
            </Box>
          ) : dataRender?.length > 0 ? (
            dataRender?.map((item, index) => {
              return (
                <>
                  {
                    <CarouselItem
                      forSuggestedOrgPopup={forSuggestedOrgPopup}
                      ProductDetails={item}
                      key={index}
                      category={item.categories.split(',')}
                      techStack={item.techStack.split(',')}
                      keyfrombackend={item?.id}
                      loading={loading}
                      isEditable={isEditable}
                      isUserProfileInProduct={isUserProfileInProduct}
                      draggable={false}
                      domainData={domainData}
                      getCourses={getCourses}
                      title={title}
                      disableHover={disableHover}
                      showDescription={showDescription}
                      containerHeight={containerHeight}
                    />
                  }
                </>
              );
            })
          ) : (
            <>
              {isUserProfileInProduct ? (
                <>
                  {courses?.length === 0 ? (
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
                          No Courses, you can create your course from
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/org/${orgName}/course/create`);
                          }}
                        >
                          Create Course
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  )}
                  {accessCourses?.length === 0 ? (
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
                          Currently, no Courses are available.
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
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
                      No Courses to show here.
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Carousel>
      </Grid>
    </>
  );
};

export default memo(Product);
