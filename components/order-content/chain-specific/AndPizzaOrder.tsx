import React, { Component } from 'react';

interface OrderState {
  dough: string;
  sauce: string;
  cheese: string;
  finishes: string;
  proteins: string;
  veggies: string;
}

interface Props {
  orderState: OrderState;
}
interface State {
  dough: string;
  sauces: string | any;
  cheeses: string | any;
  finishes: string | any;
  proteins: string | any;
  veggies: string | any;
}

export default class AndPizzaOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      dough: props.orderState.dough,
      sauces: JSON.parse(
        JSON.stringify(props.orderState.sauce, function (key, value) {
          return value == null ? [] : value;
        })
      ),
      cheeses: JSON.parse(
        JSON.stringify(props.orderState.cheese, function (key, value) {
          return value == null ? [] : value;
        })
      ),
      finishes: JSON.parse(
        JSON.stringify(props.orderState.finishes, function (key, value) {
          return value == null ? [] : value;
        })
      ),
      proteins: JSON.parse(
        JSON.stringify(props.orderState.proteins, function (key, value) {
          return value == null ? [] : value;
        })
      ),
      veggies: JSON.parse(
        JSON.stringify(props.orderState.veggies, function (key, value) {
          return value == null ? [] : value;
        })
      )
    };
  }

  componentDidMount() {
    const { sauces, cheeses, finishes, proteins, veggies } = this.state;
    this.setState({
      sauces: sauces.map((sauce: string, index: number) => <span key={`sauce-${index}`}>{sauce}</span>), // prettier-ignore
      cheeses: cheeses.map((cheese: string, index: number) => (<span key={`cheese-${index}`}>{cheese}</span>)), // prettier-ignore
      finishes: finishes.map((finish: string, index: number) => (<span key={`finish-${index}`}> {finish}</span>)), // prettier-ignore
      proteins: proteins.map((protein: string, index: number) => (<span key={`protein-${index}`}>{protein}</span>)), // prettier-ignore
      veggies: veggies.map((veg: string, index: number) => <span key={`veg-${index}`}>{veg}</span>) // prettier-ignore
    });
  }

  render() {
    const { dough, sauces, cheeses, finishes, proteins, veggies } = this.state;
    return (
      <>
        <p>
          Dough: <span>{dough}</span>
        </p>
        <p>Sauce: {sauces}</p>
        <p>Cheese: {cheeses}</p>
        <p>Finishes: {finishes}</p>
        <p>Proteins: {proteins}</p>
        <p>Veggies: {veggies}</p>
      </>
    );
  }
}
