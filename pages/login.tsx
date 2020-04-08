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
  setUser: Function;
}
const Login: React.FC<Props> = ({ setUser = () => {} }, props: Props) => {
  const userStatus: any = useContext(UserContext);

  return (
    <PageContainer>
      <Layout />
      <LoginFormContainer signIn={userStatus.signIn} setUser={setUser} />
    </PageContainer>
  );
};

export default Login;
