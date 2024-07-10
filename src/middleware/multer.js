import multer from "multer";

const generateRandomString = (length) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a random 10-digit string
    const randomName = generateRandomString(10);
    const extension = file.originalname.split('.').pop();
    cb(null, `${randomName}.${extension}`);
  },
});

const upload = multer({ storage });

const uploadMiddleware = upload.single("profilePicture");

export default uploadMiddleware;
