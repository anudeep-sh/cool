import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Carousel1 from '../../components/CarouselForBanner/index';
import Product from '../../components/ProductCarousel/Product';
import Filter from '../../components/Filter';
import { Grid, Container } from '@mui/material';
import { courseStageAPI } from '../../api/requests/courses/courseStageAPI';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import { getOrgData } from '../../organization';
import NoCourseFound from '../../assets/NoCourseFoundImage/NoCourseFound.png';
import { useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Dashboard');
  const location = useLocation();
  const drawerWidth = 200;
  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  const BannerData = [];
  if (imagesObj) {
    Object.keys(imagesObj).forEach((key) => {
      if (key.includes('home_page_banner')) {
        BannerData.push(imagesObj[key]);
      }
    });
  }

  const [data2, setData2] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const isUserProfileInProduct = true;
  const [filterItems, setFilterItems] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchLoad, setSearchLoad] = useState(false);
  const [domainData, setDomainData] = React.useState(null);
  const [title, setTitle] = React.useState('Our Courses');
  const [searched, setSearched] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    try {
      const data = await courseAPI.getUserCourses(0);
      setCourses(data && data);
    } catch (err) {}
  };
  const getDomainData = async () => {
    const data = await getOrgData();
    if (data) {
      setTitle(`Courses available at ${data.displayName}`);
    }
    setDomainData(data);
  };

  const onSearchChangeName = (event) => {
    const searchFieldString = event.target.value;
    setSearchKeyword(searchFieldString);
    if (event.target.value === '') {
      setFilterItems([]);
      setSearched(false);
    }
  };

  const handleClickCategory = (event) => {
    setFilteredCategory(event.target.name);
  };

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const data = [];
        setData2(data && data);
        setLoading(false);
      } catch (err) {}
    };
    data();
  }, []);
  // useEffect(() => {
  //   const getAllData = async () => {
  //     setLoading(true);
  //     await Promise.all([getEnrolledCourses, getAllCourses]);
  //     setLoading(false);
  //   };
  //   getAllData();
  // }, []);
  const handleReset = () => {
    setFilterItems([]);
    setSearchKeyword('');
    setSearched(false);
  };

  const handleSearchFromApi = async () => {
    if (searchKeyword.trim() !== '') {
      setSearchLoad(true);
      try {
        const data = await courseAPI.searchCourse(searchKeyword);
        setFilterItems(data && data);
        setSearchLoad(false);
        setSearched(data && data.length === 0);
      } catch (err) {}
    }
  };
  // const getTasks = async () => {
  //   try {
  //     const data =
  //       role === 'ADMIN' || role === 'SUPERADMIN'
  //         ? await TaskAPI.getCreatedTasks(1)
  //         : await TaskAPI.getAssignedTasks();
  //     setTaskArray(data);
  //   } catch (err) {}
  // };
  const getEnrolledCourses = async () => {
    try {
      const data = await courseStageAPI.getCourses('ENROLLED');
      setEnrolledCourses(data && data);
    } catch (err) {}
  };
  const getAllCourses = async () => {
    try {
      const data = await courseAPI.getCoursesByPage(1);
      setAllCourses(data && data);
    } catch (err) {}
  };
  useEffect(() => {
    getEnrolledCourses();
    getAllCourses();
    getDomainData();
    getCourses();
    return () => {};
  }, [location.pathname]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: { lg: `calc(100%)` },
            margin: 'auto',
            minWidth: { lg: '978px' },
            maxWidth: { xl: '1640px' },
          }}
        >
          <Carousel1 BannerImages={BannerData} lgHeight={'400px'} />
          <Filter
            data={data2}
            handleSeach={onSearchChangeName}
            handleClickCategory={handleClickCategory}
            searchLoad={searchLoad}
            handleSearchFromApi={handleSearchFromApi}
            handleReset={handleReset}
            searchKeyword={searchKeyword}
          />
          {/* <Product
            title={"Suggested Courses for you"}
            dataRender={data2}
            loading={loading}
          /> */}
          {filterItems.length > 0 && (
            <Product
              title={'Search results'}
              dataRender={filterItems}
              domainData={domainData}
              loading={searchLoad}
            />
          )}
          {searched && (
            <>
              <Product title={'Search results'} dataRender={filterItems} loading={searchLoad} />
            </>
          )}
          {/* <Product title={title} dataRender={data2} domainData={domainData} /> */}

          <Box sx={{ margin: '1rem' }}>
            <Product title={'All courses'} dataRender={allCourses} loading={loading} />
          </Box>
          <Box sx={{ margin: '1rem' }}>
            <Product
              title={'Courses you have Enrolled'}
              dataRender={enrolledCourses}
              loading={loading}
            />
          </Box>

          {/* <TaskCarousel title={'Tasks'} slidesToShow={2} slidesToScroll={1} taskArray={taskArray} isParentTask={true}/>
           <Product title={"Highest Rated Courses"} dataRender={highest} />  */}
        </Box>
      </Box>

      {/* <Product title={"Title goes here"} dataRender={data} /> */}
      {/* // filteredCards={handleSeach} */}
      {/* <ReponsiveCarousel Title="new carousel" dataFromHome={data}/> */}
      {/* this props gone in to ProductCarousel then from ProductCarousel to ProductCard then it will be map on ProductCard page */}
      {/* <ReponsiveCarousel Title={"Title API"} dataFromHome={data}/>  */}
      {/* <ProductCarousel Title={"Title goes here"} dataFromHome={data}/> */}
      {/* <ProductCard title={"Title APIww"} dataRender={data} /> */}
    </>
  );
};

export default Home;
