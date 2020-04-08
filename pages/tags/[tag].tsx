/* eslint-disable react/prop-types */

// Utilites
import React, { Component } from 'react';
import 'isomorphic-fetch';
import { NextSeo } from 'next-seo';

// Styles
import styled from 'styled-components';
import TagPage from '../../styles/TagPage';

// Components
import Layout from '../../components/sitewide/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  h3 {
    text-transform: capitalize;
  }
`;

interface Props {
  orders: any;
  tag: string;
}

interface State {
  orders: any;
  _id: string;
  tag: string;
}

export default class Tag extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      orders: props.orders,
      _id: '',
      tag: props.tag
    };
  }

  render() {
    console.log(this.state);
    const { orders, _id, tag } = this.state;
    const orderCard = orders.map((order: any, index: number) => <OrderContent orderID={order._id} key={index} />);

    return (
      <div>
        <NextSeo
          title={`The Best ${tag.charAt(0).toUpperCase() + tag.slice(1)} Custom Meal Orders`}
          description={`Check out the most popular ${tag} custom meal orders at fast-casual restaurants. Or, submit your own custom order and share it with your friends.`}
        />
        <Layout />
        <TagPage className="tag-order-container">
          <h1>The most popular {tag} custom orders.</h1>
          <OrderContainer>{orderCard}</OrderContainer>
        </TagPage>
      </div>
    );
  }
}

export async function getServerSideProps(context: any) {
  const res = await fetch(`${process.env.api_key}/api/orders/tag/${context.query.tag}`);
  const data = await res.json();

  return {
    props: {
      orders: data,
      tag: context.query.tag
    }
  };
}
