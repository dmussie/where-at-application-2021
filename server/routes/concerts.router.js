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

// get venue id from the venues database to then utilized router.get('/:id')
router.get('/', (req, res) => {
    // Add query to get all genres
    const query = 'SELECT "venue_id" FROM "venues" ORDER BY "name" ASC';
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all genres', err);
        res.sendStatus(500);
      })
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
    const displayName = req.body.displayName;
    console.log('adding an event title:', displayName);
    const queryText = `INSERT INTO "event_titles" (displayName)
    VALUES ($1)`;
    pool.query(queryText, displayName)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in POST', error);
    })
});

module.exports = router;