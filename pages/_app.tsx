import * as React from 'react';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import UserContext from '../components/UserContext';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-KGFF5HN',
};

interface UserState {
  userName: string;
  email: string;
  userId: string;
  accessLevel: string;
  isLoggedIn: boolean;
  nextAction: () => void;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userState, setUserState] = useState<UserState>({
    userName: '',
    email: '',
    userId: '',
    accessLevel: '',
    isLoggedIn: false,
    nextAction: () => {},
  });

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);

    // Load user state from localStorage
    const userName = localStorage.getItem('username') || '';
    const email = localStorage.getItem('email') || '';
    const userId = localStorage.getItem('userId') || '';
    const accessLevel = localStorage.getItem('accessLevel') || '';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    setUserState({
      userName,
      email,
      userId,
      accessLevel,
      isLoggedIn,
      nextAction: () => {},
    });
  }, []);

  // Manages user sign in
  const signIn = (userName: string, email: string, userId: string, accessLevel: string, isLoggedIn: string) => {
    // Set user state on sign in
    setUserState((prev) => ({ ...prev, userName, email, userId, accessLevel, isLoggedIn: isLoggedIn === 'true' }));
    // Save user state to local storage
    localStorage.setItem('username', userName);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessLevel', accessLevel);
    localStorage.setItem('isLoggedIn', isLoggedIn);
    // Redirect to homepage if not creating an order
    if (window.location.pathname !== '/create-order') {
      router.push('/');
    }
  };

  // Manages user sign out
  const signOut = async () => {
    setUserState({
      userName: '',
      email: '',
      userId: '',
      accessLevel: '',
      isLoggedIn: false,
      nextAction: () => {},
    });
    localStorage.clear();
    router.push('/');
  };

  const switchNextAction = (nextAction: () => void) => {
    setUserState((prev) => ({ ...prev, nextAction }));
  };

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
              alt: 'Og Image Alt',
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
            },
          ],
          site_name: 'MealDig',
        }}
        twitter={{
          handle: '@mealdig',
          site: '',
          cardType: 'summary_large_image',
        }}
      />

      <UserContext.Provider
        value={{
          userName: userState.userName,
          userEmail: userState.email,
          userId: userState.userId,
          accessLevel: userState.accessLevel,
          isLoggedIn: userState.isLoggedIn,
          nextAction: userState.nextAction,
          signIn,
          signOut,
          switchNextAction,
          feedBackPopUpSeen: false,
        }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}
