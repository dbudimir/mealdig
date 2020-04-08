// Utilities
import React, { useContext } from 'react';
import styled from 'styled-components';

// Components
import Layout from '../components/sitewide/Layout';
import UserContext from '../components/UserContext';
import SignupForm from '../components/forms/SignupForm';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

interface Props {
  setUser: Function;
}

const SignUp = ({ setUser = () => {} }, props: Props) => {
  const userStatus: any = useContext(UserContext);

  return (
    <PageContainer>
      <Layout />
      <SignupForm signIn={userStatus.signIn} setUser={setUser} />
    </PageContainer>
  );
};

export default SignUp;
