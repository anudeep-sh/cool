import { Avatar, Stack, Typography, Box, Button } from '@mui/material';

export default function GeneralCard({ name, desc, logo, visibility, setOpen }) {
  return (
    <Stack
      sx={{
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        borderRadius: '20px',
        padding: '8px 24px',
        gap: '12px',
        width: { xs: '100%', md: '100%' },
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #C5C6C0',
          paddingBottom: '8px',
        }}
      >
        <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Details</Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: '16px',
            fontSize: { xs: '14px', sm: '16px' },
            textTransform: 'none',
            backgroundColor: '#FF3E3E',
            '&:hover': { backgroundColor: '#FF3E3E' },
          }}
          size="small"
          onClick={() => setOpen(true)}
        >
          Leave Org
        </Button>
      </Stack>
      <Stack direction="row" gap="8px">
        <Typography sx={{ fontSize: '18px', color: 'grey', width: '10ch' }}>Name:</Typography>
        <Typography sx={{ fontSize: '18px', color: '#698AFF' }}>{name}</Typography>
      </Stack>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '18px', color: 'grey', width: '10ch' }}>Logo:</Typography>
        <Avatar src={logo} sx={{ width: '50px', objectFit: 'contain', height: '50px' }} />
      </Stack>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '18px', color: 'grey', width: '10ch' }}>Visibility </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            backgroundColor: '#61CB8E',
            padding: '4px',
            alignItems: 'center',
            gap: '4px',
            borderRadius: '12px',
            border: '4px solid white',
            boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
          }}
        >
          <Typography sx={{ color: '#fff', textTransform: 'capitalize' }}>{visibility}</Typography>
          <Box
            sx={{ width: '22px', height: '20px', backgroundColor: '#fff', borderRadius: '4px' }}
          />
        </Stack>
      </Stack>
      <Stack sx={{ flexDirection: 'column', gap: '8px' }}>
        <Typography sx={{ fontSize: '18px', color: 'grey' }}>Description </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            color: '#000000',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': '3',
            '-webkit-box-orient': 'vertical',
          }}
        >
          {desc}
        </Typography>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
}
