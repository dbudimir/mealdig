import React, { Component } from 'react';

interface OrderState {
  mealType: string;
  tortilla: string;
  cheese: string;
  beans: string;
  rice: string;
  fillings: string;
  toppings: string;
}

interface Props {
  orderState: OrderState;
}

interface State {
  mealType: string | any;
  tortilla: string | any;
  beans: string | any;
  rice: string | any;
  fillings: string | any;
  toppings: string | any;
}

export default class ChipotleOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      mealType: props.orderState.mealType,
      tortilla: props.orderState.tortilla,
      beans: props.orderState.beans,
      rice: props.orderState.rice,
      fillings: JSON.parse(
        JSON.stringify(props.orderState.fillings, function (key, value) {
          return value == null ? [] : value;
        })
      ),
      toppings: JSON.parse(
        JSON.stringify(props.orderState.toppings, function (key, value) {
          return value == null ? [] : value;
        })
      )
    };
  }

  componentDidMount() {
    const { fillings, toppings } = this.state;

    this.setState({
      fillings: fillings.map((filling: any, index: number) => <span key={`filling-${index}`}>{filling}</span>),
      toppings: toppings.map((topping: any, index: number) => <span key={`topping-${index}`}>{topping}</span>)
    });
  }

  render() {
    const order = this.state;
    return (
      <>
        <p>
          Meal Type: <span>{order.mealType}</span>
        </p>
        <p>
          Tortilla: <span>{order.tortilla}</span>
        </p>
        <p>
          Beans: <span>{order.beans}</span>
        </p>
        <p>
          Rice: <span>{order.rice}</span>
        </p>
        <p>Fillings: {order.fillings}</p>
        <p>Toppings: {order.toppings}</p>
      </>
    );
  }
}
