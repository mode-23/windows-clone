import axios from 'axios';

const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com';
const options_trends = {
     headers: {
          'X-RapidAPI-Key': '21872e5a5bmsh95b9e11c0801b72p1a47dajsn660c18607769',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
     }
   };
export const deezerFromApi = async (url) => {
     const {data} = await axios.get(`${BASE_URL}/${url}`, options_trends);
     return data;
}