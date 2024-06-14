import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import SideBarResponsive from '../../SideBarResponsive/index';
import RankingNavbar from '../../CodingContests/ContestRanking/RankingNavbar';
import { useParams } from 'react-router-dom';
import RankingTable from '../../CodingContests/ContestRanking/RankingTable';

const persons = [
  {
    score: 1,
    name: 'Nax_Jack',
    institution: 'hbtu',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 2,
    name: 'Max_Jack',
    institution: 'Indian Institute of Kanpur',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 3,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'finance',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 4,
    name: 'lax_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'australia',
    country_code: 'AU',
  },
  {
    score: 5,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 6,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'australia',
    country_code: 'AU',
  },
  {
    score: 7,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 8,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 9,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 10,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 11,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 12,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
  {
    score: 13,
    name: 'Max_Jack',
    institution: 'IES college of technology',
    institution_type: 'technology',
    country: 'India',
    country_code: 'IN',
  },
];

const ContestRanking = () => {
  const params = useParams();

  const [id, setId] = useState(1);

  const [searchField, setSearchField] = useState('');
  const [filteredNames, setFilteredNames] = useState(persons);

  const [searchField2, setSearchField2] = useState('');
  const [filteredCountry, setFilteredCountry] = useState(persons);
  const [filteredInstitution, setFilteredInstitution] = useState(persons);
  const [filteredInstitutionType, setFilteredInstitutionType] = useState(persons);

  useEffect(() => {
    const newFilteredNames = persons.filter((ele) => {
      return ele.name.toLocaleLowerCase().includes(searchField);
    });

    const newFilteredCountry = persons.filter((ele) => {
      return ele.country.toLocaleLowerCase().includes(searchField2);
    });

    const newFilteredInstitution = persons.filter((ele) => {
      return ele.institution.toLocaleLowerCase().includes(searchField2);
    });

    const newFilteredInstitutionType = persons.filter((ele) => {
      return ele.institution_type.toLocaleLowerCase().includes(searchField2);
    });

    setFilteredNames(newFilteredNames);
    if (id === 1) {
      setFilteredCountry(newFilteredCountry);
    } else if (id === 2) {
      setFilteredInstitution(newFilteredInstitution);
    } else if (id === 3) {
      setFilteredInstitutionType(newFilteredInstitutionType);
    }
  }, [searchField, searchField2, id]);

  const onSearchChangeName = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();

    setSearchField(searchFieldString);
  };

  const onSearchChangeFilter = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();

    setSearchField2(searchFieldString);
  };

  function intersect(a, b) {
    var setB = new Set(b);
    return [...new Set(a)].filter((x) => setB.has(x));
  }

  let array = [];
  let placeHolder2;

  if (id === 1) {
    array = [...filteredCountry];
    placeHolder2 = 'e.g. India';
  } else if (id === 2) {
    array = [...filteredInstitution];
    placeHolder2 = 'e.g. Indian Institute of technology';
  } else if (id === 3) {
    array = [...filteredInstitutionType];
    placeHolder2 = 'e.g. School, College, Organization';
  }

  let admin_columns = [];

  let admin_rows = [];

  admin_columns = [
    { id: 'userinfo', label: 'User Information', minWidth: 100 },
    { id: 'submissionlink', label: 'Submission Link', minWidth: 200 },

    {
      id: 'input',
      label: 'Give Score',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'button',
      label: 'Submit',
      minWidth: 100,
      align: 'right',
    },
  ];

  function admin_createData(userinfo, submissionlink, input, button) {
    return { userinfo, submissionlink, input, button };
  }

  // for (let i = 0; i < people.length; i++) {
  //     admin_rows.push(admin_createData(<RankingTableUserInfo person={people[i]} />, <RankingTableLink person={people[i]} />,
  //         <InputField />, <Button>Submit</Button>))
  // }

  let is_scoring = true;

  const drawerWidth = 200;
  return (
    <>
      <SideBarResponsive />
      <RankingNavbar
        is_scoring={is_scoring}
        onSearchChangeName={onSearchChangeName}
        setId={setId}
        onSearchChangeFilter={onSearchChangeFilter}
        placeHolder2={placeHolder2}
        contest_code={params.contest_code}
        pid={params.id}
      />
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#ffffff',
        }}
      >
        <Box>
          {/* <RankingTable is_scoring={is_scoring} rows={admin_rows} columns={admin_columns} people={intersect(filteredNames, array)}/> */}
        </Box>
      </Box>
    </>
  );
};

export default ContestRanking;
