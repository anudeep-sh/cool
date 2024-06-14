import { Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { BannerContainer, BannerContent, BannerDescription, BannerTitle } from '../../Style/Banner';
import person1 from '../../assets/BannerImages/backGrondImage.jpg';
const BannerWithCustomizeText = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <BannerContainer src={person1}>
        <BannerContent>
          <div style={{ backgroundColor: '#fff', padding: 20 }}>
            <BannerTitle variant="h2">Prep for your IT certificate</BannerTitle>
            <BannerDescription variant="subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.
            </BannerDescription>
          </div>
        </BannerContent>
      </BannerContainer>
    </>
  );
};

export default BannerWithCustomizeText;
