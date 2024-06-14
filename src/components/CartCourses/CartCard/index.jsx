import { Button, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo } from 'react';
import defaultImage from '../../../assets/CourseImages/Thumbnail.png';

const CartCard = ({
  ItemDetails,
  title,
  btnTitle,
  handleClickRemove,
  handleClickMoveTo,
  TitleForEmptyCartOrWhislist,
  loading,
}) => {
  return (
    <>
      <Grid item sx={{ backgroundColor: ' #FAFCFE', padding: '8px 16px' }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: { xs: '16px', md: '18px' }, fontWeight: '700' }}
        >
          {`${ItemDetails?.length} ${title}`}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          border: { xs: 'none', md: '1px solid #F0EFF2' },
          padding: { xs: 0, md: '8px 16px' },
        }}
      >
        {ItemDetails?.length ? (
          ItemDetails?.map((item, index) => {
            return (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{
                  py: '12px',
                  px: '12px',
                  backgroundColor: '#fff',
                  my: '8px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.10)',
                  width: 'calc(100%)!important',
                  marginLeft: '0px!important',
                }}
              >
                <Grid
                  item
                  xs={3}
                  md={2}
                  sx={{
                    paddingTop: '0px!important',
                    paddingLeft: '0px!important',
                  }}
                >
                  <img
                    component="img"
                    style={{
                      width: '100%',
                      height: 70,
                      objectFit: 'cover',
                    }}
                    src={item?.imageUrl}
                    alt="green iguana"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = defaultImage;
                    }}
                  />
                </Grid>
                <Grid item xs={9} md={10} sx={{ paddingTop: '0px!important' }}>
                  <Grid container spacing={2}>
                    <Grid item md={8}>
                      <Typography
                        gutterBottom
                        variant="body1"
                        sx={{
                          display: '-webkit-box!important',
                          fontWeight: '700',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitBoxOrient: ' vertical',
                        }}
                      >
                        {item?.title}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Typography
                          display="block"
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            mr: 2,
                            display: '-webkit-box!important',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitBoxOrient: ' vertical',
                          }}
                        >
                          {item?.authorData?.username}
                        </Typography>
                        <Typography
                          sx={{ mr: 0.5, fontWeight: '500' }}
                          variant="caption"
                          color="#faaf00"
                        >
                          {item?.rating?.rating}
                        </Typography>
                        <Stack spacing={1} sx={{ mr: 0.5 }}>
                          <Rating
                            sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                            name="half-rating"
                            value={item?.rating?.rating}
                            precision={1}
                            readOnly
                          />
                        </Stack>
                        <Typography
                          display="block"
                          variant="caption"
                          sx={{ mr: 1.5 }}
                          color="text.secondary"
                        >
                          {`(${item?.rating?.ratedBy})`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'block' }}>
                        <Typography variant="caption" color="text.secondary">
                          {`Total Videos ${item?.videosCount}`}
                        </Typography>
                        <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
                          {`Total Sections ${item?.sectionsCount}`}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{
                        textAlign: { xs: 'left', md: 'right' },
                        paddingTop: {
                          xs: '8px!important',
                          md: '16px!important',
                        },
                      }}
                    >
                      <Typography
                        display="inline"
                        variant="body1"
                        sx={{ fontWeight: '700', textAlign: 'right' }}
                      >
                        ₹ {item?.price}
                      </Typography>
                      <Typography
                        display="inline"
                        variant="body2"
                        sx={{
                          color: '#c4c4c4',
                          textAlign: 'right',
                          ml: 1.5,
                          textDecoration: 'line-through',
                        }}
                      >
                        ₹ {item?.price}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      textAlign: 'right',
                      mt: { xs: '12px', sm: '0px' },
                    }}
                  >
                    <Button
                      onClick={() => handleClickMoveTo(item)}
                      sx={{
                        paddingBottom: '0px',
                        paddingTop: '0px',
                        mr: 0.5,
                        fontSize: '12px',
                        textTransform: { xs: 'none', sm: 'uppercase' },
                      }}
                      variant="text"
                    >
                      {btnTitle}
                    </Button>
                    <Button
                      sx={{
                        paddingBottom: '0px',
                        paddingTop: '0px',
                        fontSize: '12px',
                        textTransform: { xs: 'none', sm: 'uppercase' },
                      }}
                      variant="text"
                      onClick={() => handleClickRemove(item)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '20vh',
            }}
          >
            <Typography variant="caption" p={2}>
              {TitleForEmptyCartOrWhislist}
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default memo(CartCard);
