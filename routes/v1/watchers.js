const express = require('express');
const Github = require('../../github');
const router = express.Router();

router.get('/watchers', (request, response) => {
    Github.stargazers().then(data => {
        if (Reflect.ownKeys(data).includes('message') && Reflect.ownKeys(data).length == 2) {
            response.json({ message: 'API rate limit' });
        } else {
            let resource = {
                count: data?.length || 0,
                watchers: []
            };

            for (const star of data) {
                resource.watchers.push({
                    avatar_url: star?.avatar_url || null,
                    profile_url: star?.html_url || null,
                    name: star?.login || null
                });
            }

            response.json(resource);
        }
    });
});

module.exports = router;