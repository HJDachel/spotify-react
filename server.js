require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const getRecentlyPlayed = require('./getRecentlyPlayed');
const credentials = require('./credentials');

const clientUrl = process.env.CLIENT_URL;

const app = express();

const spotifyApi = new SpotifyWebApi({
    redirectUri: credentials.redirect_uri,
    clientId: credentials.client_id,
    clientSecret: credentials.client_secret
});

let access_token;
let refresh_token;
let expires_in;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(credentials.scopes));
});

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error: ', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            access_token = data.body['access_token'];
            refresh_token = data.body['refresh_token'];
            expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);

            res.redirect(`${clientUrl}/?authorized=true`);

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});

app.get('/history', (req, res) => {
    getRecentlyPlayed(access_token)
        .then(data => {
            const arr = data.map(e => ({
                played_at: e.played_at,
                track_name: e.track.name,
            }));

            res.json(arr);
        })
        .catch(err => console.log(err));
});

app.get('/toptracks', (req, res) => {
    const options = {
        time_range: req.query.term,
        limit: req.query.limit
    }
    spotifyApi.getMyTopTracks(options)
        .then(data => {
            res.json(data.body.items);
        })
        .catch(err => console.error(err));
});

// app.get('/toptracks', (req, res) => {
//     getTopTracks(access_token, req.query.term, req.query.limit)
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => console.log(err));
// });

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});