const express = require('express');
const router = express.Router();

const releasesRouter = require('./releases');
const tagsRouter = require('./tags');
const warchersRouter = require('./watchers');
const infoRouter = require('./info');

router.use('/', releasesRouter);
router.use('/', tagsRouter);
router.use('/', warchersRouter);
router.use('/', infoRouter);

module.exports = router;