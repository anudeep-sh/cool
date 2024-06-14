import { Button, Stack, Box } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import TaskModal from '../TaskModal';
import DropBox from '../DragDrop/DropBox';
import DroppedFile from '../DragDrop/DroppedFile';
import BtnSubmission from './BtnSubmission';
import UtilFunctions from '../UtilFunctions';

const BtnOpenUpload = ({ subtaskId, taskProgress }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [fileProgress, setFileProgress] = useState(null);
  const [uploadCancelled, setUploadCancelled] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const handleCancelUpload = (event = { preventDefault: () => {} }) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        onClick={() => {
          if (cancelLoading) {
            handleCancelUpload();
          } else {
            setOpen(true);
          }
        }}
        size="small"
        variant="contained"
        startIcon={<UploadFileIcon />}
        sx={{ width: '100%', textTransform: 'none !important' }}
      >
        {cancelLoading
          ? 'Cancel Upload'
          : UtilFunctions.getSubtaskProgress(subtaskId, taskProgress)?.submission?.fileUrl
          ? 'Change File'
          : 'Upload File'}
      </Button>
      <TaskModal
        open={open}
        setOpen={setOpen}
        title="Upload File"
        subtitle="Choose file to upload for the subtask"
      >
        <Stack sx={{ height: '100%' }} spacing={2}>
          <Stack sx={{ height: '100%' }} justifyContent="space-between" spacing={2}>
            <Stack spacing={2.5}>
              <DropBox setFile={setFile} setFileProgress={setFileProgress} subtaskId={subtaskId} />
              <DroppedFile
                setCancelToken={setCancelToken}
                file={file}
                setFile={setFile}
                fileProgress={fileProgress}
                setFileProgress={setFileProgress}
                subtaskId={subtaskId}
                fileUrl={fileUrl}
                setFileUrl={setFileUrl}
                uploadCancelled={uploadCancelled}
                setCancelLoading={setCancelLoading}
              />
            </Stack>
            <BtnSubmission
              subtaskId={subtaskId}
              setOpen={setOpen}
              fileUrl={fileUrl}
              setUploadCancelled={setUploadCancelled}
              cancelLoading={cancelLoading}
            />
          </Stack>
        </Stack>
      </TaskModal>
    </Box>
  );
};

export default BtnOpenUpload;
