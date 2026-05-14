export enum DataType {
  None,
  Image,
  Text,
  Markdown,
}

// data:[<media-type>][;base64],<data>
const dataUrlRegex = /^data:([a-zA-Z0-9]+)\/([a-zA-Z0-9])+(;base64)?,(.+)/;

export function getDataUrlType(url: string) {
  const result = url.match(dataUrlRegex);
  if (!result || result.length === 0) {
    return DataType.None;
  }
  switch (result[1]) {
    case 'image':
      return DataType.Image;
    case 'text':
      switch (result[2]) {
        // TODO: markdown
        default:
          return DataType.Text;
      }
    // TODO: more cases
    default:
      return DataType.None;
  }
}

export function parseDataUrlText(url: string) {
  const result = url.match(dataUrlRegex);
  if (!result || result.length === 0) {
    throw new Error(`Invalid data URL format for ${url}`);
  }
  const base64 = !!(result[3]);
  const text = result[4];
  if (typeof text !== 'string') {
    throw new Error(`Invalid data URL format for ${url}`);
  }
  return base64 ? atob(text) : text;
}
