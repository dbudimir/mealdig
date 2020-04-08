// Utilities
import React, { Component } from 'react';

// Components
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';

interface Props {
  signIn: Function;
  setUser: Function;
}

interface State {
  userForgotPassword: boolean;
}

export default class LoginFormContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      userForgotPassword: false
    };
  }

  forgotPassword = () => {
    this.setState({
      userForgotPassword: true
    });
  };

  render() {
    const { signIn, setUser } = this.props;
    const { userForgotPassword } = this.state;

    if (userForgotPassword === true) {
      return <ForgotPassword />;
    }
    return <LoginForm resetPassword={this.forgotPassword} signIn={signIn} setUser={setUser} />;
  }
}
