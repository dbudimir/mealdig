import * as React from 'react';
import NextApp from 'next/app';
import Router from 'next/router';
import { NextSeo } from 'next-seo';
import UserContext from '../components/UserContext';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-KGFF5HN'
};

interface Props {
  pageProps: object;
}

interface State {
  userName: string;
  email: string;
  userId: string;
  accessLevel: string;
  isLoggedIn: boolean;
  nextAction: Function;
}

class App extends NextApp<Props, State> {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      userId: '',
      accessLevel: '',
      isLoggedIn: false,
      nextAction: () => {}
    };
  }

  componentDidMount = () => {
    TagManager.initialize(tagManagerArgs);
    const user = localStorage;
    this.setState({
      user
    });
  };

  // Manages user sign in
  signIn = (userName: string, email: string, userId: string, accessLevel: string, isLoggedIn: string) => {
    // Set user state on sign in
    this.setState({ userName, email, userId, accessLevel, isLoggedIn });
    // Save user state to local storage
    localStorage.setItem('username', userName);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessLevel', accessLevel);
    localStorage.setItem('isLoggedIn', isLoggedIn);
    // Redirect to homepage if not creating an order
    if (window.location.pathname !== '/create-order') {
      Router.push('/');
    }
  };

  // Manages user sign out
  signOut = async () => {
    this.setState({ userName: '', email: '', userId: '', isLoggedIn: false }, () => {
      localStorage.clear();
      Router.push('/');
    });
  };

  switchNextAction = (nextAction: Function) => this.setState({ nextAction });

  render() {
    const { Component, pageProps } = this.props;
    const { userName, email, userId, accessLevel, isLoggedIn, nextAction } = this.state;

    return (
      <>
        <NextSeo
          title="MealDig | Custom fast-casual meals."
          description="Discover new meals and custom orders at your favorite fast-casual dining spots. Select a chain and search for a meal type to get started."
          canonical="https://mealdig.com/"
          openGraph={{
            url: 'https://mealdig.com/',
            title: 'MealDig | Custom fast-casual meals.',
            description:
              'Discover new meals and custom orders at your favorite fast-casual dining spots. Select a chain and search for a meal type to get started.',
            images: [
              {
                url: 'https://www.example.ie/og-image-01.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt'
              },
              {
                url: 'https://www.example.ie/og-image-02.jpg',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second'
              }
            ],
            site_name: 'MealDig'
          }}
          twitter={{
            handle: '@mealdig',
            site: '',
            cardType: 'summary_large_image'
          }}
        />

        <UserContext.Provider
          value={{
            userName: userName,
            userEmail: email,
            userId: userId,
            accessLevel: accessLevel,
            isLoggedIn: isLoggedIn,
            nextAction: nextAction,
            signIn: this.signIn,
            signOut: this.signOut,
            switchNextAction: this.switchNextAction,
            feedBackPopUpSeen: false
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </>
    );
  }
}

export default App;
