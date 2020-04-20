import React, { createRef, Component } from 'react';
import styled from 'styled-components';

const ChipotleOrderContainer = styled.div`
  .list-item {
    display: block;
  }

  .list-item.hide {
    display: none;
  }
`;

interface OrderState {
  mealType: string;
  tortilla: string;
  cheese: string;
  beans: string;
  rice: string;
  fillings: string[] | any;
  toppings: string[];
}

interface Props {
  orderState: OrderState;
}

interface State {}

export default class ChipotleOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    const { mealType, tortilla, beans, rice, fillings, toppings } = this.props.orderState;
    let fillingsBool: boolean = fillings !== undefined && fillings.length > 0;
    let toppingsBool: boolean = toppings !== undefined && toppings.length > 0;

    return (
      <ChipotleOrderContainer>
        {/*  */}
        <p className={mealType === undefined ? 'list-item hide' : 'list-item'}>
          Meal Type: <span>{mealType}</span>
        </p>
        {/*  */}
        <p className={tortilla === undefined ? 'list-item hide' : 'list-item'}>
          Tortilla: <span>{tortilla}</span>
        </p>
        {/*  */}
        <p className={beans === undefined ? 'list-item hide' : 'list-item'}>
          Beans: <span>{beans}</span>
        </p>
        {/*  */}
        <p className={rice === undefined ? 'list-item hide' : 'list-item'}>
          Rice: <span>{rice}</span>
        </p>
        {/*  */}
        <p className={fillingsBool ? 'list-item' : 'list-item hide'}>
          Fillings:{' '}
          {fillings === undefined
            ? ''
            : fillings.map((filling: any, index: number) => <span key={`filling-${index}`}>{filling}</span>)}
        </p>
        {/*  */}
        <p className={toppingsBool ? 'list-item' : 'list-item hide'}>
          Toppings:{' '}
          {toppings === undefined
            ? ''
            : toppings.map((topping: any, index: number) => <span key={`topping-${index}`}>{topping}</span>)}
        </p>
      </ChipotleOrderContainer>
    );
  }
}
