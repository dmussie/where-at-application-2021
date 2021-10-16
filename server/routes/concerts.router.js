const express = require('express');
const axios = require('axios');
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
// req.body???
router.get('/:id', (req, res) => {
    console.log('req.params is:', req.params);
    axios.get(`https://api.songkick.com/api/3.0/venues/${req.params.id}.json?apikey=${process.env.SONGKICK_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log(error);
    }); 
});

//get event info data from songkick
// router.get('/:event', (req, res) => {
//     console.log('req.params are:', req.params.search);
//     axios.get(`https://api.songkick.com/api/3.0/events/${req.params.event}.json?apikey=${process.env.SONGKICK_API_KEY}`)
//     .then(response => {
//         res.send(response.data)
//     })
//     .catch(error => {
//         console.log(error);
//     }); 
// });

module.exports = router;