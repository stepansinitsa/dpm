import { diskStorage } from 'multer';
import path from 'path';

const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 10 }, // Максимум 10 MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error('Недопустимый тип файла'), false);
      return;
    }
    cb(null, true);
  },
};

export default multerConfig;