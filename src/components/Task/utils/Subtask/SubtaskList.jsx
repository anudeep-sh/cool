import { useEffect, useState } from 'react';
import { List, ListItem, Stack, Typography, Box, Button } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import TaskMenu from '../TaskMenu';
import ButtonViewSections from '../Buttons/ButtonViewSections';
import ButtonViewText from '../Buttons/ButtonViewText';
import ReadMore from '../ReadMore';
import SubtaskProgress from './SubtaskProgress';
import BtnViewFile from '../Buttons/BtnViewFile';
import UtilFunctions from '../UtilFunctions';
import ButtonAddText from '../Buttons/ButtonAddText';
import { getDuration } from '../../../../utils/getDuration';
import getRoleForOrganization from '../../../../utils/GetUserRoleInOrganization';
import ButtonAssignOneSubtask from '../../CreateAndEdit/AssignSubtask';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { getOrgName } from '../../../../utils/appendOrgQuery';

const SubtaskList = (props) => {
  const [subtasks, setSubtasks] = useState(props.subTasksData);
  const navigate = useNavigate();
  const orgName = getOrgName();

  useEffect(() => {
    (function assignedSubtask() {
      const subTaskIds = props?.progressData?.subTaskprogress.map((item) => item.subTaskId);
      const filteredSubtasksdata = props?.subTasksData?.filter((subtask) =>
        subTaskIds?.includes(subtask.id)
      );
      if (filteredSubtasksdata?.length > 0) setSubtasks(filteredSubtasksdata);
    })();
  }, [props?.progressData, props?.subTasksData]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);

  const handleContestOnClick = (id) => {
    navigate(`/org/${orgName}/admin/contest/${id}/problems`);
  };

  return (
    <List
      sx={{
        height: '80vh',
        maxHeight: '100vh',
        overflow: 'scroll',
        border: '1.5px solid #e0e0e0',
        borderRadius: '10px',
        px: { xs: 0.7, md: 2 },
        marginTop: '0px !important',
        py: 0,
        mb: 2,
      }}
    >
      {subtasks?.map((subtask, i) => (
        <ListItem
          sx={{
            borderBottom: '1.5px solid #e0e0e0',
            py: 1.5,
            alignItems: 'flex-start',
          }}
          key={i}
        >
          <TagIcon
            sx={{
              mr: 2.5,
              color: 'grey',
              display: { xs: 'none', sm: 'block' },
              mt: 2.5,
            }}
          />
          <Stack spacing={1} sx={{ width: '100%' }}>
            <Stack
              direction={{ xs: props.viewMode ? 'column' : 'row', md: 'row' }}
              justifyContent="space-between"
              spacing={1}
            >
              <Stack direction="row" sx={{ gap: '12px' }} flexWrap="wrap" alignItems="center">
                <Typography>{subtask?.title}</Typography>
                <Typography
                  sx={{
                    fontSize: '10.8px',
                    border: `0.2px solid ${props.typeColors[subtask?.type.toLowerCase()].border}`,
                    color: props.typeColors[subtask?.type.toLowerCase()].color,
                    px: 1.2,
                    py: 0.2,
                    borderRadius: '4px',
                  }}
                >
                  {subtask?.type}
                </Typography>
              </Stack>
              {!props.viewMode ? (
                <TaskMenu isParentTask={props.isParentTask} subtask={subtask} />
              ) : (
                props.progressData && (
                  <SubtaskProgress subtaskId={subtask?.id} taskProgress={props.progressData} />
                )
              )}
            </Stack>

            <Stack
              spacing={1}
              direction={{
                xs: subtask?.type?.toLowerCase() === 'contest' && 'column-reverse',
                md: subtask?.type?.toLowerCase() === 'contest' ? 'column-reverse' : 'row',
              }}
              justifyContent="space-between"
              alignItems={{ md: subtask?.type?.toLowerCase() === 'contest' ? '' : 'center' }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1, md: 1 }}
                justifyContent={{
                  md: subtask?.type?.toLowerCase() === 'contest' ? 'flex-start' : 'space-between',
                  xs: subtask?.type?.toLowerCase() === 'contest' ? 'flex-start' : 'space-between',
                }}
              >
                {subtask?.type?.toLowerCase() === 'course' && (
                  <Typography sx={{ color: 'grey', fontSize: '12.8px' }}>
                    <span style={{ color: '#000000DE' }}>Title : </span>
                    {subtask?.info?.title}
                  </Typography>
                )}
                <Typography sx={{ color: 'grey', fontSize: '12.8px' }}>
                  <span style={{ color: '#000000DE' }}>Duration : </span>
                  {getDuration(subtask).day > 1
                    ? `${getDuration(subtask).day.toFixed(2)} days `
                    : getDuration(subtask).day === 1
                    ? `${getDuration(subtask).day.toFixed(2)} day `
                    : ''}
                  {getDuration(subtask).hour > 1
                    ? `${getDuration(subtask).hour.toFixed(2)} hours `
                    : getDuration(subtask).hour === 1
                    ? `${getDuration(subtask).hour.toFixed(2)} hour `
                    : ''}
                  {getDuration(subtask).minute > 1
                    ? `${getDuration(subtask).minute.toFixed(2)} minutes `
                    : getDuration(subtask).minute === 1
                    ? `${getDuration(subtask).minute.toFixed(2)} minute `
                    : ''}
                  {/* {UtilFunctions.convertDuration(subtask?.duration)}{' '}
                  {subtask?.duration >= 86400
                    ? subtask?.duration === 86400
                      ? 'day'
                      : 'days'
                    : subtask?.duration >= 3600
                    ? subtask?.duration === 3600
                      ? 'hour'
                      : 'hours'
                    : subtask?.duration >= 60
                    ? subtask?.duration === 60
                      ? 'minute'
                      : 'minutes'
                    : 'minutes'} */}
                </Typography>

                <Typography
                  sx={{
                    color: 'grey',
                    fontSize: '12.8px',
                  }}
                >
                  <span style={{ color: '#000000DE' }}>Start Time : </span>
                  {UtilFunctions.parseEpochTime(subtask.startsAt)} (
                  {UtilFunctions.parseEpochDate(subtask.startsAt)} )
                </Typography>
              </Stack>
              {/* -------------  CONTEST ------------ */}
              {subtask?.type?.toLowerCase() === 'contest' && (
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={{ xl: 4 }}
                  alignItems={{ xs: 'flex-start', xl: 'center' }}
                  sx={{ flexWrap: 'wrap', gap: '12px' }}
                  justifyContent={'space-between'}
                >
                  <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={1}>
                    <Typography
                      sx={{
                        fontSize: '10.8px',
                        bgcolor: '#f5f5f5',
                        color: 'grey',
                        px: 0.8,
                        py: 0.2,
                        borderRadius: '4px',
                      }}
                      variant="body1"
                    >
                      {subtask?.info?.code?.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#4DB6AC',
                        border: '1px solid #e0f2f1',
                        width: 'fit-content',
                        fontSize: '10.8px',
                        px: 0.8,
                        py: 0.2,
                        borderRadius: '4px',
                      }}
                      variant="body1"
                    >
                      {subtask?.info?.type?.toUpperCase()}
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={2}>
                      <Typography sx={{ color: 'grey', fontSize: '12.8px' }}>
                        <span style={{ color: '#000000DE' }}>Title : </span>
                        {subtask?.info?.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: '12.8px' }}
                        variant="body1"
                      >
                        <span style={{ color: '#000000DE' }}>Min Score : </span>
                        {subtask.minScore}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction={'row'}>
                    {(role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') && (
                      <ButtonAssignOneSubtask props={props?.subtask} />
                    )}
                    <Button
                      variant="outlined"
                      sx={{ textTransform: 'none !important' }}
                      size="small"
                      endIcon={<ChevronRightIcon />}
                      onClick={() => handleContestOnClick(subtask.contestId)}
                    >
                      Go To Contest
                    </Button>
                  </Stack>
                </Stack>
              )}

              {/*---------------- TEXT ----------------*/}

              {props.viewMode && subtask?.type?.toLowerCase() === 'text' && (
                <>
                  {props.progressData ? (
                    <Stack direction="row" spacing={1}>
                      <ButtonAddText
                        subtaskId={subtask?.id}
                        taskProgress={props.progressData}
                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', flex: 1 }}
                      />
                      <BtnViewFile
                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', flex: 1 }}
                        subtaskId={subtask?.id}
                        taskProgress={props.progressData}
                        btnText="View File"
                      />
                    </Stack>
                  ) : (
                    <ButtonViewText
                      subtask={subtask}
                      fileRequired={subtask?.isFileRequired}
                      displayValue={subtask?.textEditor}
                    />
                  )}
                </>
              )}

              {!props.viewMode && subtask?.type?.toLowerCase() === 'text' && (
                <ButtonViewText
                  subtask={subtask}
                  fileRequired={subtask?.isFileRequired}
                  displayValue={subtask?.textEditor}
                />
              )}
              {/*--------------- COURSE ---------------*/}
              {subtask?.type?.toLowerCase() === 'course' && (
                <ButtonViewSections
                  id={subtask.id}
                  subtask={subtask}
                  sections={subtask?.info?.sections.filter((section) =>
                    subtask.sectionIds.includes(section.id)
                  )}
                  progressData={props?.progressData}
                />
              )}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ gap: '8px', flexWrap: 'wrap-reverse' }}
            >
              <Box>
                <span style={{ fontSize: '12.8px' }}>Description : </span>
                <ReadMore fontSize="12.8px" color="text.secondary">
                  {subtask?.description}
                </ReadMore>
              </Box>
              {subtask?.type?.toLowerCase() === 'contest' &&
                props.viewMode &&
                props.progressData && (
                  <Typography
                    sx={{
                      color: '#8d6e63',
                      border: '1px solid #d7ccc8',
                      width: 'fit-content',
                      fontSize: '12.8px',
                      px: 0.8,
                      py: 0.2,
                      borderRadius: '4px',
                    }}
                    variant="body1"
                  >
                    User's Score:{' '}
                    {props.progressData.subTaskprogress.find(
                      (progressD) => progressD.subTaskId === subtask.id
                    )?.progress?.score ?? 'N/A'}
                  </Typography>
                )}
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};

export default SubtaskList;
