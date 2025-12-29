const multer = require('multer');

//Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb (null, true);
    } else {
        cb (new Error(" Only .png, .jpg and .jpeg formats are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
