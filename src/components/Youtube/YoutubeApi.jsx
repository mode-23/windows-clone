import axios from 'axios';

const BASE_URL = 'https://youtube-v3-alternative.p.rapidapi.com';
const options_trends = {
    headers: {
      'X-RapidAPI-Key': '21872e5a5bmsh95b9e11c0801b72p1a47dajsn660c18607769',
      'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
    }
   };
export const fetchFromAPI = async (url) => {
     const {data} = await axios.get(`${BASE_URL}/${url}`, options_trends);
     return data;
}
const DOWNLOAD_URL = 'https://yt-api.p.rapidapi.com/dl'
const DOWNLOAD_OPTIONS = {
  headers: {
    'X-RapidAPI-Key': '21872e5a5bmsh95b9e11c0801b72p1a47dajsn660c18607769',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
  }
 };
 export const fetchDownloadFromAPI = async (id) => {
  const {data} = await axios.get(`${DOWNLOAD_URL}?id=${id}`, DOWNLOAD_OPTIONS);
  return data;
}