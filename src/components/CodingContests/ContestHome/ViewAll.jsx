import React, { useState, useEffect } from 'react';
import RankingNavbar from '../ContestRanking/RankingNavbar';
import RankingTable from '../../CodingContests/ContestRanking/RankingTable';
import RankingTableUserInfo from '../ContestRanking/RankingTableUserInfo';
import { CardMedia, Grid } from '@mui/material';
import { contestRankAPI } from '../../../api/requests/contests/contestRankAPI';
import { fetchAllImages } from '../../../utils/images';
import { useDocumentTitle } from '../../../utils/useDocumentTitle';

const ViewAll = () => {
  useDocumentTitle('Contest Ranking');

  const [ranks, setRanks] = useState([]);
  const [newObj, setNew] = useState([]);
  const [page, setPage] = React.useState(1);
  const [searchField, setSearchField] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchAllImages();
    getAllRanks();
  }, [page]);

  const handleSearchFromApi = async () => {
    try {
      const data = await contestRankAPI.getOrgRanksSearch(page, searchField);
      setNew(data?.data);
      setTotalPages(data?.totalPages);
    } catch (err) {}
  };
  const getAllRanks = async () => {
    try {
      const data = await contestRankAPI.getOrgRanks(page);
      setNew(data?.data);
      setTotalPages(data?.totalPages);
      setRanks(data && data?.totalParticipants);
    } catch (err) {}
  };
  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  const BannerData = [];
  if (imagesObj) {
    Object.keys(imagesObj).forEach((key) => {
      if (key.includes('contest_all_ranking_banner')) {
        BannerData.push(imagesObj[key]);
      }
    });
  }
  // const handleSearchUser = async () => {
  //   try {
  //     const data = await contestAPI.searchUser(contestId, searchField, 1);
  //     setRankingResult(data?.data);
  //   } catch (err) {}
  // };
  const drawerWidth = 200;
  let is_viewAll = true;

  let viewAll_columns = [];

  let viewAll_rows = [];

  viewAll_columns = [
    { id: 'rank', label: 'Rank', minWidth: 400 },
    {
      id: 'userinfo',
      label: 'User',
      minWidth: 300,
      align: 'center',
    },
    {
      id: 'rating',
      label: 'Rating',
      minWidth: 500,
      align: 'right',
    },
  ];

  function viewAll_createData(rank, userinfo, rating) {
    return { rank, userinfo, rating };
  }

  for (let i = 0; i < newObj?.length; i++) {
    viewAll_rows.push(
      viewAll_createData(
        (page - 1) * 50 + (i + 1),
        <RankingTableUserInfo person={newObj[i]} />,
        newObj[i].totalScore
      )
    );
  }
  return (
    <>
      <Grid
        container
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Grid item xs={12} lg={9} sx={{ paddingTop: '0px!important' }}>
          <RankingNavbar
            is_viewAll={is_viewAll}
            handleSearchUser={handleSearchFromApi}
            setSearchField={setSearchField}
          />

          <RankingTable
            totalPages={totalPages}
            // totalRanks={ranks}
            is_viewAll={is_viewAll}
            rows={viewAll_rows}
            columns={viewAll_columns}
            setPage={setPage}
          />
        </Grid>
        <Grid
          itemxs={0}
          lg={3}
          display={{ xs: 'none', lg: 'block' }}
          sx={{
            paddingTop: '0px!important',
            height: { xs: 'none', lg: '100vh' },
          }}
        >
          <CardMedia
            sx={{
              border: '1px solid #F0EFF2',
              padding: '16px 16px',
              height: { xs: '400px', md: '98%' },
            }}
            component="img"
            alt="green iguana"
            image={BannerData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewAll;
