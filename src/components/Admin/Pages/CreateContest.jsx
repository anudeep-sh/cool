import React, { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { TextField, Grid, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IconTextField } from '../../TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import SubHeader from '../../SideBarResponsive/SubHeader';
import { contestAPI } from '../../../api/requests/contests/contestAPI';
import { handleAlert } from '../../../utils/handleAlert';
import { getOrgName } from '../../../utils/appendOrgQuery';
const CreateContest = () => {
  const orgName = getOrgName();
  const drawerWidth = 200;
  const navigate = useNavigate();
  const [startingDate, setstartingDate] = useState(dayjs(''));
  const [endingDate, setendingDate] = useState(dayjs(''));
  const [inputRule, setinputRule] = useState(['']);
  const [inputHost, setinputHost] = useState(['']);
  const [inputSponsor, setinputSponsor] = useState(['']);
  const [inputRemark, setinputRemark] = useState(['']);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [about, setAbout] = useState('');
  const [showDialogue, setShowDialogue] = useState(false);
  const formRef = useRef(null);
  const aboutContestRef = useRef(null);
  const contestCodeRef = useRef(null);
  const constestTypeRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const handleinputchangeRule = (e, index) => {
    const rule = [...inputRule];
    rule[index] = e.target.value;
    setinputRule(rule);
  };

  const handleremoveRule = (index) => {
    if (inputRule.length > 1) {
      const rule = [...inputRule];
      rule.splice(index, 1);
      setinputRule(rule);
    }
  };

  const handleaddclickRule = () => {
    const trimed = inputRule.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputRule([...inputRule, '']);
    }
  };

  const handleinputchangeHost = (e, index) => {
    const host = [...inputHost];
    host[index] = e.target.value;
    setinputHost(host);
  };

  const handleremoveHost = (index) => {
    if (inputHost.length > 1) {
      const host = [...inputHost];
      host.splice(index, 1);
      setinputHost(host);
    }
  };

  const handleaddclickHost = () => {
    const trimed = inputHost.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputHost([...inputHost, '']);
    }
  };

  const handleinputchangeSponsor = (e, index) => {
    const sponsor = [...inputSponsor];
    sponsor[index] = e.target.value;
    setinputSponsor(sponsor);
  };

  const handleremoveSponsor = (index) => {
    if (inputSponsor.length > 1) {
      const sponsor = [...inputSponsor];
      sponsor.splice(index, 1);
      setinputSponsor(sponsor);
    }
  };

  const handleaddclickSponsor = () => {
    const trimed = inputSponsor.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputSponsor([...inputSponsor, '']);
    }
  };

  const handleinputchangeRemark = (e, index) => {
    const remark = [...inputRemark];
    remark[index] = e.target.value;
    setinputRemark(remark);
  };

  const handleremoveRemark = (index) => {
    if (inputRemark.length > 1) {
      const remark = [...inputRemark];
      remark.splice(index, 1);
      setinputRemark(remark);
    }
  };
  const handleaddclickRemark = () => {
    const trimed = inputRemark.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputRemark([...inputRemark, '']);
    }
  };

  const handleChangeStartingDate = (newValue) => {
    setstartingDate(newValue);
  };

  const handleChangeEndingDate = (newValue) => {
    setendingDate(newValue);
  };

  const dataforpost = {
    title: title,
    startingDate: startingDate.$d / 1000,
    endingDate: endingDate.$d / 1000,
    rules: inputRule,
    hostedBy: inputHost,
    specialRemarks: inputRemark,
    sponsers: inputSponsor,
    code: code,
    type: type,
    about: about,
  };

  const [contestId, setContestId] = useState(null);

  const validateContestData = () => {
    if (startingDate.$d / 1000 < dayjs().$d / 1000) {
      handleAlert('Starting date should be greater than current date', 'error');
      return false;
    }
    if (startingDate.$d / 1000 > endingDate.$d / 1000) {
      handleAlert('Ending date should be greater than starting date', 'error');
      return false;
    }

    return true;
  };

  const addContest = async (e) => {
    e.preventDefault();
    if (!formRef.current.reportValidity() || !validateContestData()) return;
    await contestAPI
      .createContest(dataforpost)
      .then((res) => {
        setContestId(res[0]?.id);
        setShowDialogue(true);
        handleAlert('Contest Created', 'success');
        navigate(`/org/${orgName}/admin/${res[0]?.id}`, { replace: true });
      })
      .catch((err) => {
        handleAlert(err?.message, 'error');
      });
  };

  return (
    <>
      <form ref={formRef}>
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            m: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Grid item xs={12} md={12} sx={{ mt: { sm: 3, md: 0 }, display: 'flex' }}>
            <SubHeader title={'Create Contest'} addContest={addContest} />
          </Grid>
          <hr style={{ width: '100%' }} />

          <Grid
            item
            xs={12}
            md={9}
            lg={7}
            sx={{
              py: { xs: '32px!important', md: '16px!important' },
              pr: { xs: '16px', md: '0px' },
            }}
            display="flex"
            alignItems={'center'}
            justifyContent="center"
          >
            <Grid container xs={11} md={12}>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: '8px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                <TextField
                  autoFocus
                  size="small"
                  required
                  sx={{ mr: 2 }}
                  type="text"
                  fullWidth
                  onChange={(event) => setTitle(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  label={'Contest Title'}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      aboutContestRef.current.focus();
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                sx={{
                  pl: { md: '8px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  type="text"
                  required
                  fullWidth
                  onChange={(event) => setAbout(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  label={'About Contest'}
                  inputRef={aboutContestRef}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      contestCodeRef.current.focus();
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: '8px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                <TextField
                  sx={{ mr: 2, mt: 1 }}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  id="outlined-basic"
                  value={code}
                  label="Contest Code"
                  helperText="Contest code can be a 5-6 characters shortcode code to identify your contest."
                  type="text"
                  variant="outlined"
                  onChange={(event) => setCode(event.target.value)}
                  inputRef={contestCodeRef}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      constestTypeRef.current.focus();
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pl: { md: '8px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                {' '}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{ mt: 1 }}
                  id="outlined-basic"
                  value={type}
                  required
                  label="Contest Type"
                  helperText="E.g. FRONTEND or BACKEND"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={(event) => setType(event.target.value)}
                  inputRef={constestTypeRef}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      startDateRef.current.focus();
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: '8px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                {' '}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    type="text"
                    inputRef={startDateRef}
                    fullWidth
                    size="small"
                    label="Pick contest start date"
                    minDateTime={dayjs()}
                    value={startingDate}
                    onChange={handleChangeStartingDate}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        fullWidth
                        required
                        error={false}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            endDateRef.current.focus();
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                sx={{
                  pl: { md: '8px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    inputRef={endDateRef}
                    size="small"
                    minDate={new Date()}
                    minDateTime={dayjs()}
                    label="Pick contest ending date"
                    value={endingDate}
                    onChange={handleChangeEndingDate}
                    renderInput={(params) => (
                      <TextField size="small" {...params} fullWidth required error={false} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Enter Contest Rules
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Rules will be shown in list
                </Typography>
                {inputRule?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Rule'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeRule(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickRule}
                          sx={{ textTransform: 'none', mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: '#698AFF',
                              fontSize: 16,
                              cursor: 'pointer',
                              mr: 1,
                            }}
                          />
                          Add more rules
                        </Button>
                        {inputRule.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveRule(i)}
                            sx={{ textTransform: 'none', mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Enter Host Names
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Hosts will be shown in list
                </Typography>
                {inputHost?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Host'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeHost(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickHost}
                          sx={{ textTransform: 'none', mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: '#698AFF',
                              fontSize: 16,
                              cursor: 'pointer',
                              mr: 1,
                            }}
                          />
                          Add more hosts
                        </Button>
                        {inputHost.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveHost(i)}
                            sx={{ textTransform: 'none', mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Enter Sponsors
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Sponsors will be shown in list
                </Typography>
                {inputSponsor?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Sponsor'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeSponsor(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickSponsor}
                          sx={{ textTransform: 'none', mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: '#698AFF',
                              fontSize: 16,
                              cursor: 'pointer',
                              mr: 1,
                            }}
                          />
                          Add more sponsors
                        </Button>
                        {inputSponsor.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveSponsor(i)}
                            sx={{ textTransform: 'none', mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Special Remarks
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Remarks will be shown in list
                </Typography>
                {inputRemark?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Remark'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeRemark(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickRemark}
                          sx={{ textTransform: 'none', mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: '#698AFF',
                              fontSize: 16,
                              cursor: 'pointer',
                              mr: 1,
                            }}
                          />
                          Add more remarks
                        </Button>
                        {inputRemark.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveRemark(i)}
                            sx={{ textTransform: 'none', mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateContest;
