import { React } from 'react';
import { InputAdornment, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
export const TextFirldInput = styled(TextField)(() => ({}));
export const InputIconTextField = ({
  handleCancelUpload,
  cancelLoading,
  size,
  label,
  InputLabelProps,
  inputProps,
  required,
  fullWidth,
  iconEnd,
  onChange,
  viewUrl,
  accept,
  helperText,
}) => {
  return (
    <TextField
      size={size}
      label={label}
      helperText={helperText}
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
      inputProps={inputProps}
      required={required}
      fullWidth={fullWidth}
      value={viewUrl ? viewUrl.name : ''}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <label htmlFor={`file-upload-${label}`} style={{ marginLeft: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {cancelLoading ? (
                  <Button
                    variant="outlined"
                    style={{ marginLeft: '4px', border: 'none', paddingRight: '0' }}
                    onClick={handleCancelUpload}
                  >
                    Cancel Upload
                  </Button>
                ) : (
                  <>
                    <InsertDriveFileIcon sx={{ color: '#7795FE' }} />
                    <span style={{ marginLeft: '4px', color: '#7795FE' }}>Choose File</span>
                  </>
                )}
              </div>
            </label>
            <input
              id={`file-upload-${label}`}
              type="file"
              style={{ display: 'none' }}
              onChange={onChange}
              accept={accept}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
