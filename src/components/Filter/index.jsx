import { Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { FilterTitle } from '../../theme/VideoSlider/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FilterChip from './FilterChip';
import { memo } from 'react';
import { IconTextField } from '../TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Skeletons from '../Skeleton/Skeletons';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box } from '@mui/system';

const Filter = ({
  data,
  handleSeach,
  handleClickCategory,
  searchLoad,
  handleSearchFromApi,
  handleReset,
  searchKeyword,
}) => {
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 464 },
  //     items: 5,
  //     slidesToSlide: 5, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 6,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 2,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  // };

  // const [chips, setChips] = useState([
  //   { id: "1", label: "Java" },
  //   { id: "2", label: "Php" },
  //   { id: "3", label: "React js" },
  //   { id: "4", label: "JavaScript" },
  //   { id: "5", label: "React native" },
  //   { id: "6", label: "Docker" },
  //   { id: "7", label: "Pg Admin" },
  //   { id: "8", label: "C" },
  //   { id: "9", label: "C++" },
  //   { id: "10", label: "Flutter" },
  //   { id: "11", label: "kotlin" },
  //   { id: "12", label: "android" },
  // ]);

  return (
    <>
      <Grid container spacing={2} display="flex" justifyContent={'center'} mt={1}>
        {/* <Grid item xs={2} sm={1} sx={{ maxWidth: "5%!important" }}>
          <FilterTitle variant="text">Filter</FilterTitle>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            keyBoardControl={true}
            removeArrowOnDeviceType={["mobile"]}
          >
            {chips.map((item, index) => {
              return (
                <FilterChip FilterElements={item} key={index} id={item.id} />
              );
            })}
          </Carousel>
        </Grid> */}
        <Grid item xs={8} sm={8}>
          <IconTextField
            variant="standard"
            placeholder="Search Here"
            fullWidth={true}
            value={searchKeyword}
            iconStart={
              searchKeyword ? (
                <IconButton aria-label="remove" size="small" onClick={() => handleReset()}>
                  <CloseRoundedIcon />
                </IconButton>
              ) : null
            }
            iconEnd={
              searchLoad ? (
                <Skeletons type="smallCircularLoader" />
              ) : (
                <IconButton aria-label="search" size="small" onClick={() => handleSearchFromApi()}>
                  {' '}
                  <SearchRoundedIcon />
                </IconButton>
              )
            }
            onChange={handleSeach}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchFromApi();
              }
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Filter);
