import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptionsCompanyImg = {
    storage: diskStorage({
        destination: './uploads/company/img',
        filename: (req, file, cb) => {
            console.log('filefilefilefile', file)
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        },
    }),
};
export const multerOptionsCompanyBackground = {
    storage: diskStorage({
        destination: './uploads/company/background',
        filename: (req, file, cb) => {
            console.log('filefilefilefile', file)
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        },
    }),
};
export const multerOptionsProductImg = {
    storage: diskStorage({
        destination: './uploads/product/img',
        filename: (req, file, cb) => {
            console.log('filefilefilefile', file)
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        },
    }),
};
export const multerOptionsUserImg = {
    storage: diskStorage({
        destination: './uploads/user/img',
        filename: (req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        },
    }),
};