let token = new URLSearchParams(window.location.search).get("token");

if (token) {
  document.getElementById("app").style.display = "block";
  loadPlaylists();
}

async function loadPlaylists() {
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await res.json();

  document.getElementById("playlists").innerHTML =
    data.items.map(p =>
      `<p onclick="playPlaylist('${p.uri}')">${p.name}</p>`
    ).join("");
}

function play() {
  fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
}

function pause() {
  fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: { Authorization: "Bearer " + token }
  });
}

function playPlaylist(uri) {
  fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ context_uri: uri })
  });
}