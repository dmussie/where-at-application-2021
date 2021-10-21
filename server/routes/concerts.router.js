const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();

//get artist data from songkick 
// router.get('/:artist', (req, res) => {
//     console.log('req.params are:', req.params.artist);
//     axios.get(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${process.env.SONGKICK_API_KEY}&query=${req.params.artist}`)
//     .then(response => {
//         res.send(response.data)
//     })
//     .catch(error => {
//         console.log(error);
//     }); 
// });

//perform an additional router.get to FIND a venue id
//FAKE DATA to write saga and reducer stuff
//

router.get('/venue/:venue', (req, res) => {
    console.log('req.params is:', req.params);
    axios.get(`https://api.songkick.com/api/3.0/search/venues.json?query=${req.params.venue}&apikey=${process.env.SONGKICK_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log(error);
    }); 
});

// get venue data from songkick
// with venue ids 
router.get('/:id', (req, res) => {
    console.log('req.params is:', req.params);
    axios.get(`https://api.songkick.com/api/3.0/venues/${req.params.id}/calendar.json?apikey=${process.env.SONGKICK_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log(error);
    }); 
});

router.post('/', (req, res) => {
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
router.get('/', (req, res) => {
    // Add query to get all genres
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

  router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM "events" WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing SELECT plant query', err);
        res.sendStatus(500);
      });
  });

  router.put('/', (req, res) => {
    const updatedConcert = req.body;
  
    const queryText = `UPDATE "events"
    SET "displayName" = $1, 
    "city" = $2, 
    "time" = $3, 
    "uri" = $4 
    WHERE "id"=$5;`;
  
    const queryValues = [
      updatedConcert.displayName,
      updatedConcert.city,
      updatedConcert.time,
      updatedConcert.uri,
      updatedConcert.id,
    ];
  
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing SELECT plant query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;