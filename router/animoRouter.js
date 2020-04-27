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
router.get('/verification', controller.getVerify);
router.get('/userprofile', controller.getProfile);
router.get('/viewcourses', controller.getCourseOffer);
router.get('/searchclasses', controller.getSearchCOffer);
router.get('/vieweaf', controller.getViewEAF);
router.get('/addclass', controller.getAddClass);
router.get('/dropclass', controller.getDropClass);
router.get('/swapclass', controller.getSwapClass);

router.post('/logout', controller.postLogout);
router.post('/login', controller.postLogin);
router.post('/register', middleware.validateRegister, controller.postRegister);
router.post('/verification', middleware.validateVerify, controller.postVerify);
router.post('/addclass', middleware.validateAddClass, controller.postAddClass);
router.post('/dropclass', middleware.validateDropClass, controller.postDropClass);
router.post('/swapclass', middleware.validateSwapClass, controller.postSwapClass);

module.exports = router;
