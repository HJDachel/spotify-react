const fetch = require('node-fetch');
const axios = require('axios');

const getTopTracks = async (accessToken, term="short_term", limit=10) => {
    const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=${limit}&offset=0`;
    return await axios.get(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(data => data.data.items)
        .catch(error => console.log(error));
};

module.exports = getTopTracks;