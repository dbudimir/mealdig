// Utilities
import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Styles
const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)'
};

const BreadCrumbsContainer = styled.div`
  background-color: #9883e5;
  position: sticky;
  top: 54px;
  z-index: 10;

  .breadcrumbs-list {
    width: 96%;
    max-width: 1024px;
    margin: 0 auto;
    @media ${size.tablet} {
      font-size: 14px;
    }

    a,
    span,
    div {
      display: inline-block;
      font-family: Nunito;
      color: #ffffff;
      text-transform: capitalize;
      text-decoration: none;
      margin: 6px 12px 6px 0;
    }
    a {
      font-weight: 700;
      margin: 6px 12px 6px 0;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

interface Props {
  allOrders: any;
  tag?: string;
  pageType: string;
}

interface State {
  pageType: string;
  allOrders: any;
  tag: string | undefined;
}

export default class BreadCrumbs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      pageType: props.pageType,
      allOrders: props.allOrders,
      tag: props.tag
    };
  }

  render() {
    const { pageType, allOrders, tag } = this.state;

    let chainCrumb: any = '';
    if (pageType === 'chain') {
      chainCrumb = (
        <>
          <span>{allOrders.name} </span>
        </>
      );
    } else {
      chainCrumb = (
        <>
          <Link
            href={{ pathname: '/chains/[name]', query: { chainName: allOrders.name } }}
            as={{ pathname: `/chains/${allOrders.name}` }}
          >
            <a href={`/chains/${allOrders.name}`}>{allOrders.name} </a>
          </Link>
          <span>→</span>
        </>
      );
    }

    let tagCrumb: any = '';
    if (tag !== undefined) {
      tagCrumb = <span>{tag} Custom Meals</span>;
    } else {
      tagCrumb = '';
    }

    return (
      <BreadCrumbsContainer className="breadcrumbs-container">
        <div className="breadcrumbs-list">
          <Link href={{ pathname: '/' }} as={{ pathname: `/` }}>
            <>
              <a href="/">Home</a>
              <span>→</span>
            </>
          </Link>
          {chainCrumb}
          {tagCrumb}
        </div>
      </BreadCrumbsContainer>
    );
  }
}
