import React, { Component } from 'react';
import Link from 'next/link';

interface Props {
  onClick?: Function;
  chainName: string;
}

interface State {}

export default class ChainLogo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { chainName } = this.props;
    let chainLogo;
    if (chainName === 'Chipotle') {
      chainLogo = <img className="chain-logo" src="../../static/chain-logos/chipotle-logo.png" alt="Chipotle Logo" />;
    } else if (chainName === '&pizza') {
      chainLogo = <img className="chain-logo" src="../../static/chain-logos/and-pizza-logo.png" alt="&pizza Logo" />;
    }

    const lowerCaseChainName = chainName === undefined ? '' : chainName.toLowerCase();

    return (
      <>
        <Link
          href={{
            pathname: '/chains/[name]',
            query: { lowerCaseChainName }
          }}
          as={{ pathname: `/chains/${lowerCaseChainName}` }}
        >
          <a href={`/chains/${lowerCaseChainName}`}>{chainLogo}</a>
        </Link>
      </>
    );
  }
}
