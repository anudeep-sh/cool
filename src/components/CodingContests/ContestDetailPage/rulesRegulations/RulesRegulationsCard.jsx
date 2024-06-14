import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const RulesRegulationsCard = ({ rule }) => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ minWidth: 275, boxShadow: 1 }}
      >
        <Box display="flex" flexDirection="column" sx={{ p: 1 }} justifyContent="flex-start">
          <Box>
            <List>
              {rule.map((point, index) => {
                return (
                  <ListItem key={index}>
                    <StarIcon sx={{ color: '#e5e5e5' }} />
                    <Typography ml={1} sx={{ fontSize: '15px', fontWeight: '200' }} variant="body2">
                      {point}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RulesRegulationsCard;
