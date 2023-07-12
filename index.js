const express = require('express');
const Github = require('./github');

const app = express();
const PORT = process.env.PORT || 3000;

const ROUTER_V1_API = require('./routes/v1/index');

app.use('/api/v1/AsmX', ROUTER_V1_API);

app.listen(PORT, () => {
    console.log(`🚀 Server run: http://localhost:${PORT}`);
});