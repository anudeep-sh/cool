import React from 'react';
import { List, ListItem, Stack, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinearProgressWithoutLabelReusable from '../../LinearProgress/LinearProgressWithoutLableReusable';
import Skeletons from '../../Skeleton/Skeletons';
import { Link } from 'react-router-dom';
import { getOrgName } from '../../../utils/appendOrgQuery';

const TaskAssigneesList = ({ userData, filteredData, loading, filterLoading }) => {
  const progress = userData?.progress;
  const orgName = getOrgName();
  const isOrgRoute = orgName != null;
  const filterDataProgress = filteredData?.progress;
  return (
    <>
      {loading ? (
        <Skeletons type="body" />
      ) : (
        <List
          sx={{
            height: '80vh',
            maxHeight: '100vh',
            overflow: 'scroll',
            px: { xs: 0.7 },
            marginTop: '0px !important',
            py: 0,
            mb: 2,
          }}
        >
          {filterDataProgress ? (
            <>
              {filterLoading ? (
                <Skeletons type="body" />
              ) : (
                <>
                  {' '}
                  {filterDataProgress?.map((users, i) => (
                    <ListItem
                      sx={{
                        borderRadius: '20px',
                        py: 1.5,
                        my: 1.5,
                        alignItems: 'flex-start',
                        boxShadow: 2,
                      }}
                      key={i}
                    >
                      <AccountCircleIcon
                        sx={{
                          mr: 2.5,
                          color: 'grey',
                          display: 'inline-block',
                          mt: 2.5,
                          height: 50,
                          width: 50,
                        }}
                      />
                      <Stack spacing={0.5} sx={{ width: '100%' }}>
                        <Stack
                          direction="row"
                          sx={{ gap: '5px' }}
                          flexWrap="wrap"
                          alignItems="center"
                        >
                          <Typography sx={{ fontSize: '16px' }}>
                            {users?.userData?.firstName}
                          </Typography>
                          <Typography sx={{ fontSize: '16px' }}>
                            {users?.userData?.lastName}
                          </Typography>
                        </Stack>
                        <Typography sx={{ fontSize: '14px', color: 'grey' }}>
                          {users?.userData?.username}
                        </Typography>
                        <Stack direction="column" spacing={1}>
                          <Typography sx={{ fontSize: '16px' }}>
                            {' '}
                            progress : {users?.userProgress?.taskProgress?.toFixed(2) || 0} %{' '}
                          </Typography>
                          <LinearProgressWithoutLabelReusable
                            displayTitle="none"
                            color="primary"
                            progressCount={users?.userProgress?.taskProgress}
                          />
                        </Stack>
                      </Stack>
                    </ListItem>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {progress?.map((users, i) => (
                <Link
                  to={
                    isOrgRoute
                      ? `/org/${orgName}/task/${userData?.taskDetails?.id}/${users?.userData?.id}`
                      : `/task/${userData?.taskDetails?.id}/${users?.userData?.id}`
                  }
                >
                  <ListItem
                    sx={{
                      borderRadius: '20px',
                      py: 1.5,
                      my: 1.5,
                      alignItems: 'flex-start',
                      boxShadow: 2,
                      '& .MuiSvgIcon-root': {
                        display: 'block',
                      },
                    }}
                    key={i}
                  >
                    <AccountCircleIcon
                      sx={{
                        mr: 2.5,
                        color: 'grey',
                        mt: 2.5,
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Stack spacing={0.5} sx={{ width: '100%' }}>
                      <Stack
                        direction="row"
                        sx={{ gap: '5px' }}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Typography sx={{ fontSize: '16px' }}>
                          {users?.userData?.firstName}
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                          {users?.userData?.lastName}
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: '14px', color: 'grey' }}>
                        {users?.userData?.username}
                      </Typography>
                      <Stack direction="column" spacing={1}>
                        <Typography sx={{ fontSize: '16px' }}>
                          {' '}
                          progress : {users?.userProgress?.taskProgress?.toFixed(2) || 0} %{' '}
                        </Typography>
                        <LinearProgressWithoutLabelReusable
                          displayTitle="none"
                          progressCount={users?.userProgress?.taskProgress}
                        />
                      </Stack>
                    </Stack>
                  </ListItem>
                </Link>
              ))}
            </>
          )}
        </List>
      )}
    </>
  );
};

export default TaskAssigneesList;
