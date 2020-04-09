/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Utilities
import React, { useContext } from 'react';

import Router from 'next/router';
import axios from 'axios';
import styled from 'styled-components';

// Components
import UserContext from '../../UserContext';
import OrderContent from '../../order-content/OrderContent';
import SignupForm from '../SignupForm';
import LoginForm from '../LoginForm';

// Styles
const ModalOuter = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  font-family: Nunito, sans-serif;

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 840px;
    max-width: 94%;
    min-height: 460px;
    border-radius: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .user-options {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex-basis: 50%;

      h3 {
        margin: 0px;
      }

      p {
        font-size: 20px;
        line-height: 1.4;
        font-weight: 300;
        padding-right: 12px;
      }

      button {
        font-family: Nunito, sans-serif;
        font-size: 18px;
        padding: 8px 24px;
        border-radius: 4px;
        color: #ffffff;
        background: #42b5b4;
        border: none;
        margin: 0px 12px 12px 0px;
      }

      button:last-of-type {
        border: 2px solid #42b5b4;
        color: #808991;
        background: transparent;
      }

      .back-button {
        font-weight: 600;
        color: #0067ff;
        font-size: 18px;
      }

      .modal-form {
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: #ffffff;

        h3 {
          margin-bottom: 24px;
        }
        .signup-form {
          margin: 30px auto;
        }

        .login-form {
          margin: 30px auto;
        }

        .sign-up-now {
          display: none;
        }
      }
    }
    .order-content-container {
      margin-bottom: 0px;

      h3 {
        font-size: 18px;
      }
    }
  }
`;

interface Props {
  orderState: any;
  toggleSubmitConfirmation: Function;
  setUser: Function;
}

const SubmitConfirmation = (props: Props) => {
  const { orderState, toggleSubmitConfirmation, setUser } = props;
  const userStatus: any = useContext(UserContext);

  const updateModal = (action: any) => {
    userStatus.switchNextAction(action);
  };

  const submitOrder = (e: any) => {
    e.preventDefault();
    if (localStorage.length > 0) {
      const reqBody = { order: orderState.order, userId: localStorage.userId };
      axios.post(`${process.env.api_key}/api/user-order/create/existing-user`, { ...reqBody }).then(response => {
        Router.push(`/user/${localStorage.username}`);
      });
    } else if (localStorage.length === 0) {
      const reqBody = { order: orderState.order };
      axios
        .post(`${process.env.api_key}/api/user-order/create/order`, {
          ...reqBody
        })
        .then(response => {
          Router.push(
            {
              pathname: `/orders/${response.data._id}`,
              query: { id: response.data._id }
            },
            `/orders/${response.data._id}`
          );
        });
    }
  };

  let userLoggedIn;
  if (localStorage.length === 0) {
    userLoggedIn = (
      <div>
        <p>
          Create an account so you can save this order to your profile. Or submit anonymously to get a shareable link.
        </p>
        <button onClick={() => updateModal('signup')} type="button">
          Create Account
        </button>
        <button onClick={() => updateModal('login')} type="button">
          Log In
        </button>
        <button onClick={submitOrder} type="button">
          Submit Anonymously
        </button>
      </div>
    );
  } else if (localStorage.length > 0) {
    userLoggedIn = (
      <div>
        <p>You're logged in! Review your order before submitting.</p>
        <br />
        <button onClick={submitOrder} type="button">
          Submit Order
        </button>
        <br />
      </div>
    );
  }

  let nextAction;
  switch (userStatus.nextAction) {
    case '':
      nextAction = '';
      break;
    case 'signup':
      nextAction = (
        <div className="modal-form">
          <SignupForm signIn={userStatus.signIn} setUser={setUser} updateAction={updateModal} />
          <span className="back-button" onClick={() => updateModal('')}>
            {'<< Close Signup'}
          </span>
        </div>
      );
      break;
    case 'login':
      nextAction = (
        <div className="modal-form">
          <LoginForm signIn={userStatus.signIn} setUser={setUser} updateAction={updateModal} />
          <span className="back-button" onClick={() => updateModal('')}>
            {'<< Close Login'}
          </span>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <ModalOuter>
      <div className="modal-content">
        <div className="user-options">
          <h3>Nice!</h3>
          {userLoggedIn}
          {nextAction}
          <span
            className="back-button"
            onClick={() => {
              toggleSubmitConfirmation();
            }}
          >
            {'<< Go Back'}
          </span>
        </div>
        <OrderContent orderState={orderState} />
      </div>
    </ModalOuter>
  );
};

export default SubmitConfirmation;
