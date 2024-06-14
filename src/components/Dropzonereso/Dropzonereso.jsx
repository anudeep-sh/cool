import React, { useState } from 'react';
import { Box, Button, Typography, Stack, TextField, Tooltip } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import edit from '../../assets/courseVideosUpload/edit.svg';
import loader from '../../assets/courseVideosUpload/loader1.gif';
import del from '../../assets/courseVideosUpload/delete.svg';
import Dialogue from '../Dialogbox/Dialogue';
import { useParams } from 'react-router-dom';
import Updatereso from './Updatereso';
import { courseUploadAPI } from '../../api/requests/courses/courseUploadAPI';

const Dropzonereso = ({
  modules,
  addresoid,
  videoindex,
  resoloading,
  loaderindex,
  setresoLoading,
}) => {
  const [resoindex, setResoindex] = useState();
  const [dialog, setDialog] = useState();
  const [opendia, setOpendia] = useState();
  const [editreso, setEditreso] = useState(false);
  const [resoname, setResoname] = useState();
  const [resoid, setResoid] = useState();

  let { id } = useParams();

  const deletereso = async () => {
    try {
      const data = await courseUploadAPI.deleteFile(resoid);
    } catch (err) {}
  };

  const handleDeletereso = () => {
    setOpendia(false);
    deletereso();
    modules[addresoid].videosData[videoindex].extraFiles.splice(resoindex, 1);
  };

  const updatereso = async () => {
    try {
      const data = await courseUploadAPI.updateFile(resoid, { fileName: resoname });
    } catch (err) {}
  };

  const handleresoupdate = () => {
    modules[addresoid].videosData[videoindex].extraFiles[resoindex].fileName = resoname;
    updatereso();
    setEditreso(false);
  };

  return (
    <Stack sx={{ flexDirection: 'column', gap: '8px' }}>
      {modules[addresoid]?.videosData[videoindex]?.extraFiles?.map((file, i) => (
        <Stack
          sx={{
            border: '1px solid rgba(0,0,0,0.06)',
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
            padding: '10px',
            flexDirection: 'column',
            gap: '16px',
          }}
          key={file.name}
        >
          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <Stack direction={'row'} gap={'8px'}>
              <InsertDriveFileOutlinedIcon color="primary" sx={{ width: '30px', height: '32px' }} />
              <Stack
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="column">
                  <Typography sx={{ fontSize: '12px', color: '#1E1E1E' }}>
                    {file.fileName}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    {resoloading && loaderindex === i && <img src={loader} alt="" />}
                    <Typography sx={{ fontSize: '12px', color: '#A0A0A0' }}>
                      {Math.round(file.fileSize / 1000)}KB
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            {!(resoloading && loaderindex === i) && (
              <Stack direction={'row'} gap={'8px'}>
                <Updatereso
                  setresoLoading={setresoLoading}
                  resoloading={resoloading}
                  resoid={file.id}
                  resoindex={i}
                />
                <Tooltip title="Edit file">
                  <img
                    src={edit}
                    alt="edit"
                    onClick={() => {
                      setEditreso(!editreso);
                      setResoid(file.id);
                      setResoindex(i);
                      setResoname(file.fileName);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete file">
                  <img
                    src={del}
                    alt="del"
                    onClick={() => {
                      setDialog(true);
                      setOpendia(true);
                      setResoindex(i);
                      setResoid(file.id);
                    }}
                  />
                </Tooltip>
              </Stack>
            )}
          </Stack>
          {dialog && (
            <Dialogue
              opendia={opendia}
              setOpendia={setOpendia}
              title={'Delete the resource?'}
              content={'Are you sure you want to delete the resource?'}
              handleChange={handleDeletereso}
              i={i}
            />
          )}
          {editreso && resoid === file.id && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ height: '32px', marginBottom: '10px', width: '100%' }}
            >
              <TextField
                label="Edit title"
                value={resoname}
                size="small"
                onChange={(e) => {
                  setResoname(e.target.value);
                }}
                sx={{ width: '88%' }}
              ></TextField>
              <Button
                variant="contained"
                sx={{
                  height: '38px',
                  textTransform: 'capitalize',
                  padding: 'px',
                  backgroundColor: '#698AFF',
                }}
                onClick={() => {
                  handleresoupdate();
                }}
              >
                Update
              </Button>
            </Stack>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default Dropzonereso;
