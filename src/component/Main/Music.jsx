import React, { useEffect, useState } from 'react';

// Authorization token that must have been created previously. 
const token = 'BQBf3fbO_U1MgbKZc8jRcwXHN14iI_UZ5xR8ZaArfDveqnDLI2KjJyZUcxtkipq2KogXOLrBXVsomvXn9CiWlueOv8fj9lutryW7fyZl0CrTIARqXhJbXT0Dzwj3xcZG_XidnVk8dmyA6plg7rGLmTP8ezn_5fDj-vEXrQOM_lZxQM5bMeMj9eN-KoH-U-iT-8nRBBuYtr1p9R_J-iNVRY5oKPN5CT9Pbel7Aiz9DZC0b_RaXJ8Qu5jXr6NHBR3_8xrJ-_ADhbTnjTx0-LG5fpd3I45ktDIWsgSeOMFmcYHS6x18cl8mSTL0';

async function fetchWebApi(endpoint, method = 'GET', body = null) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });
  return await res.json();
}

async function getTopTracks() {
  return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=2')).items;
}

async function createPlaylist(tracksUri) {
  const { id: user_id } = await fetchWebApi('v1/me', 'GET');

  // Create a new playlist for the user
  const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, 'POST', {
    name: 'My top tracks playlist',
    description: 'Playlist created by the tutorial on developer.spotify.com',
    public: false,
  });

  // Add tracks one by one
  for (let i = 0; i < tracksUri.length; i++) {
    await fetchWebApi(`v1/playlists/${playlist.id}/tracks?uris=${tracksUri[i]}`, 'POST');
  }

  return playlist;
}

const Music = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topTracksData = await getTopTracks();
        setTopTracks(topTracksData);

        const tracksUri = topTracksData.map(track => track.uri);

        const createdPlaylist = await createPlaylist(tracksUri);
        setPlaylist(createdPlaylist);
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="music-player">
      <h1>Spotify Web Playback</h1>

      {topTracks.length > 0 && (
        <div>
          <h2>Your Top Tracks</h2>
          <ul>
            {topTracks.map(({ name, artists }, index) => (
              <li key={index}>
                {name} by {artists.map(artist => artist.name).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {playlist && (
        <div>
          <h3>Created Playlist: {playlist.name}</h3>
          <iframe
            title="Spotify Embed: Recommendation Playlist"
            src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: '360px' }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default Music;
