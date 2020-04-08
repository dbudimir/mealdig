// Utilities
import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Components
import ChainRow from './ChainRow';

// Styles
const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  max-width: 94%;
  margin: 40px auto;

  .chain-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    border-bottom: 4px solid #0067ff;
  }

  a {
    color: #0067ff;
    text-decoration: none;
    font-family: Nunito;

    h2 {
      font-size: 36px;
      font-weight: 800;
      margin: 12px 0;
    }
  }

  .chain-row {
    display: flex;
    overflow: auto;
    padding-left: 4px;

    .modal-container {
      .order-content-container {
        margin: 0 24px 12px 0;
        height: 540px;
      }
    }
  }
`;

const SortOrder = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 4px 0;
  font-family: Nunito;
  font-size: 16px;

  span {
    border: none;
    font-weight: 700;
    margin-right: 6px;
  }

  .sort-select {
    display: flex;
    align-items: center;
    background: #eeeef1;
    padding: 2px 8px;
    border-radius: 5px;

    &:hover {
      background: #dfe2e4;
      cursor: pointer;
    }

    select {
      -webkit-appearance: none;
      border: none;
      background: transparent;
      font-family: Nunito;
      font-size: 16px;
      cursor: pointer;
    }

    svg {
      width: 16px;
      margin-left: 4px;
    }
  }
`;

// Container for ALL the chain rows appearing on the home page.
interface Props {
  chain: any;
  index: number;
}

interface State {
  sortOrder: string;
}

export default class Chains extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sortOrder: 'popular'
    };
  }

  sortOrders = (e: any) => {
    this.setState({
      sortOrder: e.target.value
    });
  };

  render() {
    const { chain } = this.props;
    const { sortOrder } = this.state;
    const { chainName } = chain[0];
    const lowerCaseChainName = chainName === undefined ? '' : chainName.toLowerCase();

    return (
      <ChainContainer>
        <div className="chain-header">
          <Link
            href={{
              pathname: '/chains/[name]',
              query: { lowerCaseChainName }
            }}
            as={{ pathname: `/chains/${lowerCaseChainName}` }}
          >
            <a href={`/chains/${lowerCaseChainName}`}>
              <h2 className="chain-name">{chainName}</h2>
            </a>
          </Link>
          <SortOrder>
            <span>Sort by:</span>
            <div className="sort-select">
              <select onChange={(e) => this.sortOrders(e)} name="sort-orders" ref="order-select">
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-down"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />s
              </svg>
            </div>
          </SortOrder>
        </div>
        <ChainRow chainRow={chain} sortOrder={sortOrder} />
      </ChainContainer>
    );
  }
}
