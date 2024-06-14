import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { TextField, Grid, Button, Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IconTextField } from '../../TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import EditProblemCard from '../Components/EditProblemCard';
import SubHeader from '../../SideBarResponsive/SubHeader';
import 'react-multi-carousel/lib/styles.css';
import '../../ProductCarousel/Product.css';
import { contestAPI } from '../../../api/requests/contests/contestAPI';
import { getOrgName } from '../../../utils/appendOrgQuery';
import { handleAlert } from '../../../utils/handleAlert';

const EditContest = () => {
  const orgName = getOrgName();
  const params = useParams();
  const drawerWidth = 200;
  const [startingDate, setstartingDate] = useState(dayjs(''));
  const [endingDate, setendingDate] = useState(dayjs(''));
  const [inputRule, setinputRule] = useState(['']);
  const [inputHost, setinputHost] = useState(['']);
  const [inputSponsor, setinputSponsor] = useState(['']);
  const [inputRemark, setinputRemark] = useState(['']);
  const [title, setTitle] = useState(null);
  const [code, setCode] = useState(null);
  const [type, setType] = useState(null);
  const [about, setAbout] = useState(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const responsive = {
    desktop: {
      breakpoint: { max: 6000, min: 1024 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const navigate = useNavigate();

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

  const uploadData = async (e) => {
    e.preventDefault();
    const postData = {
      title: title,
      startingDate: startingDate?.$d / 1000,
      endingDate: endingDate?.$d / 1000,
      rules: inputRule,
      hostedBy: inputHost,
      specialRemarks: inputRemark,
      sponsers: inputSponsor,
      code: code,
      type: type,
      about: about,
    };
    if (postData) {
      handleUpload(postData);
    } else {
    }
  };

  const [Contest, setContest] = useState(null);
  const [Problems, setProblems] = useState(Contest?.problemData);

  useEffect(() => {
    getContest();
  }, []);

  useEffect(() => {
    setTitle(Contest?.contestData[0]?.title);
    setstartingDate(dayjs(Contest?.contestData[0]?.startingDate * 1000));
    setendingDate(dayjs(Contest?.contestData[0]?.endingDate * 1000));
    setAbout(Contest?.contestData[0]?.about);
    setinputSponsor(Contest?.contestData[0]?.sponsers);
    setinputRemark(Contest?.contestData[0]?.specialRemarks);
    setinputHost(Contest?.contestData[0]?.hostedBy);
    setinputRule(Contest?.contestData[0]?.rules);
    setCode(Contest?.contestData[0]?.code);
    setType(Contest?.contestData[0]?.type);
    setProblems(Contest?.problemData);
  }, [Contest]);

  const getContest = async () => {
    try {
      const data = await contestAPI.getContest(params?.contestId);
      setContest(data);
    } catch (err) {}
  };

  const handleUpload = async (postData) => {
    try {
      const data = await contestAPI.editContest(params?.contestId, postData);
      handleAlert('Contest Edited Successfully', 'success');
    } catch (err) {
      handleAlert('Error Editing Contest', 'error');
    }
  };

  return (
    <>
      <form>
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
          <Grid
            xs={12}
            md={12}
            sx={{
              mt: { sm: 3, md: 0 },
              borderBottom: 'none',
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
            }}
          >
            <SubHeader title={'Edit Contest'} uploadData2={uploadData} />
          </Grid>
          <hr style={{ width: '100%' }} />
          <Grid
            item
            xs={12}
            md={9}
            lg={6}
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
                  mb: 0,
                }}
              >
                <TextField
                  size="small"
                  sx={{ mr: 2 }}
                  type="text"
                  fullWidth
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  label={'Contest Title'}
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
                  fullWidth
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  label={'About Contest'}
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
                  value={code}
                  helperText="Contest code can be a 5-6 characters shortcode code to identify your contest."
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  id="outlined-basic"
                  label="Contest Code"
                  type="text"
                  variant="outlined"
                  onChange={(event) => setCode(event.target.value)}
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
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{ mt: 1 }}
                  id="outlined-basic"
                  value={type}
                  helperText="E.g. FRONTEND or BACKEND"
                  label="Contest Type"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={(event) => setType(event.target.value)}
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    type="text"
                    fullWidth
                    size="small"
                    minDateTime={dayjs()}
                    label="Pick contest start date"
                    value={startingDate}
                    onChange={handleChangeStartingDate}
                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
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
                    size="small"
                    label="Pick contest ending date"
                    minDateTime={dayjs()}
                    value={endingDate}
                    onChange={handleChangeEndingDate}
                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
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
                        label={'Tags'}
                        value={item}
                        fullWidth
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
                        label={'Tags'}
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
                        label={'Tags'}
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
                        label={'Tags'}
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
              <Grid item xs={12} pt={'0px!important'}>
                <Typography variant="h5" mb={1}>
                  Problems
                </Typography>

                {Problems?.length > 0 ? (
                  <>
                    {Problems?.map((item, index) => {
                      return <EditProblemCard key={index} Problem={item} />;
                    })}
                    <Stack alignItems="flex-end">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          minWidth: {
                            xs: '100%!important',
                            md: 'min-content!important',
                          },
                        }}
                        onClick={() => {
                          navigate(`/org/${orgName}/admin/${params?.contestId}`);
                        }}
                      >
                        Create More
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Box display="flex" flexDirection="row" sx={{ p: 4, alignItems: 'center' }}>
                      <Box>
                        <Typography
                          sx={{
                            m: 'auto',
                            fontWeight: '200',
                            fontSize: '13px',
                          }}
                          paragraph
                        >
                          No Problems, you can create your problem from
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/org/${orgName}/admin/${params?.contestId}`);
                          }}
                        >
                          Create Problem
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditContest;
