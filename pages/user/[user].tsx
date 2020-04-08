/* eslint-disable react/prop-types */

// Utilites
import React, { Component } from 'react';
import 'isomorphic-fetch';
import { NextSeo } from 'next-seo';

// Styles
import styled from 'styled-components';

// Componnents
import Layout from '../../components/sitewide/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const H1 = styled.h1`
  max-width: 1024px;
  margin: 60px auto 48px;
  padding: 0px 12px;
  font-family: Roboto, sans-serif;
  font-size: 42px;
  font-weight: 800;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1024px;
  margin: 60px auto;

  .order-content-container {
    flex-basis: 100%;
  }
`;

interface Props {
  orders: any;
  fullName: string;
  userId: string;
}

interface State {
  orders: any;
  orderId: string;
  fullName: string;
}

export default class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      orders: {},
      orderId: '',
      fullName: ''
    };
  }

  render() {
    const { orders, fullName } = this.props;
    const orderCard = orders.map((order: any, index: number) => <OrderContent orderID={order._id} key={index} />);

    return (
      <>
        <NextSeo title={`Custom orders created by ${fullName}`} />
        <Layout />
        <H1>{`Custom orders created by ${fullName}`}</H1>
        <OrderContainer className="order-content-container">{orderCard}</OrderContainer>
      </>
    );
  }
}

export async function getServerSideProps(context: any) {
  const res = await fetch(`${process.env.api_key}/api/users/${context.query.user}`);
  const data = await res.json();

  return {
    props: {
      orders: data[0].orders,
      fullName: data[0].userFullName,
      userId: context.query.user
    }
  };
}
