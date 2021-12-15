import multer from 'multer';

const storage = multer.diskStorage({
  
  destination: (req, file, callback) => callback (null, './public/uploads'),

  filename: (req, file, callback) => callback (null , file.originalname + '-' + Date.now() )
  
});

export const upload = multer({ storage })