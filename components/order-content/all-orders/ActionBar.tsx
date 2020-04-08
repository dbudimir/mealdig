/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

// Utilities
import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

interface Props {
  key: string;
  orderId: string;
  favoriteCount: number;
  usersFavorited: string[];
}

interface State {
  orderId: string;
  favoritesClass: string;
  favoriteCount: number;
  orderName: string;
  chainName: string;
  tags: string[];
  loggedInUserFavorite: boolean | null;
  isLoggedInUserFavorite: boolean | null;
}

export default class ActionBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      favoritesClass: 'favorites',
      favoriteCount: props.favoriteCount,
      loggedInUserFavorite: null,
      isLoggedInUserFavorite: null,
      orderName: '',
      chainName: '',
      tags: []
    };
  }

  componentDidMount() {
    const { usersFavorited, favoriteCount } = this.props;
    if (usersFavorited !== undefined && usersFavorited.includes(localStorage.userId)) {
      this.setState(
        {
          favoritesClass: 'favorites svg-clicked',
          favoriteCount,
          loggedInUserFavorite: true
        },
        () => {}
      );
    }
  }

  favoriteUnfavorite = (apiURL: string, updateCount: number, favoriteClass: string) => {
    const { loggedInUserFavorite, orderId } = this.state;

    this.setState(
      {
        favoritesClass: favoriteClass,
        loggedInUserFavorite: loggedInUserFavorite !== true,
        favoriteCount: updateCount
      },
      () => {}
    );

    const reqBody = { userId: localStorage.userId, orderId };

    axios
      .post(process.env.api_key + apiURL, { ...reqBody })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFavoriteClick = () => {
    const { loggedInUserFavorite, isLoggedInUserFavorite, favoriteCount } = this.state;

    if (localStorage.isLoggedIn === 'true') {
      if (loggedInUserFavorite === false || loggedInUserFavorite === null) {
        // Add favorite
        this.favoriteUnfavorite(`/api/orders/favorite`, favoriteCount + 1, 'favorites svg-clicked');
      } else if (isLoggedInUserFavorite !== false) {
        // Remove favorite
        this.favoriteUnfavorite(`/api/orders/unfavorite`, favoriteCount - 1, 'favorites');
      }
    } else {
      alert('Please create an account to favortie order.');
    }
  };

  openEmbedWindow = () => {
    const { orderId } = this.props;

    const remoteSource = '/static/chipotle-order-embed.js';
    const embedId = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);

    window.open(
      `/embed-window?remoteSource=${remoteSource}&embedId=${embedId}&orderId=${orderId}`,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=800'
    );
  };

  render() {
    const { orderId } = this.props;
    const { favoritesClass, favoriteCount, orderName, chainName, tags } = this.state;
    return (
      <div className="user-actions">
        <div title="Click to add to your favorites." className={favoritesClass} onClick={this.handleFavoriteClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#1774ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-star"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>

          <span className="like-count">{favoriteCount}</span>
        </div>
        <TwitterShareButton
          url={`https://mealdig.com/orders/${orderId}`}
          title={`Check out ${orderName} at ${chainName}. https://mealdig.com/orders/${orderId}`}
          hashtags={tags}
        >
          <TwitterIcon size={24} round />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://mealdig.com/orders/${orderId}`}
          quote={`Check out ${orderName} at ${chainName}. https://mealdig.com/orders/${orderId}`}
        >
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <div title="Click to embed this order on your site." onClick={this.openEmbedWindow}>
          <svg width="24" height="24" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Artboard-Copy-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="code">
                <circle id="Oval" fill="#262F40" cx="15" cy="15" r="14.5" />
                <g
                  id="Group"
                  transform="translate(6.000000, 9.000000)"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                >
                  <polyline id="Path" points="12 12 18 6 12 0" />
                  <polyline id="Path" points="6 0 0 6 6 12" />
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div title="Open link to this order.">
          <Link
            href={{
              pathname: '/orders/[id]',
              query: { id: orderId }
            }}
            as={{ pathname: `/orders/${orderId}` }}
          >
            <a href={`/orders/${orderId}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-external-link"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
