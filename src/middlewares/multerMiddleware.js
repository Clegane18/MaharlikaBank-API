const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads');
  },
  filename: function (req, file, cb) {
    const userEmail = req.body.email; 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    const filename = `${userEmail}_profilePicture-${uniqueSuffix}.${fileExtension}`;
    req.filename = filename; // Store the filename in the request object for later use in the route handler
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;