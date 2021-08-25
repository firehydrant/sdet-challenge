export default function fetcher(endpoint, args = { method: 'GET' }) {
  return fetch(`http://localhost:3001${endpoint}`, args)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
