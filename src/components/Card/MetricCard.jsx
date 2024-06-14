import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';

export default function MetricCard({
  Heading,
  Data,
  ButtonText,
  Border,
  ButtonNavigateTo,
  Align,
  Direction,
}) {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        borderRadius: { xs: '16px', sm: '30px' },
        padding: { xs: '8px', sm: '20px' },
        gap: '16px',
        boxShadow: Border
          ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
          : '',
        // width: { xs: '100%', lg: '30%' },
      }}
    >
      <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, fontWeight: '600' }}>
        {Heading}
      </Typography>
      <Stack
        sx={{
          // flexDirection: Direction,
          // // gap: Direction == 'column' ? '8px' : '10px',
          // alignItems: Direction == 'column' ? 'flex-start' : 'center',
          // justifyContent: 'space-between',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '30px',
          justifyContent: 'space-between',
        }}
      >
        {Data &&
          Data?.map((item, key) => (
            <Stack
              key={key}
              sx={{
                flexDirection: Align,
                alignItems: { xs: Align == 'column' ? 'flex-start' : 'center', sm: 'center' },
                gap: '8px',
              }}
            >
              <Typography sx={{ fontSize: { xs: '10px', sm: '16px', md: '18px' } }}>
                {item?.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '12px', sm: '18px', md: '20px' },
                  color: '#698AFF',
                  fontWeight: '600',
                }}
              >
                {item.value === ('undefined' || 'null') ? '0' : item?.value}
              </Typography>
            </Stack>
          ))}
      </Stack>
      {ButtonText && (
        <Button
          variant="contained"
          endIcon={<KeyboardDoubleArrowRight fontSize="20px" color="white" />}
          sx={{
            borderRadius: '15px',
            background: '#93A9FA',
            textTransform: 'none',
            padding: '8px',
            maxWidth: '350px',
          }}
          onClick={() => navigate(ButtonNavigateTo)}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            {ButtonText}
          </Typography>
        </Button>
      )}
    </Stack>
  );
}
