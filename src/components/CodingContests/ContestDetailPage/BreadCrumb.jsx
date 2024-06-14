import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useParams } from 'react-router-dom';
import { getOrgName } from '../../../utils/appendOrgQuery';

const BreadCrumb = ({ contest_code }) => {
  const orgName = getOrgName();
  const { contestId } = useParams();

  const crumbs = [
    {
      pathname: 'Home',
      path: `/org/${orgName}/dashboard`,
    },
    {
      pathname: 'Contests',
      path: `/org/${orgName}/contest`,
    },
    {
      pathname: `${contest_code}`,
      path: `/org/${orgName}/contest/${contestId}`,
    },
  ];

  function isLast(index) {
    return index === crumbs.length - 1;
  }

  return (
    <>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {crumbs.map((crumb, ci) => {
          const colour = isLast(ci) ? '#ffffff' : 'grey';
          const backColour = isLast(ci) ? 'grey' : '';
          return (
            <Link underline="hover" color="inherit" href={crumb.path}>
              <Button
                sx={{
                  fontSize: { xs: '12px' },
                  backgroundColor: `${backColour}`,
                  color: `${colour}`,
                  '&:hover': {
                    backgroundColor: `${backColour}`,
                    color: `${colour}`,
                  },
                }}
                onClick={() => crumb.selected(crumb)}
              >
                {crumb.pathname}
              </Button>
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumb;
