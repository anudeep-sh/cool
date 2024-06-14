import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import SelectedProjectTables from '../Components/Contest/SelectedProjectTables';
import {
  TextField,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from '@mui/material';
import { IconTextField } from '../../TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams, Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { manipulateuserdata } from '../../../Redux/UserData/User-Action';
import { SET_ALERT_DATA } from '../../../Redux/UserData/User-Constants';
import SubHeader from '../../SideBarResponsive/SubHeader';
import { contestProblemAPI } from '../../../api/requests/contests/contestProblemAPI';
import { handleAlert } from '../../../utils/handleAlert';
import { backendAPI } from '../../../api/requests/contests/BackendAPI';
import CustomTable from './Methods';
import { contestNidokingAPI } from '../../../api/requests/contests/contestNidoking';
const firebackendUrl = process.env.REACT_APP_FIREBASE_BACKEND_URL;

const EditProblem = () => {
  const [inputTags, setinputTags] = useState(['']);
  const [inputAuthors, setinputAuthors] = useState(['']);
  const [inputInfo, setinputInfo] = useState(['']);
  const [inputHints, setinputHints] = useState(['']);
  const [inputSamplevids, setinputSamplevids] = useState(['']);
  const [inputConstraints, setinputConstraints] = useState(['']);
  const [inputDataapis, setinputDataapis] = useState(['']);
  const [testcases, setTestcases] = useState(['']);
  const [statement, setStatement] = useState(['']);
  const [languages, setLanguages] = useState(['']);
  const [title, setTitle] = useState('');
  const [discussion, setDiscussion] = useState('');
  const [code, setCode] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [maxScore, setMaxScore] = useState();
  const [Api, setApi] = useState([{ apiMethod: '', link: '', description: '' }]);
  const { problemId } = useParams();
  function redirectToNidoking() {
    window.open(`${firebackendUrl}/projects`, '_blank');
  }
  const handleinputchangeTag = (e, index) => {
    const tag = [...inputTags];
    tag[index] = e.target.value;
    setinputTags(tag);
  };

  const handleremoveTag = (index) => {
    if (inputTags.length > 1) {
      const tag = [...inputTags];
      tag.splice(index, 1);
      setinputTags(tag);
    }
  };

  const handleaddclickTag = () => {
    const trimed = inputTags.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputTags([...inputTags, '']);
    }
  };

  const handleinputchangeAuthor = (e, index) => {
    const author = [...inputAuthors];
    author[index] = e.target.value;
    setinputAuthors(author);
  };

  const handleremoveAuthor = (index) => {
    if (inputAuthors.length > 1) {
      const author = [...inputAuthors];
      author.splice(index, 1);
      setinputAuthors(author);
    }
  };
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleaddclickAuthor = () => {
    const trimed = inputAuthors.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputAuthors([...inputAuthors, '']);
    }
  };

  const handleinputchangeInfo = (e, index) => {
    const info = [...inputInfo];
    info[index] = e.target.value;
    setinputInfo(info);
  };

  const handleremoveInfo = (index) => {
    if (inputInfo.length > 1) {
      const info = [...inputInfo];
      info.splice(index, 1);
      setinputInfo(info);
    }
  };

  const handleaddclickInfo = () => {
    const trimed = inputInfo.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputInfo([...inputInfo, '']);
    }
  };

  const handleinputchangeHint = (e, index) => {
    const hint = [...inputHints];
    hint[index] = e.target.value;
    setinputHints(hint);
  };

  const handleremoveHint = (index) => {
    if (inputHints.length > 1) {
      const hint = [...inputHints];
      hint.splice(index, 1);
      setinputHints(hint);
    }
  };

  const handleaddclickHint = () => {
    const trimed = inputHints.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputHints([...inputHints, '']);
    }
  };

  const handleinputchangeSamplevid = (e, index) => {
    const samplevid = [...inputSamplevids];
    samplevid[index] = e.target.value;
    setinputSamplevids(samplevid);
  };

  const handleremoveSamplevid = (index) => {
    if (inputSamplevids.length > 1) {
      const samplevid = [...inputSamplevids];
      samplevid.splice(index, 1);
      setinputSamplevids(samplevid);
    }
  };

  const handleaddclickSamplevid = () => {
    const trimed = inputSamplevids.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputSamplevids([...inputSamplevids, '']);
    }
  };

  const handleinputchangeConstraint = (e, index) => {
    const constraint = [...inputConstraints];
    constraint[index] = e.target.value;
    setinputConstraints(constraint);
  };

  const handleremoveConstraint = (index) => {
    if (inputConstraints.length > 1) {
      const constraint = [...inputConstraints];
      constraint.splice(index, 1);
      setinputConstraints(constraint);
    }
  };

  const handleaddclickConstraint = () => {
    const trimed = inputConstraints.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setinputConstraints([...inputConstraints, '']);
    }
  };

  const handleinputchangeDataapi = (e, index) => {
    const { name, value } = e.target;
    const list = [...Api];
    list[index][name] = value;
    setApi(list);
    let combine =
      String(list[index].apiMethod) +
      ' ' +
      String(list[index].link) +
      ' ' +
      String(list[index].description);
    const dataapi = [...inputDataapis];
    dataapi[index] = combine;
    setinputDataapis(dataapi);
  };

  const handleremoveDataapi = (index) => {
    if (inputDataapis.length > 1) {
      const list = [...Api];
      list.splice(index, 1);
      setApi(list);
      const dataapi = [...inputDataapis];
      dataapi.splice(index, 1);
      setinputDataapis(dataapi);
    }
  };

  const handleaddclickDataapi = () => {
    const trimed = inputDataapis.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setApi([...Api, { apiMethod: '', link: '', description: '' }]);
      setinputDataapis([...inputDataapis, '']);
    }
  };

  const handleinputchangeTestCase = (e, index) => {
    const testcase = [...testcases];
    testcase[index] = e.target.value;
    setTestcases(testcase);
  };

  const handleremoveTestcase = (index) => {
    if (testcases.length > 1) {
      const testcase = [...testcases];
      testcase.splice(index, 1);
      setTestcases(testcase);
    }
  };

  const handleaddclickTestcase = () => {
    const trimed = testcases.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setTestcases([...testcases, '']);
    }
  };

  const handleinputchangeStatement = (e, index) => {
    const statemen = [...statement];
    statemen[index] = e.target.value;
    setStatement(statemen);
  };

  const handleremoveStatement = (index) => {
    if (statement.length > 1) {
      const statemen = [...statement];
      statemen.splice(index, 1);
      setStatement(statemen);
    }
  };

  const handleaddclickStatement = () => {
    const trimed = statement.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setStatement([...statement, '']);
    }
  };

  const handleinputchangeLanguage = (e, index) => {
    const language = [...languages];
    language[index] = e.target.value;
    setLanguages(language);
  };

  const handleremoveLanguage = (index) => {
    if (languages.length > 1) {
      const language = [...languages];
      language.splice(index, 1);
      setLanguages(language);
    }
  };

  const handleaddclickLanguage = () => {
    const trimed = languages.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      alert('This field should not be empty');
    } else {
      setLanguages([...languages, '']);
    }
  };
  const uploadData = async () => {
    const postData = {
      title: title,
      dataApis: inputDataapis,
      applicationId: selectedOption === '' ? null : selectedOption,
      constraints: inputConstraints,
      sampleVideo: inputSamplevids,
      explaination: testcases,
      moreInfo: inputInfo,
      author: inputAuthors,
      code: code,
      hints: inputHints,
      discussion: discussion,
      tags: inputTags,
      statement: statement,
      difficultyLevel: difficultyLevel,
      maximumScore: maxScore,
      languages: languages,
    };
    if (postData) {
      handleUpload(postData);
    } else {
    }
  };

  const [Problem, setProblem] = useState(null);

  useEffect(() => {
    getProblem();
  }, []);

  const objectArray = inputDataapis?.map((str) => {
    const [apiMethod, link, ...description] = str.split(' ');
    return {
      apiMethod,
      link,
      description: description.join(' '),
    };
  });

  useEffect(() => {
    setTitle(Problem?.title);
    setLanguages(Problem?.languages);
    setinputConstraints(Problem?.constraints);
    setTestcases(Problem?.explaination);
    setinputTags(Problem?.tags);
    setinputHints(Problem?.hints);
    setStatement(Problem?.statement);
    setCode(Problem?.code);
    setinputAuthors(Problem?.author);
    setDifficultyLevel(Problem?.difficultyLevel);
    setDiscussion(Problem?.discussion);
    setinputInfo(Problem?.moreInfo);
    setMaxScore(Problem?.maximumScore);
    setinputSamplevids(Problem?.sampleVideo);
    setinputDataapis(Problem?.dataApis);
  }, [Problem]);

  useEffect(() => {
    setApi(objectArray);
  }, [inputDataapis]);

  const getProblem = async () => {
    try {
      const data = await contestProblemAPI.getProblem(problemId);
      setProblem(data?.problemData);

      setSelectedOption(
        data?.problemData?.applicationId !== 'undefined' ? data?.problemData?.applicationId : ''
      );
    } catch (err) { }
  };
  const [project, setProject] = useState([]);
  const [tableOpen, setTableOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableLoader, setTableLoader] = useState(false);
  const [endpointsOpen, setEndpointsOpen] = useState(false);
  const [endpointsData, setEndpointsData] = useState([]);
  const [endpointLoader, setEndpointLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const handleShowEndpoints = async () => {
    setEndpointLoader(true);
    try {
      const response = await backendAPI.getUserApiDetails(selectedOption);
      setEndpointsData(response);
      setEndpointsOpen(true);
    } catch (error) {
      handleAlert('Error fetching endpoints data', 'error');
    }
    setEndpointLoader(false);
  };
  const handleCloseEndpoints = () => {
    setEndpointsOpen(false);
  };
  const handleShowTable = async () => {
    setTableLoader(true);
    await backendAPI
      .getAllSchema(selectedOption)
      .then((res) => {
        setTableData(res);
        setTableOpen(true);
      })
      .catch((error) => {
        handleAlert('Error fetching tables details', 'error');
      });
    setTableLoader(false);
  };
  const handleUpload = async (postData) => {
    try {
      const data = await contestProblemAPI.editProblem(problemId, postData);
      handleAlert('Problem Updated Successfully', 'success');
    } catch (err) {
      handleAlert('Error in Problem Update', 'error');
    }
  };
  const fetchProject = () => {
    contestNidokingAPI
      .getAllApplications()
      .then((res) => {
        setProject(res);
      })
      .catch(() => {
        handleAlert('Error fetching project details', 'error');
      });
  };
  useEffect(() => {
    fetchProject();
  }, []);
  const handleCloseTable = () => {
    setTableOpen(false);
  };
  const drawerWidth = 200;
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
          <Grid xs={12} md={12}>
            <SubHeader title={'Create Problem'} editProblem={true} uploadData={uploadData} />
          </Grid>
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
                  mb: 2.5,
                }}
              >
                {' '}
                <TextField
                  sx={{ mr: 2 }}
                  size="small"
                  id="outlined-basic"
                  label="Problem title"
                  type="text"
                  value={title}
                  fullWidth
                  variant="outlined"
                  onChange={(event) => setTitle(event.target.value)}
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
                  id="outlined-basic"
                  label="Maximum score"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={maxScore}
                  fullWidth
                  onChange={(event) => setMaxScore(event.target.value)}
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
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Difficulty Level</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficultyLevel}
                    label="Difficulty Level"
                    onChange={(event) => setDifficultyLevel(event.target.value)}
                  >
                    <MenuItem value={'EASY'}>Easy</MenuItem>
                    <MenuItem value={'MEDIUM'}>Medium</MenuItem>
                    <MenuItem value={'HARD'}>Hard</MenuItem>
                  </Select>
                  <FormHelperText>
                    Select the difficulty level. This helps participants understand the complexity of the problem.
                  </FormHelperText>
                </FormControl>
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
                  id="outlined-basic"
                  label="Problem Code"
                  helperText="Problem code can be a 5-6 characters shortcode to identify the problem."
                  variant="outlined"
                  type="text"
                  value={code}
                  fullWidth
                  onChange={(event) => setCode(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Provide problem statement points
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Statement points will be shown in list
                </Typography>
                {statement?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeStatement(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickStatement}
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
                          Add more statements
                        </Button>
                        {statement.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveStatement(i)}
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
              <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747', mb: 1 }}>
                  Choose Backend
                </Typography>
                {project && project.length > 0 ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOption}
                    onChange={handleChange}
                    fullWidth
                  >
                    {project?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <p>No backend available</p>
                )}
                {tableLoader ? (
                  <CircularProgress
                    size="1rem"
                    sx={{ alignSelf: 'center', justifySelf: 'center', mr: 2 }}
                  />
                ) : (
                  <Button disabled={!selectedOption} onClick={handleShowTable}>
                    Show Table
                  </Button>
                )}
                {endpointLoader ? (
                  <CircularProgress
                    size="1rem"
                    sx={{ alignSelf: 'center', justifySelf: 'center', ml: 2 }}
                  />
                ) : (
                  <Button disabled={!selectedOption} onClick={handleShowEndpoints}>
                    Show Endpoints
                  </Button>
                )}
                <Button onClick={redirectToNidoking}>Create backend</Button>
                <Button onClick={fetchProject}>Refresh</Button>
              </Grid>
              {/* <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Data Apis
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Add data apis
                </Typography>
                {Api?.map((item, index) => {
                  return (
                    <>
                      <Box sx={{ mb: 2, display: 'flex' }}>
                        <Box display="flex" flexDirection="column" mr={2} sx={{ width: '720px' }}>
                          <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">API Method</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="API method"
                              name="apiMethod"
                              value={item.apiMethod}
                              onChange={(e) => handleinputchangeDataapi(e, index)}
                            >
                              <MenuItem value={'GET'}>GET</MenuItem>
                              <MenuItem value={'POST'}>POST</MenuItem>
                              <MenuItem value={'PUT'}>PUT</MenuItem>
                              <MenuItem value={'PATCH'}>PATCH</MenuItem>
                              <MenuItem value={'DELETE'}>DELETE</MenuItem>
                              <MenuItem value={'COPY'}>COPY</MenuItem>
                              <MenuItem value={'HEAD'}>HEAD</MenuItem>
                              <MenuItem value={'OPTIONS'}>OPTIONS</MenuItem>
                              <MenuItem value={'LINK'}>LINK</MenuItem>
                              <MenuItem value={'UNLINK'}>UNLINK</MenuItem>
                              <MenuItem value={'PURGE'}>PURGE</MenuItem>
                              <MenuItem value={'LOCK'}>LOCK</MenuItem>
                              <MenuItem value={'UNLOCK'}>UNLOCK</MenuItem>
                              <MenuItem value={'PROPFIND'}>PROPFIND</MenuItem>
                              <MenuItem value={'VIEW'}>VIEW</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box display="flex" flexDirection="column" sx={{ width: '720px' }}>
                          <Box>
                            <TextField
                              size="small"
                              type="text"
                              fullWidth
                              id="outlined-basic"
                              name="link"
                              label="API Link"
                              variant="outlined"
                              value={item.link}
                              onChange={(e) => handleinputchangeDataapi(e, index)}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <TextField
                        sx={{ mb: 1 }}
                        size="small"
                        type="text"
                        fullWidth
                        id="outlined-basic"
                        name="description"
                        label="API Description"
                        variant="outlined"
                        value={item.description}
                        onChange={(e) => handleinputchangeDataapi(e, index)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickDataapi}
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
                          Add Additional Apis
                        </Button>
                        {Api.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveDataapi(index)}
                            sx={{ textTransform: 'none', mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid> */}
              <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Enter Tags
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Tags will be shown in list
                </Typography>
                {inputTags?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeTag(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickTag}
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
                          Add more tags
                        </Button>
                        {inputTags.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveTag(i)}
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
                  Enter Constarints
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Constraints will be shown in list
                </Typography>
                {inputConstraints?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeConstraint(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickConstraint}
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
                          Add more constraints
                        </Button>
                        {inputConstraints.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveConstraint(i)}
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
                  Authors
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Authors will be shown in list
                </Typography>
                {inputAuthors?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeAuthor(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickAuthor}
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
                          Add more authors
                        </Button>
                        {inputAuthors.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveAuthor(i)}
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
                  Enter Sample Videos
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Sample video links will be shown in list
                </Typography>
                {inputSamplevids?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeSamplevid(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickSamplevid}
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
                          Add more video links
                        </Button>
                        {inputSamplevids.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveSamplevid(i)}
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
                  Hints
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  All the hints will be shown in list
                </Typography>
                {inputHints?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeHint(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickHint}
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
                          Add more hints
                        </Button>
                        {inputHints.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveHint(i)}
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
                  Provide more information related to the problem
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  Info entered will be shown in list
                </Typography>
                {inputInfo?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeInfo(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickInfo}
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
                          Add more additional info
                        </Button>
                        {inputInfo.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveInfo(i)}
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
                  Enter languages the problem is allowed to be coded in
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  All languages will be shown in list
                </Typography>
                {languages?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeLanguage(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickLanguage}
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
                          Add more languages
                        </Button>
                        {languages.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveLanguage(i)}
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
              {/* <Grid item xs={12} md={12} sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                  Enter sample testcases
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                  All testcases will be shown in list
                </Typography>
                {testcases?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: 'white' }}
                        size="small"
                        label={'Tags'}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeTestCase(e, i)}
                      />
                      <Box display={'flex'} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickTestcase}
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
                          Add more sample testcases
                        </Button>
                        {testcases.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveTestcase(i)}
                            sx={{ textTransform: 'none', mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Dialog open={tableOpen} onClose={handleCloseTable}>
        <DialogTitle>Table for Selected Project</DialogTitle>
        <DialogContent>
          <SelectedProjectTables tableData={tableData} selectedOption={selectedOption} />
        </DialogContent>
      </Dialog>

      <Dialog open={endpointsOpen} onClose={handleCloseEndpoints} maxWidth="850px">
        <DialogContent>
          <CustomTable endpointData={endpointsData} backendId={selectedOption} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProblem;
