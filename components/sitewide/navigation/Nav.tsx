/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Utilities
import React, { Component } from 'react';

// Styles
import NavBar from '../../../styles/NavBar';

// Components
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

interface Props {
  signOut: Function;
}

interface State {
  navItems: JSX.Element[] | JSX.Element | undefined;
}

export default class Nav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      navItems: <LoggedOutNav />
    };
  }

  componentDidMount() {
    this.getStatus();
  }

  getStatus = () => {
    const { signOut } = this.props;
    let userLoggedIn;
    if (localStorage.length > 0) {
      userLoggedIn = <LoggedInNav signOut={signOut} />;
    } else if (localStorage.length === 0) {
      userLoggedIn = <LoggedOutNav />;
    }
    this.setState({
      navItems: userLoggedIn
    });
  };

  render() {
    const { state } = this;

    return <NavBar>{state.navItems}</NavBar>;
  }
}
