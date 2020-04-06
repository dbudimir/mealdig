import { NextPage } from 'next';
// import classes from '../styles/style.module.scss';

import Layout from '../components/sitewide/Layout';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <>
    <Layout />
      <h1>Hello world! - user agent: {userAgent}</h1>
  </>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Home;
