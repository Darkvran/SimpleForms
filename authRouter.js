const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');



router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 6 и меньше 20 символов").isLength({min:4, max:20}),
    check('email', 'Некорректный адрес электронной почты').isEmail()
],controller.registration);
router.post('/login', controller.login);

module.exports = router;