// Utilities
import React, { Component } from 'react';
import axios from 'axios';

// Styles
import Form from '../../styles/Form';

// Components
import ErrorMessage from './ErrorMessage';

interface FormErrors {
  password: string;
  confirmPassword: string;
}

interface Props {
  password?: string;
  passwordConfirm?: string;
  formErrors?: FormErrors;
  passwordValid?: boolean;
  connfirmPasswordValid?: boolean;
  signIn: Function;
  setUser: Function;
  updateAction?: Function | any;
}

interface State {
  password: string | undefined;
  passwordConfirm: string;
  formErrors: FormErrors;
  passwordValid: boolean;
  confirmPasswordValid: boolean;
  [key: string]: any;
}

export default class ResetPassword extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      password: '',
      passwordConfirm: '',
      formErrors: {
        password: '',
        confirmPassword: ''
      },
      passwordValid: false,
      confirmPasswordValid: false
    };
  }

  componentDidMount = () => {
    const { password } = this.props;
    this.setState({
      password
    });
  };

  onSubmit = (e: any) => {
    const { signIn, setUser, updateAction } = this.props;
    const { password } = this.state;
    e.preventDefault();

    const url = window.location.href;
    const token = url.substring(url.indexOf('=') + 1);

    const newPassword = {
      password,
      token
    };

    axios.post(`${process.env.api_key}/api/email/confirm-token`, { newPassword }).then((response) => {
      signIn(response.data.userName, response.data.email, response.data.userId, true);
      const user = {
        userFullName: response.data.userFullName,
        userName: response.data.userName,
        email: response.data.email,
        userId: response.data.userId
      };
      setUser(user);
      if (window.location.pathname !== '/reset-password') {
        updateAction('');
      }
    });
  };

  confirmPasswordReset = (state: any) => {
    axios
      .post(`${process.env.api_key}/api/email/send-confirm`, {
        ...state
      })
      .then((response) => {
        console.log(response);
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

  validateFields(fieldName: string, value: string) {
    const { state } = this;
    const { formErrors } = this.state;
    let { passwordValid } = this.state;
    let { confirmPasswordValid } = this.state;

    switch (fieldName) {
      case 'password':
        passwordValid = value.length >= 7;
        formErrors.password = passwordValid ? '' : 'Minimum seven characters.';
        break;
      case 'passwordConfirm':
        confirmPasswordValid = state.password === state.passwordConfirm;
        formErrors.confirmPassword = confirmPasswordValid ? '' : 'The passwords do not match.';
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      passwordValid,
      confirmPasswordValid
    });
  }

  render() {
    const { password, formErrors, passwordConfirm } = this.state;
    return (
      <Form className="form">
        <div className="reset-password-form">
          <h3>Change Password</h3>
          <div className="new-password-info">
            <span>In order to protect your account, make sure your password:</span>
            <ul>
              <li>Is longer than 7 characters</li>
              <li>Does not match or contain your username, e.g. 'username123'</li>
            </ul>
          </div>
          <form>
            <div className="form-input-label">
              <span>Create a New Password</span>
            </div>
            <input
              name="password"
              onChange={this.updateState}
              value={password || ''}
              type="password"
              placeholder="Password"
            />
            <ErrorMessage message={formErrors.password} state={this.state} />
            <div className="form-input-label">
              <span>Re-enter Your New Password</span>
            </div>
            <input
              name="passwordConfirm"
              onChange={this.updateState}
              value={passwordConfirm || ''}
              type="password"
              placeholder="Re-enter password"
            />
            <ErrorMessage message={formErrors.confirmPassword} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Save Password" />
          </form>
        </div>
      </Form>
    );
  }
}
