import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '@sanity/client'


const client = sanityClient({
  projectId: 'ujvu50xg',
  dataset: 'prod',
  token: "", // or leave blank to be anonymous user
  useCdn: true // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client);

const urlFor = (source) => {
  return builder.image(source);
}

export { builder, urlFor };
export default client;