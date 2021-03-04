const fetch = require('node-fetch');
const axios = require('axios');

const getTopTracks = (accessToken,term) => {
    const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=10&offset=0`;
    console.log(accessToken);
    return axios.get(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(data => data.items)
        .catch(error => console.log(error));
};

module.exports = getTopTracks;