// Utilities
import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorBar = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: hsl(0, 100%, 93%);
  color: hsl(0, 75%, 35%);
  font-family: Nunito;
  padding: 18px 12px;
  font-size: 16px;
  text-align: center;
  position: absolute;
`;

interface Props {
  message: string;
}
interface State {}

export default class ErrorMessageBar extends Component<Props, State> {
  render() {
    const { message } = this.props;
    return (
      <div>
        <ErrorBar>
          <span>{message}</span>
        </ErrorBar>
      </div>
    );
  }
}
