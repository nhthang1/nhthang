/* eslint-disable linebreak-style */
const express = require('express');
const authRouter = express.Router();
const authControllers= require('../controllers/auth.controllers');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(file);
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});


function router(uri) {
  authRouter.route('/signUp')
    .post(authControllers.auth_create_user);

  authRouter.route('/signin')
    .all(authControllers.auth_check_admin)
    .get(authControllers.auth_get_page)
    .post(authControllers.auth_login);

  authRouter.route('/profile')
    .get(authControllers.auth_get_profile)
    .post(upload.single("photo"),authControllers.user_change_profile);
  return authRouter;
}
module.exports = router;
