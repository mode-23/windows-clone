const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://openai80.p.rapidapi.com/chat/completions',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '21872e5a5bmsh95b9e11c0801b72p1a47dajsn660c18607769',
    'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
  },
  data: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":${"hello"}}]}`
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});