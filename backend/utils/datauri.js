import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file)=>{
    const extName = path.extname(file.orginalname).toString();
    return parser.format(extName, file.buffer).content
}

export default getDataUri;