import axios from 'axios';
import { config } from '../config';

export const getAllSongs = () => {
  return axios.get(config.api_url+'/songs')
    .then(res => res.data)
    .catch(err => err)
}
