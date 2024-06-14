import { Box, Skeleton } from '@mui/material';

export default function ChatMessageLoader() {
  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'end'} gap={'10px'}>
      <Skeleton animation="wave" width={'50%'} display={'flex'} />
      <Skeleton animation="wave" width={'20%'} display={'flex'} />
      <Skeleton animation="wave" height={'90px'} width={'50%'} display={'flex'} />
      <Skeleton animation="wave" height={'40px'} width={'20%'} display={'flex'} />
      <Skeleton animation="wave" width={'50%'} display={'flex'} />
      <Skeleton animation="wave" height={'40px'} width={'50%'} display={'flex'} />
    </Box>
  );
}
