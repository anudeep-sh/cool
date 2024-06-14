import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ProblemConstraints from './ProblemConstraints';
import ProblemMoreInfo from './ProblemMoreInfo';
import ProblemStatement from './ProblemStatement';
import ProblemTags from './ProblemTags';
import ProblemExplanation from './ProblemExplanation';
import ProblemDataApi from './ProblemDataApi';
import { useOutletContext, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { contestProblemAPI } from '../../../api/requests/contests/contestProblemAPI';
import { ProblemEndpoints } from './ProblemEndpoints';
const Explanation = ({ problem }) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          paddingRight: '0px!important',
          width: '100%',
        }}
      >
        <Grid item xs={12} md={12} sx={{ paddingRight: '0px!important' }}>
          <ProblemStatement problem={problem} />
          <ProblemExplanation testcases={problem?.explaination} />
          <ProblemEndpoints backendId={problem?.applicationId} />
          {/* <ProblemDataApi apis={problem?.dataApis} /> */}
          <ProblemConstraints constraints={problem?.constraints} />
          <ProblemTags tags={problem?.tags} />
          <ProblemMoreInfo authors={problem?.author} moreInfo={problem?.moreInfo} />
        </Grid>
      </Grid>
    </>
  );
};

export default Explanation;
