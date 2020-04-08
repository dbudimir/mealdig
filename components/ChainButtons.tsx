// Utilities
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import ChainLogo from './order-content/chain-specific/ChainLogo';

// Styles
const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)'
};

const ChainButtonContainer = styled.div`
  width: 96%;
  max-width: 1024px;
  margin: 60px auto 0;
  display: flex;
  justify-content: flex-start;

  @media ${size.phone} {
    display: none;
  }

  .chain-button {
    background: #ffffff;
    width: max-content;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    transition-timing-function: ease-in-out;
    transition-duration: 0.25s;

    &:hover {
      transform: scale(1.05);
    }

    .chain-logo {
      padding: 32px;
    }

    img {
      max-height: 30px;
      margin: 0 auto;
    }

    span {
      font-family: Nunito;
      font-weight: 600;
      font-size: 18px;
      padding: 32px;
    }
  }
`;

interface Props {
  chainNames: string[];
}

interface State {
  chainNames: string[];
}

// Container buttons for chains.
export default class ChainButtons extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    const { chainNames } = this.state;

    const buttons = chainNames.map((chainName) => (
      <div className="chain-button">
        <ChainLogo chainName={chainName} />
      </div>
    ));

    return (
      <ChainButtonContainer>
        {buttons}
        <div className="chain-button">
          <span>More coming soon...</span>
        </div>
      </ChainButtonContainer>
    );
  }
}
