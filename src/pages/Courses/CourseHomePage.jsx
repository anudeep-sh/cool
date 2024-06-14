import React, { useState, useEffect } from 'react';
import { Stack, Typography, CircularProgress, Box } from '@mui/material';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import CarouselItem from '../../components/ProductCarousel/CarouselItem';
import TabComponent from '../../components/Tab';
import TabPagination from '../../components/Tab/TabPagination';
import SearchBar from '../../components/SearchBar';

export default function CourseHomePage() {
  const drawerWidth = 200;
  const tabs = { APPROVED: 'APPROVED', UNDERREVIEW: 'UNDERREVIEW' };
  const [courses, setCourses] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs.APPROVED);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [statusCount, setStatusCount] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const fetchData = (searchValue, activeTab, page) => {
    setLoader(true);

    courseAPI
      .getUserCourses(searchValue, activeTab, page)
      .then((data) => {
        setCourses(data?.data || []);
        setMaxPage(data?.pageCount || 1);
        const statusCounts = {
          UNDERREVIEW: parseInt(data?.underReviewCount || 0),
          APPROVED: parseInt(data?.approvedCount || 0),
        };
        setStatusCount(statusCounts);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData(searchValue, activeTab, page);
  }, [searchValue, activeTab, page]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        p: 2,
      }}
    >
      <Stack spacing={1} sx={{ textAlign: 'start', width: '100%' }}>
        <Typography variant="h5">Courses</Typography>
        <Typography sx={{ color: 'grey' }} variant="subtitle1">
          Find all your Created Courses
        </Typography>
      </Stack>
      <TabComponent
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPage={setPage}
        statusCount={statusCount}
        navigateToLink={'/course/create'}
        setSearchValue={setSearchValue}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: { xs: '0 0px 20px 0px', md: '0 16px 20px 16px' },
        }}
      >
        <SearchBar setSearchValue={setSearchValue} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          justifyContent: 'center',
          alignItems: 'center',
          pb: '20px',
        }}
      >
        {loader ? (
          <Box
            width="100%"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          courses.map((item, index) => (
            <Box
              sx={{
                display: { xs: 'flex', md: 'black' },
                justifyContent: { xs: 'center', md: 'left' },
                mt: 2,
              }}
            >
              <CarouselItem
                key={index}
                forSuggestedOrgPopup={false}
                ProductDetails={item}
                category={item.categories ? item.categories.split(',') : []}
                techStack={item.techStack ? item.techStack.split(',') : []}
                keyfrombackend={item.id}
                isEditable={true}
                isUserProfileInProduct={true}
                draggable={false}
                domainData={null}
                getCourses={fetchData}
                title={item.title}
                disableHover={false}
                showDescription={false}
                containerHeight={200}
              />
            </Box>
          ))
        )}
      </Box>
      <TabPagination page={page} setPage={setPage} maxPage={maxPage} />
    </Box>
  );
}
