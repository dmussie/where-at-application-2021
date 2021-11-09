const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * @api {get} /venue/:venue Request Venue query information
 * @apiName GetVenues
 * @apiGroup venue
 * @apiPermission user
 * @apiDescription returns all id's and a host of other information about a venue entered by a user. 
 * Intended to be utilized in a subsequent GET request. 
 *
 *
 * @apiSuccessExample {json} Success Response:
 * ...
 * "venue": [
                {
                    "id": 62500,
                    "displayName": "The Armory",
                    "uri": "https://www.songkick.com/venues/62500-armory?utm_source=60230&utm_medium=partner",
                    "metroArea": {
                        "displayName": "Twin Cities",
                        "country": {
                            "displayName": "US"
                        },
                        "state": {
                            "displayName": "MN"
                        },
                        "id": 35130,
                        "uri": "https://www.songkick.com/metro-areas/35130-us-twin-cities?utm_source=60230&utm_medium=partner"
                    },
                    "lat": 44.97522,
                    "lng": -93.2635,
                    "street": "500 Sixth St. S.",
                    "zip": "55415",
                    "phone": "(612) 315-3965",
                    "website": "http://armorymn.com/",
                    "description": "A revitalized building from the 1930s. The most expensive building built in Minnesota at the time. \r\nAs of early 2017, the Minneapolis Armory is poised to make a triumphant return. The venue has returned to its roots - being the host to a number of social functions: concerts, sporting events, trade shows, and other private celebrations.",
                    "capacity": 8000,
                    "city": {
                        "displayName": "Minneapolis",
                        "country": {
                            "displayName": "US"
                        },
                        "state": {
                            "displayName": "MN"
                        }
                    }
                },
    ...
  * @apiExample Example Usage:
    http://localhost:5000/api/concerts/venue/:venue
 */

router.get('/venue/:venue', rejectUnauthenticated, (req, res) => {
    console.log('req.params is:', req.params);
    axios.get(`https://api.songkick.com/api/3.0/search/venues.json?query=${req.params.venue}&apikey=${process.env.SONGKICK_API_KEY}`)
    .then(response => {
        // Promise.all (Chris suggestion)
        res.send(response.data)
    })
    .catch(error => {
        console.log(error);
    }); 
});

/**
 * @api {get} /:id/:min_date/:max_date Request Venue query information
 * @apiName GetEvents
 * @apiGroup event
 * @apiPermission user
 * @apiDescription returns events associated with a venue's id.  
 *
 *
 * @apiSuccessExample {json} Success Response:
 * ...
 * "event": [
                {
                    "id": 39855389,
                    "displayName": "Tiësto at The Armory (October 30, 2021)",
                    "type": "Concert",
                    "uri": "https://www.songkick.com/concerts/39855389-tiesto-at-armory?utm_source=60230&utm_medium=partner",
                    "status": "ok",
                    "popularity": 0.255527,
                    "start": {
                        "date": "2021-10-30",
                        "datetime": "2021-10-30T20:00:00-0500",
                        "time": "20:00:00"
                    },
                    "performance": [
                        {
                            "id": 75328695,
                            "displayName": "Tiësto",
                            "billing": "headline",
                            "billingIndex": 1,
                            "artist": {
                                "id": 152971,
                                "displayName": "Tiësto",
                                "uri": "https://www.songkick.com/artists/152971-tiesto?utm_source=60230&utm_medium=partner",
                                "identifier": [
                                    {
                                        "mbid": "aabb1d9f-be12-45b3-a84d-a1fc3e8181fd",
                                        "href": "https://api.songkick.com/api/3.0/artists/mbid:aabb1d9f-be12-45b3-a84d-a1fc3e8181fd.json"
                                    }
                                ]
                            }
                        }
                    ],
                    "ageRestriction": null,
                    "flaggedAsEnded": false,
                    "venue": {
                        "id": 62500,
                        "displayName": "The Armory",
                        "uri": "https://www.songkick.com/venues/62500-armory?utm_source=60230&utm_medium=partner",
                        "metroArea": {
                            "displayName": "Twin Cities",
                            "country": {
                                "displayName": "US"
                            },
                            "state": {
                                "displayName": "MN"
                            },
                            "id": 35130,
                            "uri": "https://www.songkick.com/metro-areas/35130-us-twin-cities?utm_source=60230&utm_medium=partner"
                        },
                        "lat": 44.97522,
                        "lng": -93.2635
                    },
                    "location": {
                        "city": "Minneapolis, MN, US",
                        "lat": 44.97522,
                        "lng": -93.2635
                    }
                },
    ...
  * @apiExample Example Usage:
    http://localhost:5000/:id/:min_date/:max_date
 */ 
router.get('/:id/:min_date/:max_date', rejectUnauthenticated, (req, res) => {
    console.log('req.params is:', req.params);
    axios.get(`https://api.songkick.com/api/3.0/venues/${req.params.id}/calendar.json?min_date=${req.params.min_date}&max_date=${req.params.max_date}&apikey=${process.env.SONGKICK_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log(error);
    }); 
});

/**
 * @api {post} /event Add a event
 * @apiName AddEvent
 * @apiGroup Event
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 */

// TODO: Switch to Async await after presentation
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body:', req.body);
    const insertEventQuery = `
    INSERT INTO "events" ("displayName", "city", "time", "uri")
    VALUES ($1, $2, $3, $4) RETURNING id;`;
    // first query makes concert
    pool.query(insertEventQuery, 
        [req.body.displayName,
        req.body.city,
        req.body.time,
        req.body.uri])
    .then((result) => {
        console.log('New event Id:', result.rows[0].id);
        
        const eventId = result.rows[0].id; 

        // now handle user reference
        const userEventsJunctionQuery = `
        INSERT INTO "user_events" ("user_id", "event_id")
        VALUES ($1, $2)`
        // look up asychronous express request (pizza parlour assignment)
        // more recommended approach
        // potential lecture topic!!!
        pool.query(userEventsJunctionQuery, [req.user.id, eventId])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })

    // catch for the first query    
    }).catch((error) => {
        console.log('Error in POST', error);
    })
});

// get event id from the user_events database to then utilized router.get('/:id')
router.get('/', rejectUnauthenticated, (req, res) => {
    // Add query to get all concerts
    console.log('in router.get');
    const query = `SELECT * FROM "user_events" 
	JOIN "events" ON "events"."id" = "user_events"."event_id"
	WHERE "user_id" = $1;`;
    pool.query(query, [req.user.id])
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all concerts', err);
        res.sendStatus(500);
      })
  });

  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'DELETE FROM "user_events" WHERE "event_id"=$1';
    console.log('delete req.params.id', req.params.id);
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing DELETE concert query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;