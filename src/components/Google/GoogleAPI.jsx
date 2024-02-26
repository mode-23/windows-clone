import axios from 'axios';
const axios = require('axios');
const BASE_URL = 'https://google.serper.dev/search'
let data = JSON.stringify({
  "q": "frontend mentor"
});

let config = {
  method: 'post',
  url: BASE_URL,
  headers: { 
    'X-API-KEY': '334b5c1ec4fe49faf586c6bd927bae8fcbed6299', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

// export const fetchFromAPI = async (url) => {
//      const {data} = await axios.get(`${BASE_URL}/${url}`, options_trends);
//      return data;
// }