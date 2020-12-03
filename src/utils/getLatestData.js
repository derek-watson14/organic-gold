export default async function getLatestData(query) {
  return fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => {
      console.log('Data fetching error:');
      console.log(err);
      return null;
    });
}
