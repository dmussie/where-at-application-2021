const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:search', (req, res) => {
    console.log('req.params are:', req.params.search);
    axios.get(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${process.env.SONGKICK_API_KEY}&query=${req.params.search}`)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log(error);
    }); 
});

module.exports = router;