// Utilities
import React, { Component } from 'react';
import styled from 'styled-components';

// Styles
import Form from '../styles/CreateOrderForm';

// Components
import Layout from '../components/sitewide/Layout';
import CreateChipotleOrder from '../components/forms/order-forms/chain-forms/CreateChipotleOrder';
import CreateAndPizzOrder from '../components/forms/order-forms/chain-forms/CreateAndPizzaOrderForm';
import SelectChainForm from '../components/forms/order-forms/SelectChainForm';
import SubmitOrder from '../components/forms/order-forms/SubmitOrderForm';
import SubmitConfirmation from '../components/forms/order-forms/SubmitConfirmation';

const CHAIN_CHIPOTLE = 'Chipotle';
const CHAIN_ANDPIZZA = '&pizza';

const FormHeader = styled.h2`
  font-size: 48px;
  font-family: Nunito, serif;
  margin: 0 0 32px;
`;

interface Props {}

interface State {
  chainName: string;
  order: any;
  user: any;
  orderDetails: any;
  orderSubmitted: boolean | string;
}

export default class CreateOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chainName: '',
      order: {},
      user: {},
      orderDetails: {},
      orderSubmitted: ''
    };
  }

  setChain = (chain: string) => {
    this.setState({
      chainName: chain
    });
  };

  setOrder = (order: any) => {
    this.setState({
      order
    });
  };

  setOrderDetails = (orderDetails: any) => {
    this.setState(prevState => ({
      ...prevState,
      order: { ...prevState.order, ...orderDetails }
    }));
  };

  setUser = (user: any) => {
    this.setState(prevState => ({
      ...prevState,
      user: { ...prevState.user, ...user }
    }));
  };

  toggleSubmitConfirmation = () => {
    this.setState(prevState => ({
      ...prevState,
      orderSubmitted: !prevState.orderSubmitted
    }));
  };

  render() {
    const { state } = this;

    let orderForm;
    if (state.chainName === CHAIN_CHIPOTLE) {
      orderForm = <CreateChipotleOrder setOrder={this.setOrder} />;
    }
    if (state.chainName === CHAIN_ANDPIZZA) {
      orderForm = <CreateAndPizzOrder setOrder={this.setOrder} />;
    }

    let submitOrder;
    if (state.chainName !== '') {
      submitOrder = (
        <SubmitOrder setOrderDetails={this.setOrderDetails} toggleSubmitConfirmation={this.toggleSubmitConfirmation} />
      );
    }

    let submitConfirmation;
    if (state.orderSubmitted === true) {
      submitConfirmation = (
        <SubmitConfirmation
          orderState={this.state}
          toggleSubmitConfirmation={this.toggleSubmitConfirmation}
          setUser={this.setUser}
        />
      );
    }

    return (
      <div>
        <Layout />
        <Form>
          <FormHeader>Create Your Order</FormHeader>
          <SelectChainForm setChain={this.setChain} />
          {orderForm}
          {submitOrder}
          {submitConfirmation}
        </Form>
      </div>
    );
  }
}
