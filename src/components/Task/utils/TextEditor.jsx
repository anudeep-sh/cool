import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const TextEditor = ({ textValue, setTextValue, displayValue }) => {
  if (displayValue)
    return (
      <ReactQuill
        style={{
          height: '85%',
          overflow: 'scroll',
          border: '2px solid #e0e0e0',
          borderRadius: '6px',
        }}
        theme="bubble"
        value={displayValue}
        readOnly
      />
    );

  return (
    <ReactQuill
      style={{ height: '85%', overflow: 'scroll' }}
      theme="snow"
      value={textValue}
      onChange={setTextValue}
    />
  );
};

export default TextEditor;
