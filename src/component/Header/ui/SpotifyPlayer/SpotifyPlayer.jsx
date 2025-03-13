import { useEffect, useState } from "react";
import axios from "axios";

const SpotifyPlayer = () => {
  const [token, setToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          `https://finalprojectt-001-site1.jtempurl.com/api/spotify/token`
        );
        setToken(response?.data.accessToken);
      } catch (error) {
        console.error("Error fetching Spotify token => ", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const playerInstance = new window.Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      setPlayer(playerInstance);

      playerInstance.addListener("ready", async ({ device_id }) => {
        setDeviceId(device_id);

        await fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ device_ids: [device_id], play: true }),
        });

        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ context_uri: "spotify:playlist:37i9dQZF1E39onNinwEbhO" }),
        });
      });

      playerInstance.connect();
    };
  }, [token]);

  const togglePlayPause = async () => {
    if (!player) return;
    const state = await player.getCurrentState();
    if (!state) {
      return;
    }
    if (state.paused) await player.resume();
    else {
      setIsPaused(true)
      await player.pause()
    };
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-4 rounded-lg text-white">
      <h2 className="text-xl mb-4">Spotify Web Player</h2>
      {deviceId ? (
        <>
          <p>🎶 Playing on your browser!</p>
          <button onClick={togglePlayPause} className="mt-4 px-4 py-2 bg-green-500 rounded-lg">
            {isPaused ? "Play ▶️" : "Pause ⏸️"}
          </button>
        </>
      ) : (
        <p>⏳ Spotify yüklənir</p>
      )}
    </div>
  );
};

export default SpotifyPlayer;
