import { stringify } from 'query-string';


const version = '3';
// TODO: Add dotenv support
const apiKey = process.env.API_KEY;

export default (endpoint, params = {}) => {
  const defaultParams = {
    api_key: apiKey,
  };
  const queryParams = {...defaultParams, ...params};
  const base = `https://api.themoviedb.org/${version}`;
  const url = base + (endpoint[0] === '/' ? endpoint : `/${endpoint}`);

  return `${url}?${stringify(queryParams)}`;
}
