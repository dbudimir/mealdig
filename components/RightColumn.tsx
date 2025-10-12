// Utilities
import React, { Component } from 'react';
import Link from 'next/link';

interface Props {
  tag?: any;
  chainName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State {}

export default class RightColumn extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    const { tag, chainName } = this.props;

    const toTitleCase = function (str: any) {
      str = str.toLowerCase().split(' ');
      for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' ');
    };
    const tName = tag === undefined ? '' : tag.replace(/-/g, ' ');
    const cName = chainName === undefined ? '' : chainName.replace(/-/g, ' ');

    const capitalTagName = toTitleCase(tName);
    const chainNameLower = toTitleCase(cName);

    let tagCTA: any = '';
    if (tag === undefined) {
      tagCTA = '';
    } else {
      tagCTA = (
        <Link
          href={{
            pathname: `/tags/[tag]`,
          }}
          as={{ pathname: `/tags/${tag}` }}>
          <div className="more-tag-cta">
            <span>See more popular {capitalTagName} custom orders at other restaurants.</span>
          </div>
        </Link>
      );
    }

    return (
      <div className="col-right">
        {tagCTA}
        <Link
          href={{
            pathname: `/chains/[name]`,
          }}
          as={{ pathname: `/chains/${chainName}` }}>
          <div className="more-chain-cta">
            <span>See more popular custom meals at {chainNameLower}</span>
            <img src={`/static/chain-logos/square/${chainName}-square-logo.png`} alt={`${chainName} Square Logo`} />
          </div>
        </Link>
        <div className="signup-cta">
          <span className="cta-text">
            Create and share your favorite <br /> {capitalTagName} orders on MEALdig.
          </span>
          <Link
            href={{
              pathname: '/create-order',
            }}
            as={{ pathname: '/create-order' }}>
            <span className="create">Create Order</span>
          </Link>
          <Link
            href={{
              pathname: '/signup',
            }}
            as={{ pathname: '/signup' }}>
            <span className="signup">Sign Up</span>
          </Link>
        </div>
      </div>
    );
  }
}
