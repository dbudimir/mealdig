import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from '../components/sitewide/Layout';
import UserContext from '../components/UserContext';
import ResetPasswordForm from '../components/forms/ResetPassword';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

interface Props {
  setUser: Function;
}

const ResetPassword = ({ setUser = () => {} }, props: Props) => {
  const userStatus: any | undefined = useContext(UserContext);

  return (
    <PageContainer>
      <Layout />
      <ResetPasswordForm signIn={userStatus.signIn} setUser={setUser} />
    </PageContainer>
  );
};

export default ResetPassword;
