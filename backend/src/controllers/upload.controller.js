import { loggerDefault } from "../utils/loggers.js";



export  const fileUploadSuccess = (req,res)=>{
    loggerDefault.info("File Upload Success");
    res.json({
        message: 'File uploaded successfully',
        file: req.file
    });
}

