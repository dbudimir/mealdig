/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

// Utilities
import React, { Component } from 'react';
import Link from 'next/link';

interface Props {
  signOut: Function;
}
interface State {}

export default class LoggedInNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  handleSignOut = (e: any) => {
    const { signOut } = this.props;

    signOut(e);
    window.location.replace('/');
  };

  render() {
    return (
      <>
        <Link
          href={{
            pathname: '/user/[user]',
            query: { userId: localStorage.username }
          }}
          as={{ pathname: `/user/${localStorage.username}` }}
        >
          <a href={`/user/${localStorage.username}`}>
            <span>My Orders</span>
          </a>
        </Link>
        <Link href="/">
          <span onClick={this.handleSignOut}>
            <a>Log Out</a>
          </span>
        </Link>
      </>
    );
  }
}
