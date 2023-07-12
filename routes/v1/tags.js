const express = require('express');
const Github = require('../../github');
const router = express.Router();

router.get('/tags', (request, response) => {
    Github.tags().then((data) => {
        let resource = [];
        let count = 0;
    
        if (Reflect.ownKeys(data).includes('message') && Reflect.ownKeys(data).length == 2) {
            response.json({ message: 'API rate limit' });
        } else {

            for (const tag of data) {
                for (const property of Reflect.ownKeys(tag)) {
                    if (['name', 'zipball_url', 'tarball_url'].includes(property)) {
                        if (resource[count] == undefined) resource[count] = {};
                        resource[count][property] = tag[property];
                    }
                }

                count++;
            }

            response.json(resource);
        }
    });
});

module.exports = router;