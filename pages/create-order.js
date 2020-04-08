import React, { Component } from 'react';
import styled from 'styled-components';

import Form from '../components/styles/CreateOrderForm';

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

class CreateOrder extends Component {
  constructor() {
    super();
    this.state = {
      chainName: '',
      order: {},
      user: {},
    };
  }

  updateChain = chain => {
    this.setState({
      chainName: chain,
    });
  };

  updateOrder = order => {
    this.setState({
      order,
    });
  };

  updateOrderDetails = orderDetails => {
    this.setState(prevState => ({
      ...prevState,
      order: { ...prevState.order, ...orderDetails },
    }));
  };

  updateUser = user => {
    this.setState(prevState => ({
      ...prevState,
      user: { ...prevState.user, ...user },
    }));
  };

  toggleSubmitConfirmation = () => {
    this.setState(prevState => ({
      ...prevState,
      orderSubmitted: !prevState.orderSubmitted,
    }));
  };

  render() {
    const { state } = this;

    let orderForm;
    if (state.chainName === CHAIN_CHIPOTLE) {
      orderForm = <CreateChipotleOrder setOrder={this.updateOrder} />;
    }
    if (state.chainName === CHAIN_ANDPIZZA) {
      orderForm = <CreateAndPizzOrder setOrder={this.updateOrder} />;
    }

    let submitOrder;
    if (state.chainName !== '') {
      submitOrder = (
        <SubmitOrder
          setOrderDetails={this.updateOrderDetails}
          toggleSubmitConfirmation={this.toggleSubmitConfirmation}
        />
      );
    }

    let submitConfirmation;
    if (state.orderSubmitted === true) {
      submitConfirmation = (
        <SubmitConfirmation
          orderState={this.state}
          toggleSubmitConfirmation={this.toggleSubmitConfirmation}
          updateUser={this.updateUser}
        />
      );
    }

    return (
      <div>
        <Layout />
        <Form>
          <FormHeader>Create Your Order</FormHeader>
          <SelectChainForm setChain={this.updateChain} />
          {orderForm}
          {submitOrder}
          {submitConfirmation}
        </Form>
      </div>
    );
  }
}

export default CreateOrder;
