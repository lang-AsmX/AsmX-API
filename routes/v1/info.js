const express = require('express');
const Github = require('../../github');
const router = express.Router();

router.get('/info', async (request, response) => {
    let resourceList = {
        releases: null,
        tags: null
    }

    Github.tags().then((data) => {
        let resourceTags = [];
        let count = 0;
    
        if (Reflect.ownKeys(data).includes('message') && Reflect.ownKeys(data).length == 2) {
            response.json({ message: 'API rate limit' });
        } else {

            for (const tag of data) {
                for (const property of Reflect.ownKeys(tag)) {
                    if (['name', 'zipball_url', 'tarball_url'].includes(property)) {
                        if (resourceTags[count] == undefined) resourceTags[count] = {};
                        resourceTags[count][property] = tag[property];
                    }
                }

                count++;
            }

            Github.releases().then(data => {
                let resourceReleases = [];
                let countReleases = 0;
                for (const release of data) {
                    if (resourceReleases[count] == undefined) resourceReleases[count] = {};

                    for (const property of Reflect.ownKeys(release)) {
                        if (['name', 'tag_name', 'created_at', 'published_at'].includes(property)) resourceReleases[count][property] = release[property];

                        if (['assets'].includes(property)) {
                            for (const archive of release[property]) {
                                let archiveCount = 0;
                                for (const property of Reflect.ownKeys(archive)) {
                                    if (['name', 'download_count', 'created_at', 'updated_at', 'browser_download_url'].includes(property)) {
                                        if (resourceReleases[count]['assets'] == undefined) resourceReleases[count]['assets'] = [];
                                        if (resourceReleases[count]['assets'][archiveCount] == undefined) resourceReleases[count]['assets'][archiveCount] = {};
                                        resourceReleases[count]['assets'][archiveCount][property] = archive[property];;
                                    }

                                    archiveCount++;
                                }
                            }
                        }
                    }

                    countReleases++;
                }

                resourceList.releases = resourceReleases;
            });
        }

        resourceList.tags = resourceTags;
        response.json(resourceList);
    });
});

module.exports = router;