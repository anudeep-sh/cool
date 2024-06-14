import React from 'react';
import { AttachFileOutlined, EmojiEmotionsOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';
import { handleAlert } from '../../utils/handleAlert';

export default function ChatInputField({
  inputValue,
  setInputValue,
  handleKeyPress,
  handleSendMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  setUploadedFile,
  setUploadLoader,
}) {
  const fileUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      const file = event.target.files[0];
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setUploadLoader(true);
      try {
        const url = await handleFileUpload(file, source.token, reference);
        if (url) {
          setUploadedFile({ file, url });
        }
      } catch (error) {
        handleAlert('Error uploading file:', error);
      } finally {
        setUploadLoader(false);
      }
    }
  };

  return (
    <TextField
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onKeyDown={handleKeyPress}
      value={inputValue}
      fullWidth
      variant="outlined"
      placeholder="Type a message..."
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '40px',
          borderRadius: '200px',
          marginBottom: '10px',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '24px',
        },
        width: '100%',
        display: 'flex',
        marginLeft: 'auto',
        paddingX: '10px',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon onClick={() => handleSendMessage()} sx={{ cursor: 'pointer' }} />
            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <EmojiEmotionsOutlined />
            </IconButton>
            <input
              id="file-upload"
              type="file"
              accept="image/*, video/*, .pdf, .doc, .docx"
              onChange={fileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload">
              <IconButton component="span">
                <AttachFileOutlined />
              </IconButton>
            </label>
          </InputAdornment>
        ),
      }}
    />
  );
}
