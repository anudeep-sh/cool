import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const SubHeader = ({
  addContest,
  uploadData2,
  uploadData,
  editProblem,
  title,
  handleEditForm,
  UploadTitle,
  EditTitle,
  FormId,
  addProblemFun,
  addProblemAndGoToHomeFun,
  SaveAndCreateBtn,
  SaveAndGoBtn,
}) => {
  return (
    <>
      <Grid container sx={{ p: 2, mt: { xs: 3, sm: 1.5 } }}>
        <Grid item xs={12} md={9} lg={6} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h6">{title}</Typography>
          {editProblem && (
            <Box>
              <Button variant="contained" size="small" onClick={() => uploadData()}>
                <ModeEditOutlineOutlinedIcon fontSize="16px" sx={{ mr: 0.5 }} />
                Edit
              </Button>
            </Box>
          )}
          {addContest && (
            <Box sx={{ marginRight: { lg: -9, xl: -12 } }}>
              <Button
                variant="contained"
                onClick={addContest}
                size="small"
                type="submit"
                sx={{ textTransform: 'capitalize' }}
              >
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', sm: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  Create
                </Typography>
              </Button>
            </Box>
          )}
          {addProblemFun && addProblemAndGoToHomeFun && (
            <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="outlined"
                onClick={addProblemFun}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  textAlign: 'start',
                  mr: 1,
                  mb: { xs: 1, sm: 0 },
                }}
              >
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: { xs: '16px', md: '18px' }, mr: 1 }} />
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', md: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  {SaveAndCreateBtn}
                </Typography>
              </Button>
              <Button
                variant="contained"
                onClick={addProblemAndGoToHomeFun}
                size="small"
                sx={{ textTransform: 'capitalize', textAlign: 'start', width: '20px' }}
              >
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', md: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  {' '}
                  {SaveAndGoBtn}
                </Typography>
              </Button>
            </Box>
          )}

          {uploadData2 && (
            <Box>
              <Button
                variant="outlined"
                type="submit"
                onClick={uploadData2}
                size="small"
                sx={{ textTransform: 'capitalize', textAlign: 'start' }}
              >
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: { xs: '16px', md: '18px' }, mr: 1 }} />
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', md: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  Update Contest
                </Typography>
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {EditTitle ? (
            <Button variant="outlined" size="small" sx={{ mr: 2 }} onClick={() => handleEditForm()}>
              {EditTitle}
            </Button>
          ) : null}
          {UploadTitle && (
            <Button variant="contained" size="small" form={FormId} type="submit">
              {UploadTitle}
            </Button>
          )}
          {/* {addProblemFun && addProblemAndGoToHomeFun && (
            <Grid
              sx={{
                marginTop: { xs: '12px', md: '0px' },
              }}
              display="flex"
              flexDirection="row"
              gap="16px"
            >
              <Button
                variant="outlined"
                onClick={addProblemFun}
                size="small"
                sx={{ textTransform: 'capitalize', textAlign: 'start' }}
              >
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: { xs: '16px', md: '18px' }, mr: 1 }} />
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', md: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  {SaveAndCreateBtn}
                </Typography>
              </Button>
              <Button
                variant="contained"
                onClick={addProblemAndGoToHomeFun}
                size="small"
                sx={{ textTransform: 'capitalize', textAlign: 'start' }}
              >
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', md: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  {' '}
                  {SaveAndGoBtn}
                </Typography>
              </Button>
            </Grid>
          )} */}
          {/* {editProblem && (
            <Box sx={{ display: 'flex' }}>
              <Button
                variant="contained"
                sx={{ display: { xs: 'none', md: 'block' } }}
                size="small"
                onClick={() => uploadData()}
              >
                <ModeEditOutlineOutlinedIcon fontSize="16px" sx={{ mr: 0.5 }} />
                Edit
              </Button>
            </Box>
          )} */}
          {/* {uploadData2 && (
            <Grid
              sx={{
                marginTop: { xs: '12px', md: '0px' },
              }}
              display="flex"
              flexDirection="row"
              gap="16px"
            >
              <Button
                variant="outlined"
                type="submit"
                onClick={uploadData2}
                size="small"
                sx={{ textTransform: 'capitalize', textAlign: 'start' }}
              >
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: { xs: '16px', md: '18px' }, mr: 1 }} />
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', md: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  Update Contest
                </Typography>
              </Button>
            </Grid>
          )} */}
          {/* {addContest && (
            <Grid
              sx={{
                marginTop: { xs: '12px', md: '0px' },
              }}
              display="flex"
              flexDirection="row"
              gap="16px"
            >
              <Button
                variant="contained"
                onClick={addContest}
                size="small"
                type="submit"
                sx={{ textTransform: 'capitalize', textAlign: 'start' }}
              >
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '14px', md: '16px' },
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  Create
                </Typography>
              </Button>
            </Grid>
          )} */}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default SubHeader;
