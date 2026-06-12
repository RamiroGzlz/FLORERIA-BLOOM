const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

// LOGIN
app.get("/login", (req, res) => {
  const scope = "user-read-email playlist-read-private streaming user-read-playback-state user-modify-playback-state";

  res.redirect(
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" + client_id +
    "&scope=" + encodeURIComponent(scope) +
    "&redirect_uri=" + encodeURIComponent(redirect_uri)
  );
});

// CALLBACK
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
      client_id,
      client_secret
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const token = response.data.access_token;

  res.redirect("/?token=" + token);
});

app.listen(3000, () => console.log("http://localhost:3000"));