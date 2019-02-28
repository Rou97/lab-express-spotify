const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();

// Remember to insert your credentials here
const clientId = '7be94f75eef1409887867105d4eb92a7';
const clientSecret = '69bac255f33e4c59af686a928bcaaacc';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    const artists = await spotifyApi.searchArtists(name);
    const listOfArtists = artists.body.artists.items;
    res.render('artists', { listOfArtists });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
