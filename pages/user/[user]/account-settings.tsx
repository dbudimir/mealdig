/* eslint-disable react/prop-types */

// Utilities
import React, { Component } from 'react';
import 'isomorphic-fetch';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

// Styles
import styled from 'styled-components';

// Components
import Layout from '../../../components/sitewide/Layout';

const AccountSettingsContainer = styled.div`
  max-width: 1024px;
  margin: 60px auto 48px;
  font-family: Roboto, sans-serif;

  h1 {
    font-size: 42px;
    font-weight: 800;
  }

  .item-container {
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .item-title {
      width: 100%;
      font-weight: 600;
      margin-bottom: 6px;
    }

    input {
      margin-right: 24px;
    }
  }

  .save-button {
    border: 1px solid #000000;
    padding: 12px 6px;
    text-align: center;
    cursor: pointer;
    width: 100%;
  }
`;

interface Props {
  data: any;
}

interface State {
  [key: string]: any;
}

export default class AccountSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...props.data[0] };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.saveUserSettings);
  }

  updateState = (e: any) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  saveUserSettings = (e: any) => {
    const reqBody = this.state;

    if (e.keyCode === 13 || e.type === 'click') {
      axios
        .post(`${process.env.api_key}/api/users/update-user`, {
          ...reqBody
        })
        .then((response) => console.log(response));
    }
  };

  render() {
    const user = this.state;
    const createdDate = new Date(user.createdAt);

    return (
      <>
        <NextSeo title={`Profile for ${user.userFullName}`} />
        <Layout />
        <AccountSettingsContainer>
          <h1>{`Profile for ${user.userFullName}`}</h1>
          {/* Update user full name */}

          <div className="item-container">
            <span className="item-title">Name:</span>
            <input name="userFullName" onChange={this.updateState} type="text" placeholder="Enter new name" />
            <div className="updated-value"> {user.userFullName}</div>
          </div>
          {/* Update username */}
          <div className="item-container">
            <span className="item-title">User Name:</span>
            <input name="userName" onChange={this.updateState} type="text" placeholder="Enter new username" />
            <div className="updated-value"> {user.userName}</div>
          </div>
          {/* Update user email */}
          <div className="item-container">
            <span className="item-title">Email</span>
            <input name="email" onChange={this.updateState} type="text" placeholder="Enter new email" />
            <div className="updated-value"> {user.email}</div>
          </div>
          {/* Update user access level */}
          <div className="item-container">
            <span className="item-title">Access Level</span>
            <input name="accessLevel" onChange={this.updateState} type="text" placeholder="Enter new access level" />
            <div className="updated-value"> {user.accessLevel}</div>
          </div>
          <div>User was created on {createdDate.toString()}</div>
          <Link
            href={{
              pathname: '/user/[user]',
              query: { userId: user.userName }
            }}
            as={{ pathname: `/user/${user.userName}` }}
          >
            <a href={`/user/${user.userName}`}>
              <div>See all {user.orders.length} orders</div>
            </a>
          </Link>

          <hr />
          <button type="button" className="save-button" onClick={this.saveUserSettings}>
            Save settings
          </button>
        </AccountSettingsContainer>
      </>
    );
  }
}

export async function getServerSideProps(context: any) {
  let data;
  if (context.query.user.length === 24) {
    const res = await fetch(`${process.env.api_key}/api/users/id/${context.query.user}`);
    data = await res.json();
  } else {
    const res = await fetch(`${process.env.api_key}/api/users/${context.query.user}`);
    data = await res.json();
  }

  return {
    //  props: { data }
    props: { data }
  };
}
