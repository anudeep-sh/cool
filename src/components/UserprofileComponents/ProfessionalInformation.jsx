import React, { useRef } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { IconTextField } from '../../components/TextField';
import 'react-phone-number-input/style.css';
import 'react-multi-carousel/lib/styles.css';

const ProfessionalInformation = ({
  highestEducationEarned,
  setHighestEducationEarned,
  setAnyChange,
  instituteName,
  setInstituteName,
  instituteType,
  setInstituteType,
  profession,
  setProfession,
  companyName,
  setCompanyName,
  position,
  setPosition,
}) => {
  let isProfessional = false;

  if (profession === 'professional' || profession === 'other') {
    isProfessional = true;
  }

  const instituteTypeRef = useRef(null);
  const instituteNameRef = useRef(null);
  const studentTypeRef = useRef(null);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <form>
          <Typography variant="h6">Professional Information</Typography>
          <Typography variant="h6" sx={{ fontSize: '14px', color: '#787878' }}>
            You can change it any time you want
          </Typography>
          <Box display="flex" flexDirection={'row'}>
            <Box sx={{ mt: 1, width: '670px' }}>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                  Highest Education Earned
                </Typography>
                <IconTextField
                  size="small"
                  type="text"
                  fullWidth
                  value={highestEducationEarned}
                  onChange={(e) => {
                    setHighestEducationEarned(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      instituteTypeRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                  Institute Type
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={instituteType}
                    onChange={(e) => {
                      setInstituteType(e.target.value);
                      setAnyChange(false);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        instituteNameRef.current.focus();
                      }
                    }}
                  >
                    <FormControlLabel
                      value="school"
                      control={<Radio size="small" />}
                      label="School"
                      inputRef={instituteTypeRef}
                    />
                    <FormControlLabel
                      value="college"
                      control={<Radio size="small" />}
                      label="College"
                    />
                    <FormControlLabel
                      value="company"
                      control={<Radio size="small" />}
                      label="Company"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                  Institute Name
                </Typography>
                <IconTextField
                  inputRef={instituteNameRef}
                  size="small"
                  type="text"
                  fullWidth
                  value={instituteName}
                  onChange={(e) => {
                    setInstituteName(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      studentTypeRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mt: 3, mb: 1 }}>
                  Are you a student or a professional
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={profession}
                    onChange={(e) => {
                      setProfession(e.target.value);
                      setAnyChange(false);
                    }}
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio size="small" />}
                      label="Student"
                      inputRef={studentTypeRef}
                    />
                    <FormControlLabel
                      value="professional"
                      control={<Radio size="small" />}
                      label="Professional"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio size="small" />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {isProfessional ? (
                <>
                  <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                    Company Name
                  </Typography>
                  <IconTextField
                    size="small"
                    type="text"
                    fullWidth
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setAnyChange(false);
                    }}
                  ></IconTextField>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                      Position
                    </Typography>
                    <IconTextField
                      size="small"
                      type="text"
                      fullWidth
                      value={position}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        setAnyChange(false);
                      }}
                    ></IconTextField>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProfessionalInformation;
