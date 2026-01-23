import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, 'upload/')
  },
  filename:(req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname)
  }
});
const upload = multer({storage})
export {upload}
