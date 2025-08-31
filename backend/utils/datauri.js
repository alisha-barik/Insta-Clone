import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
  if (!file) return null;
  // use originalname to get extension, buffer for file content
  const ext = path.extname(file.originalname).toString();
  return parser.format(ext, file.buffer).content;
};

export default getDataUri;
