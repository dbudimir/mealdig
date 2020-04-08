// Utilities
import React, { Component } from 'react';
import Link from 'next/link';

interface Props {}
interface State {
  mobileMenuOpen: boolean;
}

export default class LoggedOutNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mobileMenuOpen: false
    };
  }

  openMobileMenu = (e: any) => {
    e.preventDefault();
    console.log('clicked open');

    this.setState(prevState => ({
      mobileMenuOpen: !prevState.mobileMenuOpen
    }));
  };

  render() {
    const { mobileMenuOpen } = this.state;

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

        <div className={'mobile-menu-icon'} onClick={e => this.openMobileMenu(e)}>
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

        <div className={mobileMenuOpen ? 'menu open-logged-out' : 'menu'}>
          <Link
            href={{
              pathname: '/login',
              query: { action: 'login' }
            }}
            as={{ pathname: `/login` }}
          >
            <a href="/login">
              <span className="log-in">Log In</span>
            </a>
          </Link>

          <Link
            href={{
              pathname: '/signup',
              query: { action: 'signup' }
            }}
            as={{ pathname: `/signup` }}
          >
            <a href="/signup">
              <span className="sign-up">Sign Up</span>
            </a>
          </Link>

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
