import React from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

export default function InfoCard({
  Heading,
  Data,
  ButtonText,
  Border,
  ButtonNavigateTo,
  ProgressBar,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        borderRadius: '30px',
        boxShadow: Border ? '0px 4px 4px 0px rgba(0, 0, 0, 0.35)' : '',
        py: 2.25,
        px: 2,
        display: 'flex',
        gap: '2px',
        flexDirection: 'column',
        width: { xs: '100%', lg: '30%' },
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          color: '#000',
          fontFamily: 'Poppins',
          fontSize: { xs: '16px', sm: '20px' },
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 'normal',
        }}
      >
        {Heading}
      </Typography>
      {Data?.map((item, key) => (
        <Box
          key={key}
          sx={{ display: 'flex', gap: '10px', mt: ButtonText ? 1 : 3, alignItems: 'center' }}
        >
          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Poppins',
              fontSize: { xs: '10px', sm: '16px' },
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: 'normal',
            }}
          >
            {item?.title}
          </Typography>
          {ProgressBar ? (
            <Box sx={{ width: '200px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <LinearProgress
                variant="determinate"
                value={parseFloat(item?.value)}
                sx={{ height: '10px', borderRadius: '80px', flexGrow: 1 }}
              />
              <Typography
                sx={{
                  color: '#698AFF',
                  fontFamily: 'Poppins',
                  fontSize: { xs: '14px', sm: '18px' },
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                {item?.value}
              </Typography>
            </Box>
          ) : (
            <Typography
              sx={{
                color: '#698AFF',
                fontFamily: 'Poppins',
                fontSize: { xs: '14px', sm: '18px' },
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal',
              }}
            >
              {item.value === 'undefined' ? '' : item?.value}
            </Typography>
          )}
        </Box>
      ))}
      {ButtonText && (
        <Button
          variant="contained"
          endIcon={<KeyboardDoubleArrowRightIcon fontSize="small" color="white" />}
          sx={{
            borderRadius: '15px',
            background: '#93A9FA',
            textTransform: 'none',
            padding: '8px',
          }}
          onClick={() => navigate(ButtonNavigateTo)}
        >
          <Typography>{ButtonText}</Typography>
        </Button>
      )}
    </Box>
  );
}
