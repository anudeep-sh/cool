import React, { useState, useEffect } from 'react';
import RankingNavbar from '../../components/CodingContests/ContestRanking/RankingNavbar';
import { useParams } from 'react-router-dom';
import RankingTable from '../../components/CodingContests/ContestRanking/RankingTable';
import RankingTableUserInfo from '../../components/CodingContests/ContestRanking/RankingTableUserInfo';
import { CardMedia, Grid } from '@mui/material';
import { contestAPI } from '../../api/requests/contests/contestAPI';
import { contestRankAPI } from '../../api/requests/contests/contestRankAPI';
import { handleAlert } from '../../utils/handleAlert';

const ContestRanking = () => {
  const { contestId, time, contest_code } = useParams();
  const [rankingResult, setRankingResult] = useState([]); // change not yet completed
  const [page, setPage] = React.useState(1);
  const [searchField, setSearchField] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  const BannerData = [];
  if (imagesObj) {
    Object.keys(imagesObj).forEach((key) => {
      if (key.includes('contest_contestid_ranking')) {
        BannerData.push(imagesObj[key]);
      }
    });
  }

  useEffect(() => {
    getContestRanks();
  }, [page]);

  const [id, setId] = useState(1);

  const getContestRanks = async () => {
    try {
      const data = await contestRankAPI.getContestRanks(contestId, page);
      if (data?.message) {
        handleAlert(data?.message);
      }
      setRankingResult(data?.data);
      setTotalPages(data?.totalPages);
    } catch (err) {}
  };

  var perPage = 15;

  const ids = new Map([
    [1, 'country'],
    [2, 'instituteName'],
    [3, 'instituteType'],
  ]);

  const handleSearchFromApi = async () => {
    try {
      const data = await contestAPI.searchUser(contestId, searchField, 1);
      setRankingResult(data?.data);
    } catch (err) {}
  };

  const is_ranking = true;
  const is_scoring = false;

  let ranking_columns = [];

  let ranking_rows = [];

  ranking_columns = [
    { id: 'rank', label: 'Rank', minWidth: 100 },

    // {
    //   id: "institute_type",
    //   // label: "Institute Type",
    //   // minWidth: 120,
    //   align: "left",
    // },
    {
      id: 'userinfo',
      label: 'User',
      // minWidth: 200,
      align: 'right',
    },
    {
      id: 'score',
      label: 'Total Score',
      // minWidth: 200,
      align: 'left',
    },
  ];

  function ranking_createData(rank, userinfo, score, userId) {
    return { rank, userinfo, score, userId };
  }

  //   if (newObj?.length > 0) {
  //     for (let i = 0; i < newObj?.length; i++) {
  //       ranking_rows.push(
  //         ranking_createData(
  //           (page - 1) * 15 + (i + 1),
  //           <RankingTableUserInfo person={newObj[i]} />,
  //           newObj[i]?.instituteType,
  //           newObj[i]?.totalScore
  //         )
  //       );
  //     }
  //   }
  if (rankingResult?.length > 0) {
    for (let i = 0; i < rankingResult?.length; i++) {
      ranking_rows.push(
        ranking_createData(
          rankingResult[i]?.rank,
          <RankingTableUserInfo person={rankingResult[i]} />,
          rankingResult[i]?.totalScore,
          rankingResult[i]?.userId
        )
      );
    }
  }

  const drawerWidth = 200;
  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `calc(${drawerWidth}px)` },
      }}
    >
      <Grid item xs={12} lg={9} sx={{ paddingTop: '0px!important' }}>
        <RankingNavbar
          setSearchField={setSearchField}
          is_scoring={is_scoring}
          contest_code={contest_code}
          contestId={contestId}
          setId={setId}
          time={time}
          handleSearchUser={handleSearchFromApi}
          searchField={searchField}
          setFilterSearch={setFilterSearch}
        />

        {/* <ContestRankingContainer people={intersect(filteredNames, array)} /> */}
        <RankingTable
          is_scoring={is_scoring}
          is_ranking={is_ranking}
          people={rankingResult}
          // totalRanks={15 * (page - 1) + rankingResult?.length}
          totalPages={totalPages}
          setPage={setPage}
          page={page}
          columns={ranking_columns}
          rows={ranking_rows}
          // perPage={perPage}
        />
      </Grid>
      <Grid
        item
        xs={0}
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
            height: { lg: '98%' },
          }}
          component="img"
          alt="green iguana"
          image={BannerData}
        />
      </Grid>
    </Grid>
  );
};

export default ContestRanking;
