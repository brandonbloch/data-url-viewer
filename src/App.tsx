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
    <div className="main">
      <header className="header">
        <h1>Data URL Viewer</h1>
      </header>
      <div className="columns">
        <div className="column-left">
          <textarea id="input"
                    placeholder="data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=="
                    aria-label="Input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
          />
          <button id="submit" onClick={viewDataUrl}>View</button>
        </div>
        <div className="column-right">
          <div id="output">
            {dataType === DataType.Image && (
              <img src={outputValue} alt="Image content of the data URL" />
            )}
            {dataType === DataType.Text && (
              <pre>{outputText}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
