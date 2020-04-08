// Utilities
import React, { Component } from 'react';
import axios from 'axios';

// Styles
import Form from '../../styles/Form';

// Components
import ErrorMessage from './ErrorMessage';

interface FormErrors {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  userName?: string;
  email?: string;
  password?: string;
  signIn: Function;
  setUser: Function;
  updateAction?: Function;
}

interface State {
  userId: string;
  userFullName: string;
  userName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm: string;
  formErrors: FormErrors;
  userNameValid: boolean;
  emailValid: any;
  passwordValid: boolean;
  confirmPasswordValid: boolean;
  allValid: boolean;
  isLoggedIn: boolean | null;
  [key: string]: any;
}

export default class SignupForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userId: '',
      userFullName: '',
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      formErrors: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      userNameValid: false,
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      allValid: false,
      isLoggedIn: null
    };
  }

  componentDidMount = () => {
    const { userName, email, password } = this.props;
    this.setState({
      userFullName: '',
      userName,
      email,
      password,
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

  onSubmit = async (e: any) => {
    e.preventDefault();

    const { signIn, setUser } = this.props;
    const { state } = this;

    axios
      .post(`${process.env.api_key}/api/users/signup`, {
        ...state
      })
      .then((response) => {
        this.setState({
          isLoggedIn: true,
          userId: response.data._id
        });
        signIn(response.data.userName, response.data.email, response.data._id, true);
        const user = {
          userFullName: response.data.userFullName,
          userName: response.data.userName,
          email: response.data.email,
          userId: response.data._id
        };
        setUser(user);
        console.log(window.location.pathname);
        //   if (window.location.pathname !== ('/login' || '/signup')) {
        //     this.props.updateAction('');
        //   }
      });
  };

  validateFields(fieldName: string, value: string) {
    let {
      formErrors,
      password,
      userNameValid,
      emailValid,
      passwordValid,
      confirmPasswordValid,
      passwordConfirm
    } = this.state;

    switch (fieldName) {
      case 'userName':
        userNameValid = value.length >= 1 && value.length <= 20;
        formErrors.userName = userNameValid ? '' : 'Enter a valid user name (20 characters max)';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Please use a valid email address.';
        break;
      case 'password':
        passwordValid = value.length >= 7;
        formErrors.password = passwordValid ? '' : 'Minimum seven characters.';
        break;
      case 'passwordConfirm':
        confirmPasswordValid = password === passwordConfirm;
        formErrors.confirmPassword = confirmPasswordValid ? '' : 'The passwords do not match.';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        userNameValid,
        emailValid,
        passwordValid,
        confirmPasswordValid
      },
      this.validateAll
    );
  }

  validateAll() {
    const { userNameValid, emailValid, passwordValid, confirmPasswordValid } = this.state;

    this.setState({
      allValid: emailValid && passwordValid && confirmPasswordValid && userNameValid
    });
  }

  render() {
    const { userFullName, userName, email, password, passwordConfirm, formErrors } = this.state;

    return (
      <Form className="form">
        <div className="signup-form">
          <h3>Sign Up</h3>
          <form>
            {/* Full name input */}
            <div className="form-input-label">
              <span>Name</span>
            </div>
            <input
              name="userFullName"
              onChange={this.updateState}
              value={userFullName || ''}
              type="text"
              placeholder="Enter your full name"
            />
            <ErrorMessage message={''} state={this.state} />
            {/* User name input */}
            <div className="form-input-label">
              <span>User Name</span>
            </div>
            <input
              name="userName"
              onChange={this.updateState}
              value={userName || ''}
              type="text"
              placeholder="Enter a username"
            />
            <ErrorMessage message={formErrors.userName} state={this.state} />
            {/* Email input */}
            <div className="form-input-label">
              <span>Email</span>
            </div>
            <input name="email" onChange={this.updateState} value={email || ''} type="text" placeholder="Email" />
            <ErrorMessage message={formErrors.email} state={this.state} />
            {/* Create password input */}
            <div className="form-input-label">
              <span>Create Password</span>
            </div>
            <input
              name="password"
              onChange={this.updateState}
              value={password || ''}
              type="password"
              placeholder="Password"
            />
            <ErrorMessage message={formErrors.password} state={this.state} />
            {/* Confirm password input */}
            <div className="form-input-label">
              <span>Confirm Password</span>
            </div>
            <input
              name="passwordConfirm"
              onChange={this.updateState}
              value={passwordConfirm || ''}
              type="password"
              placeholder="Re-enter password"
            />
            <ErrorMessage message={formErrors.confirmPassword} state={this.state} />
            {/* Submit button */}
            <input name="submit" onClick={this.onSubmit} type="submit" value="Sign Up" />
          </form>
        </div>
      </Form>
    );
  }
}
