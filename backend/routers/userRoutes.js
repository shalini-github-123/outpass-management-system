
const express = require('express')
const { registerUser, authUser,studentData } = require("../controllers/userControllers")

const router = express.Router()

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/details/:studentId').get(studentData);

module.exports = router;