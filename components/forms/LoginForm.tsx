/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Utilities
import React, { Component } from 'react';
import axios from 'axios';

// Styles
import Form from '../../styles/Form';

// Components
import ErrorMessageBar from './ErrorMessageBar';
import ErrorMessage from './ErrorMessage';

interface Props {
  email?: string;
  password?: string;
  signIn: Function;
  updateUser: Function;
  updateAction?: Function | any;
  resetPassword: Function;
}

interface State {
  email: string | undefined;
  password: string | undefined;
  formErrors: any;
  emailValid: any;
  passwordValid: boolean;
  credentialValidation: any;
  [key: string]: any;
}

export default class LoginForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: ''
      },
      emailValid: false,
      passwordValid: false,
      credentialValidation: {
        emailMatch: true,
        passwordMatch: true
      }
    };
  }

  componentDidMount = () => {
    const { email, password } = this.props;

    this.setState({
      email,
      password
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
    let { formErrors, emailValid, passwordValid } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Please use a valid email address.';
        break;
      case 'password':
        passwordValid = value.length >= 7;
        formErrors.password = passwordValid ? '' : 'Minimum seven characters.';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        emailValid,
        passwordValid
      },
      this.validateAll
    );
  };

  validateAll = () => {
    this.setState({
      allValid: this.state.emailValid && this.state.passwordValid
    });
  };

  forgotPassword = () => {
    const { resetPassword } = this.props;
    resetPassword();
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    const { signIn, updateUser, updateAction } = this.props;
    const { email, password } = this.state;
    const creds = { email, password };

    axios
      .post(`${process.env.api_key}/api/users/login`, {
        ...creds
      })
      .then((response) => {
        if (response.data.passwordMatch === false) {
          this.setState({
            credentialValidation: {
              passwordMatch: false
            }
          });
        } else if (response.data.emailMatch === false) {
          this.setState({
            credentialValidation: {
              emailMatch: false
            }
          });
        } else {
          signIn(response.data.userName, response.data.email, response.data.userId, response.data.accessLevel, true);
          const user = {
            userFullName: response.data.userFullName,
            userName: response.data.userName,
            email: response.data.email,
            userId: response.data.userId
          };
          updateUser(user);
          if (window.location.pathname !== ('/login' || '/signup')) {
            updateAction('');
          }
        }
      });
  };

  render() {
    const { credentialValidation, email, formErrors, password } = this.state;

    let errorBar;
    if (credentialValidation.emailMatch === false) {
      errorBar = <ErrorMessageBar message="Sorry! There is no MealDig user with that email address." />;
    } else if (credentialValidation.passwordMatch === false) {
      errorBar = <ErrorMessageBar message="The email and password combination is incorrect." />;
    }

    return (
      <>
        {errorBar}
        <Form className="form">
          <div className="login-form">
            <h3>Log In</h3>
            <div className="form-input-label">
              <span>Email</span>
            </div>
            <input name="email" onChange={this.updateState} value={email || ''} type="text" placeholder="Enter your email" />
            <ErrorMessage message={formErrors.email} state={this.state} />
            <div className="form-input-label">
              <span>Password</span>
              <span className="forgot-password" onClick={this.forgotPassword}>
                Forgot Password?
              </span>
            </div>

            <input name="password" onChange={this.updateState} value={password || ''} type="password" placeholder="Enter your password" />
            <ErrorMessage message={formErrors.password} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Log In" />
            <span className="sign-up-now">
              Don't have an account?
              <a href="/signup"> Sign up now.</a>
            </span>
          </div>
        </Form>
      </>
    );
  }
}
