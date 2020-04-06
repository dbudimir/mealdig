// Utilities
import React, { useContext } from 'react';
import UserContext from '../UserContext';

//Styles
import styled from 'styled-components';

//Components
import Nav from '../sitewide/navigation/Nav';
import Feedback from '../sitewide/Feedback'

const GlobalLayout = styled.div`
  position: sticky;
  top: 0px;
  z-index: 10;
`;

const Layout: React.FC = ({}) => {
  const userStatus: any = useContext(UserContext);

  const signOut = (e: any) => {
    e.preventDefault();
    userStatus.signOut();
  };	

  const updateFeedbackModal = () => {
    localStorage.setItem('feedBackPopUpSeen', 'true');
  };

  return (
    <GlobalLayout>
      <div className="navbar">
			<Nav signOut={signOut} />
      </div>
		<Feedback updateFeedbackModal={updateFeedbackModal} />
    </GlobalLayout>
  );
};

export default Layout;
