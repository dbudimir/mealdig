// Utilites
import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';

//Styles
import styled from 'styled-components';
import Form from '../../styles/Form';

// Components
import ErrorMessage from './ErrorMessage';

const ErrorBar = styled.div`
  width: 100%;
  background-color: hsl(0, 100%, 93%);
  color: hsl(0, 75%, 35%);
  font-family: Nunito;
  padding: 18px 12px;
  font-size: 16px;
  text-align: center;
`;

interface Props {
  email?: string;
}
interface State {
  email: string | undefined;
  formErrors: any;
  emailValid: any;
  allValid: boolean;
  existingUser: boolean;
  isLoggedIn: string | boolean;
  [key: string]: any;
}

export default class ForgotPassword extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      email: '',
      formErrors: {
        email: ''
      },
      emailValid: false,
      allValid: false,
      existingUser: true,
      isLoggedIn: ''
    };
  }

  componentDidMount = () => {
    const { email } = this.props;

    this.setState({
      email,
      isLoggedIn: false
    });
  };

  updateState = (e: any) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateFields(name, value);
      }
    );
  };

  validateFields = (fieldName: string, value: string) => {
    let { formErrors, emailValid } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Please use a valid email address.';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        emailValid
      },
      this.validateAll
    );
  };

  validateAll = () => {
    const { emailValid } = this.state;
    this.setState({
      allValid: emailValid
    });
  };

  sendRecoveryEmail = (state: any) => {
    axios
      .post(`${process.env.api_key}/api/email/send`, {
        ...state
      })
      .then((response) => {
        console.log(response);
      });
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    const { state } = this;

    axios.post(`${process.env.api_key}/api/email/`, { ...state }).then((response) => {
      if (!response.data.message) {
        response.data.location = process.env.api_key;

        this.sendRecoveryEmail(response);
      } else {
        this.setState({
          existingUser: false
        });
      }
    });
  };

  render() {
    const { existingUser, email, formErrors } = this.state;

    let errorBar;
    switch (existingUser) {
      case true:
        errorBar = '';
        break;
      case false:
        errorBar = (
          <ErrorBar>
            <span>Sorry! There is no MealDig user with that email address. </span>
          </ErrorBar>
        );
        break;
      default:
        break;
    }
    return (
      <>
        {errorBar}
        <Form className="form">
          <div className="forgot-password-form">
            <h3>Recover Password</h3>
            <div className="form-input-label">
              <span>Email</span>
            </div>
            <input
              name="email"
              onChange={this.updateState}
              value={email || ''}
              type="text"
              placeholder="Enter your email"
            />
            <ErrorMessage message={formErrors.email} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Get Recovery Link" />
            <span className="sign-up-now">
              Don't have an account?
              <Link href="/signup">
                <a> Sign up now.</a>
              </Link>
            </span>
          </div>
        </Form>
      </>
    );
  }
}
