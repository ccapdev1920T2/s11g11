// this redirects the user (a.k.a. the client) to the various webpages based
// on the URL

const express = require('express');
const router = express();
const middleware = require('../middleware/animoMiddleware');
const controller = require('../controller/index');

router.get('/', controller.getHome);
router.get('/home', controller.getHome);
router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);
router.get('/userprofile', controller.getProfile);
router.get('/viewcourses', controller.getCourseOffer);
router.get('/searchclasses', controller.getSearchCOffer);
router.get('/vieweaf', controller.getViewEAF);
router.get('/addclass', controller.getAddClass);
router.get('/dropclass', controller.getDropClass);
router.get('/swapclass', controller.getSwapClass);

// @kresshamae patapos na nitong middlewares pls
//router.post('/login', middleware.validateLogin, controller.postLogin);
//router.post('/register', middleware.validateRegister, controller.postRegister);

router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);
router.post('/register', controller.postRegister);
router.post('/addclass', controller.postAddClass);

module.exports = router;