import { NextPage } from 'next';
import classes from './style.module.scss';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) =>
  <div className={classes.Home}>
    <h1>
      Hello world! - user agent: {userAgent}
    </h1>
  </div>;

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Home;
