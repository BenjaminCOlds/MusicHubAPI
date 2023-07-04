const { Router } = require('express')
const authController = require('../controller/authController')
const router = Router();

router.post('/users/register', authController.register_post)
router.post('/users/login', authController.login_post)

module.exports = router;