export default () => ({
  database: {
    uri: process.env.MONGODB_URI,
    name: 'NSDB',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
