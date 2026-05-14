import './index.css';
import { DataType, getDataUrlType, parseDataUrlText } from '@/utils.ts';
import { useMemo, useState } from 'react';

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [dataType, setDataType] = useState(DataType.None);
  const [outputValue, setOutputValue] = useState('');

  const viewDataUrl = () => {
    const type = getDataUrlType(inputValue);
    setDataType(type);
    setOutputValue(inputValue);
  };

  const outputText = useMemo(() => {
    if (dataType === DataType.Text) {
      try {
        return parseDataUrlText(outputValue);
      } catch (err) {
        return err instanceof Error ? err.message : `${err}`;
      }
    }
  }, [dataType, outputValue]);

  return (
    <div id="main">
      <h1>Data URL Viewer</h1>
      <h2><label htmlFor="input">Input</label></h2>
      <textarea id="input" placeholder="data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button id="submit" onClick={viewDataUrl}>View</button>
      <h2>Output</h2>
      <div id="output">
        {dataType === DataType.Image && (
          <img src={outputValue} alt='Image content of the data URL' />
        )}
        {dataType === DataType.Text && (
          <pre>{outputText}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
