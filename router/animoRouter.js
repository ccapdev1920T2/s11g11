// this redirects the user (a.k.a. the client) to the various webpages based
// on the URL

const express = require('express');
const router = express();
const middleware = require('../middlewares/animoMiddleware');
const controller = require('../controller/index');

router.get('/', controller.getHome);
router.get('/home', controller.getHome);
router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);
router.get('/profile', controller.getProfile);
router.get('/viewcourses', controller.getCourseOffer);
router.get('/addclass', controller.getAddClass);
router.get('/dropclass', controller.getDropClass);
router.get('/swapclass', controller.getSwapClass);

router.post('/login', middleware.validateLogin, controller.postLogin);
router.post('/register', middleware.validateRegister, controller.postRegister);
modules.exports = animoRouter;