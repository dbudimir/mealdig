import { NextPage } from 'next';
// import classes from '../styles/style.module.scss';

import Layout from '../components/sitewide/Layout';
import Search from '../components/Search';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <>
    <Layout />
    <Search />
  </>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Home;
