import axios from 'axios';
import { config } from '../config';

export const getAllSongs = () => {
  // Api PHP
  return axios.get(config.api_url+'/api/songs/all')
    .then(res => {
      // console.log(res);
      return res.data
    })
    .catch(err => err)
}

export const savePict = (file) => {
  let formData = new FormData();
  formData.append('image', file);

  return axios({
    method: 'POST',
    url: config.api_pict+"/api/songs/pict",
    data: formData,
    headers: {
      "Access-Control-Allow-Origin": " *",
      "Content-Type": "multipart/form-data"
    }
  })
  .then(res => res.data)
  .catch(err => err)
}

export const saveSong = (file) => {
  let formData = new FormData();
  formData.append('song', file);

  return axios({
    method: 'POST',
    url: config.api_music+"/api/songs/mp3",
    data: formData,
    headers: {
      "Access-Control-Allow-Origin": " *",
      "Content-Type": "multipart/form-data"
    }
  })
  .then(res => res.data)
  .catch(err => err)
}
