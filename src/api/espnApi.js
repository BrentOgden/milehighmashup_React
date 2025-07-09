// src/api/espnApi.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://site.api.espn.com/apis/site/v2',
});
