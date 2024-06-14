import { Delete } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import SemiCircleProgress from 'react-progressbar-semicircle';

export default function CourseDetails({
  Heading,
  Data,
  Border,
  Progress,
  Align,
  Direction,
  Title,
}) {
  return (
    <Stack
      sx={{
        borderRadius: '30px',
        padding: '16px',
        gap: '16px',
        boxShadow: Border
          ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
          : '',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', sm: 'center' },
        justifyContent: 'space-between',
        width: { xs: '100%', lg: '60%' },
        padding: '16px 24px',
      }}
    >
      <Stack gap={'16px'}>
        <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
          <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>{Heading}</Typography>
          <Button
            variant="contained"
            endIcon={<Delete />}
            sx={{
              backgroundColor: '#FF3E3E',
              textTransform: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
            }}
            size="small"
          >
            Delete
          </Button>
        </Stack>
        <Stack
          sx={{
            flexDirection: Direction,
            gap: Direction == 'column' ? '8px' : '32px',
            alignItems: Direction == 'column' ? 'flex-start' : 'center',
            justifyContent: 'space-between',
          }}
        >
          {Data?.map((item, key) => (
            <Stack key={key} sx={{ flexDirection: Align, alignItems: 'center', gap: '8px' }}>
              <Typography sx={{ fontSize: '18px' }}>{item.title}</Typography>
              <Typography
                sx={{ fontSize: '18px', fontWeight: '600', color: 'rgba(0, 0, 0, 0.55)' }}
              >
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Stack sx={{ width: { md: '220px', lg: '280px' } }}>
          <SemiCircleProgress
            percentage={Progress}
            stroke={'#698AFF'}
            strokeWidth={14}
            showPercentValue={true}
            diameter={250}
            style={{ fontSize: '20px' }}
          />
        </Stack>
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.55)',
            fontSize: { xs: '16px', sm: '20px' },
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            mt: 2,
            textAlign: 'center',
            maxWidth: '280px',
          }}
        >
          Consumed by {Title} of total Org data
        </Typography>
      </Stack>
    </Stack>
  );
}
