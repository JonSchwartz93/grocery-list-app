const axios = require('axios');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

const clientId = process.env.KROGER_CLIENT_ID;
const clientSecret = process.env.KROGER_CLIENT_SECRET;
const krogerBaseUrl = process.env.KROGER_BASE_URL;

let krogerToken = null;
let tokenExpiresAt = null;

const getKrogerToken = async () => {
  const now = Date.now();

  if (krogerToken && tokenExpiresAt && now < tokenExpiresAt) {
    return krogerToken;
  };

  console.log("Fetching new Kroger access token...");

  try {
    const response = await axios.post(
      `${krogerBaseUrl}/connect/oauth2/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "product.compact",
      }),
      {
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    )
    
    krogerToken = response.data.access_token;
    tokenExpiresAt = now + response.data.expires_in * 1000;
  } catch (error) {
    console.error(`Error fetching Kroger API token: ${error}`);
  }
}

app.get('/products', async (req, res) => {
  try {
    const token = await getKrogerToken();

    const response = await axios.get(
      `${krogerBaseUrl}/products`,
      {
        headers: {
          'Authorization': `bearer ${token}`,
        },
        params: req.query
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.log('Error fetching data from Kroger API', error);
    res.status(500).json({ error: error.message });
  }
})
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
