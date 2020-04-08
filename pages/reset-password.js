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

function ResetPassword({ updateUser = () => {} }) {
  const userStatus = useContext(UserContext);

  ResetPassword.propTypes = {
    updateUser: PropTypes.func,
  };

  return (
    <PageContainer>
      <Layout />
      <ResetPasswordForm signIn={userStatus.signIn} updateUser={updateUser} />
    </PageContainer>
  );
}

export default ResetPassword;
