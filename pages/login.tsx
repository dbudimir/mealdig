import React, { useContext } from 'react';
import styled from 'styled-components';

import Layout from '../components/sitewide/Layout';
import UserContext from '../components/UserContext';
import LoginFormContainer from '../components/forms/LoginFormContainer';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

interface Props {
  updateUser: Function;
}

const Login = ({ updateUser = () => {} }, props: Props) => {
  const userStatus: any = useContext(UserContext);

  return (
    <PageContainer>
      <Layout />
      <LoginFormContainer signIn={userStatus.signIn} updateUser={updateUser} />
    </PageContainer>
  );
};

export default Login;
