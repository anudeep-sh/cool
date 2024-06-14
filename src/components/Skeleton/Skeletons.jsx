import { CircularProgress, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Skeletons = ({ type }) => {
  const counter = 5;
  const FeedSkeleton = () => (
    <Box sx={{ height: '220px', py: 1, mr: 2 }} key={counter}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Box sx={{ pt: 1 }}>
        <Skeleton />
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );

  const SideBarSkeleton = () => (
    <Box sx={{ height: '56px', p: 2, display: 'flex' }}>
      <Skeleton variant="rectangular" width={32} height={32} sx={{ mr: 2, borderRadius: '50%' }} />
      <Skeleton variant="rectangular" width={142} height={32} sx={{ mr: 2, borderRadius: '2%' }} />
    </Box>
  );

  const NavbarSkeleton = () => (
    <Box sx={{ height: '56px', p: 2, display: 'flex' }}>
      <Skeleton variant="rectangular" width={142} height={32} sx={{ mr: 2, borderRadius: '2%' }} />
      <Skeleton variant="rectangular" width={142} height={32} sx={{ mr: 2, borderRadius: '2%' }} />
    </Box>
  );

  const BodySkeleton = () => (
    <Box sx={{ height: '56px', p: 2, m: 5 }}>
      <Skeleton
        variant="rectangular"
        width={600}
        height={70}
        sx={{ mr: 2, mb: 2, borderRadius: '2%' }}
      />
      <Skeleton
        variant="rectangular"
        width={600}
        height={70}
        sx={{ mr: 2, mb: 2, borderRadius: '21' }}
      />
      <Skeleton
        variant="rectangular"
        width={600}
        height={70}
        sx={{ mr: 2, mb: 2, borderRadius: '21' }}
      />
      <Skeleton
        variant="rectangular"
        width={600}
        height={70}
        sx={{ mr: 2, mb: 2, borderRadius: '21' }}
      />
    </Box>
  );

  const CircularLoader = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <CircularProgress size={90} />
    </Box>
  );

  const SmallCircularLoader = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <CircularProgress size={14} />
    </Box>
  );
  const LazySmallCircularLoader = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // backgroundColor: 'red',
        // height:"100vh"
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );

  const VideoPlayerSkeleton = () => (
    <Box sx={{ marginLeft: '1rem' }}>
      <Skeleton variant="rectangular" width="100%" height={480} />
    </Box>
  );

  if (type === 'feed1') return Array(counter).fill(<FeedSkeleton />);
  if (type === 'sideBar') return Array(5).fill(<SideBarSkeleton />);
  if (type === 'sideBarBottom') return Array(3).fill(<SideBarSkeleton />);
  if (type === 'CircularLoader') return <CircularLoader />;
  if (type === 'smallCircularLoader') return <SmallCircularLoader />;
  if (type === 'LazySmallCircularLoader') return <LazySmallCircularLoader />;
  if (type === 'videoPlayer') return <VideoPlayerSkeleton />;
  if (type === 'navbar') return <NavbarSkeleton />;
  if (type === 'body') return <BodySkeleton />;
};

export default Skeletons;
