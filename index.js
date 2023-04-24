const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const router = express.Router(); // Create a new router instance
const port = 4000;
const apiKey = '998f928658da4165a625558e23617e6d'; // previously got rate limited on my email for more than 100 uses per 24hrs

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API request functions with error handling
const fetchUSBusinessNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch US business news' };
  }
};

const fetchWSJNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch WSJ news' };
  }
};

const fetchBitcoinNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch Bitcoin news' };
  }
};

const fetchAllNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch all news' };
  }
};

// Define routes using the router object
router.get('/usbusiness', async (req, res) => {
  res.json(await fetchUSBusinessNews());
});

router.get('/wsj', async (req, res) => {
  res.json(await fetchWSJNews());
});

router.get('/bitcoin', async (req, res) => {
  res.json(await fetchBitcoinNews());
});

router.get('/allnews', async (req, res) => {
  res.json(await fetchAllNews());
});

// Use the router object for all routes starting with "/"
app.use('/', router);

app.listen(port, async () => {
  console.log(`Server is listening on port: ${port}`);
});