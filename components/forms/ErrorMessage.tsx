import React, { Component } from 'react';
import styled from 'styled-components';

const Error = styled.div`
  color: red;
  margin-bottom: 12px;
  font-weight: 400;
  margin: -12px auto 12px;
  line-height: 1.25;
  font-size: 14px;
`;

interface Props {
  message: string;
  state: any;
}

interface State {}

export default class ErrorMessage extends Component<Props, State> {
  render() {
    const { message } = this.props;

    return (
      <Error className="error-message">
        <p>{message}</p>
      </Error>
    );
  }
}
