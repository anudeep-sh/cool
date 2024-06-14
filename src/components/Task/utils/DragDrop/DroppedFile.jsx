import { Stack, Typography, Box, Tooltip } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ClearIcon from '@mui/icons-material/Clear';
import UploadProgress from './UploadProgress';
import UtilFunctions from '../UtilFunctions';
import IconFileUpload from './IconFileUpload';
import BtnViewFile from '../Buttons/BtnViewFile';

const DroppedFile = (props) => {
  return (
    <Stack>
      {props.file && (
        <Typography variant="body1" sx={{ p: 0.5, color: '#bdbdbd' }}>
          Click above to change file
        </Typography>
      )}

      <Box
        sx={{
          border: `1.5px solid ${props.file ? '#698aff' : '#bdbdbd'}`,
          borderRadius: '10px',
          p: 2,
          bgcolor: '#f5f5f5',
        }}
      >
        {props.file ? (
          <>
            {props.fileProgress === null || props.fileProgress === 100 ? (
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Stack sx={{ flexGrow: 1 }} spacing={2} direction="row">
                  <InsertDriveFileIcon sx={{ color: '#698aff' }} />
                  <Stack spacing={1}>
                    <Typography variant="body1">{props.file.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                      Size : {UtilFunctions.formatBytes(props.file.size)}
                    </Typography>
                  </Stack>
                </Stack>
                {props.fileProgress === 100 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BtnViewFile url={props?.fileUrl} btnText="Preview" />{' '}
                  </Box>
                ) : (
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <IconFileUpload
                      file={props.file}
                      setCancelToken={props.setCancelToken}
                      setFileProgress={props.setFileProgress}
                      setFileUrl={props.setFileUrl}
                      uploadCancelled={props.uploadCancelled}
                      setCancelLoading={props.setCancelLoading}
                    />
                    <Tooltip title="Remove File">
                      <ClearIcon
                        onClick={() => props.setFile(null)}
                        sx={{ color: 'grey', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </Stack>
                )}
              </Stack>
            ) : (
              <UploadProgress progress={props.fileProgress} />
            )}
          </>
        ) : (
          <Typography sx={{ color: 'grey', textAlign: 'center' }}>No File Chosen</Typography>
        )}
      </Box>
    </Stack>
  );
};

export default DroppedFile;
