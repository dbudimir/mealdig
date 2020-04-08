/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

// Utilities
import React, { Component } from 'react';
import Link from 'next/link';

interface Props {
  signOut: Function;
}

interface State {
  userDropdownOpen: boolean;
  mobileMenuOpen: boolean;
}

export default class LoggedInNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userDropdownOpen: false,
      mobileMenuOpen: false
    };
  }

  handleSignOut = (e: any) => {
    const { signOut } = this.props;

    signOut(e);
    window.location.replace('/');
  };

  openUserDropdown = (e: any) => {
    e.preventDefault();

    this.setState(prevState => ({
      userDropdownOpen: !prevState.userDropdownOpen
    }));
  };

  openMobileMenu = (e: any) => {
    e.preventDefault();

    this.setState(prevState => ({
      mobileMenuOpen: !prevState.mobileMenuOpen
    }));
  };

  render() {
    const { userDropdownOpen, mobileMenuOpen } = this.state;

    return (
      <>
        <Link
          href={{
            pathname: '/'
          }}
          as={{ pathname: '/' }}
        >
          <a className="logo" href="/">
            <img
              className="icon-logo"
              src="../../../static/ui-resources/mealdig-icon-logo.png"
              alt="Mealdig Icon Logo"
            />
            <h1>Mealdig</h1>
          </a>
        </Link>

        <div className="search"></div>

        <div className="mobile-menu-icon" onClick={e => this.openMobileMenu(e)}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>

        <div className={mobileMenuOpen ? 'menu open-logged-in' : 'menu'}>
          <div className="user-dropdown" onClick={e => this.openUserDropdown(e)}>
            <span className="username">{localStorage.username}</span>

            <div
              className="open-dropdown"
              style={{ display: userDropdownOpen ? 'block' : 'none' }}
              // onMouseLeave={e => this.openUserDropdown(e)}
            >
              <div className="my-stuff">
                <h4 className="title">My Stuff</h4>
                <Link
                  href={{
                    pathname: '/user/[user]',
                    query: { userId: localStorage.username }
                  }}
                  as={{ pathname: `/user/${localStorage.username}` }}
                >
                  <a href={`/user/${localStorage.username}`}>
                    <span>Orders</span>
                  </a>
                </Link>

                <Link
                  href={{
                    pathname: '/user/favorites/[user]',
                    query: { userId: localStorage.username }
                  }}
                  as={{ pathname: `/user/favorites/${localStorage.username}` }}
                >
                  <a href={`/user/favorites/${localStorage.username}`}>
                    <span>Favorites</span>
                  </a>
                </Link>
              </div>
              <hr />
              <div className="tools">
                <Link
                  href={{
                    pathname: '/user/[user]/account-settings',
                    query: { user: localStorage.username }
                  }}
                  as={{ pathname: `/user/${localStorage.username}/account-settings` }}
                >
                  <a href={`/user/${localStorage.username}/account-settings`}>
                    <span>Settings</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </a>
                </Link>
                <Link href="/">
                  <a href="/" onClick={this.handleSignOut}>
                    <span>Log Out</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <Link
            href={{
              pathname: '/create-order'
            }}
            as={{ pathname: `/create-order` }}
          >
            <a href="/create-order">
              <span className="create-order">
                Create Order
                {/* <img src="/static/plus.svg" alt="Plus Icon" /> */}
              </span>
            </a>
          </Link>
        </div>
      </>
    );
  }
}
