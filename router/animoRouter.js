// this redirects the user (a.k.a. the client) to the various webpages based
// on the URL

const express = require('express');
const router = express();
const middleware = require('../middlewares/animoMiddleware');
const controller = require('../controller/index');

router.get('/', controller.getHome);

modules.exports = animoRouter;