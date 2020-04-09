/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.div`
  .label {
    margin-top: 12px;
    font-weight: 800;
  }
  span {
    display: block;
  }
`;

interface Props {
  setOrder: Function;
}
interface State {
  contentSchema: string;
  chainName: string;
  [key: string]: any;
}

export default class CreateChipotleOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contentSchema: 'ChipotleOrder',
      chainName: 'Chipotle',
      mealType: ''
    };
  }

  updateState = (e: any) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState(
      {
        [name]: value
      },
      () => {
        const { setOrder } = this.props;
        setOrder(this.state);
      }
    );
  };

  getSelected = () => {
    const selectedFillings = [].filter
      .call(document.getElementsByName('filling'), (c: any) => c.checked)
      .map((c: any) => c.value);
    const selectedToppings = [].filter
      .call(document.getElementsByName('topping'), (c: any) => c.checked)
      .map((c: any) => c.value);
    this.setState(
      {
        fillings: selectedFillings,
        toppings: selectedToppings
      },
      () => {
        const { setOrder } = this.props;
        setOrder(this.state);
      }
    );
  };

  submitOrder = () => {
    this.setState(
      prevState => ({
        ...prevState,
        submitOrder: true
      }),
      () => {
        const { setOrder } = this.props;
        setOrder(this.state);
      }
    );
  };

  render() {
    const { mealType } = this.state;

    let tortilla: any = '';
    if (mealType === 'Tacos') {
      tortilla = (
        <div>
          <span className="field-label">Select a Tortilla</span>
          <div className="select-container">
            <select onChange={this.updateState} className="text-input" name="tortilla">
              <option value="" disabled selected>
                Tortilla
              </option>
              <option value="Soft Flour Toritilla">Soft Flour Toritilla</option>
              <option value="Crispy Corn Tortilla">Crispy Corn Tortilla</option>
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
        </div>
      );
    }

    const fillings = ['Chicken', 'Steak', 'Barbaco', 'Carnitas', 'Sofritas', 'Veggies'];
    const fillingsSpans = fillings.map((filling, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={filling} name="filling" value={filling} key={i} />
        <label className="checkbox-label" htmlFor={filling}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{filling}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const toppings = [ 'Cheese', 'Queso', 'Fresh Tomato Salsa (Mild)', 'Roasted Chili-Corn Salsa (Medium)', 'Tomatillo-Green Chili Salsa (Medium Hot)', 'Tomatillo-Red Chili Salsa (Hot)', 'Sour Cream', 'Fajita Veggies', 'Romaine Lettuce', 'Chipotle-Honey Vinaigrette', 'Guacamole' ];
    const toppingsSpans = toppings.map((topping, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={topping} name="topping" value={topping} key={i} />
        <label className="checkbox-label" htmlFor={topping}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{topping}</span>
        </label>
      </span>
    ));

    return (
      <Form>
        <div className="customize">
          <h3>Customize your order...</h3>
          <form>
            <span className="field-label">Select a Meal Type</span>
            <div className="select-container">
              <select onChange={this.updateState} className="text-input" name="mealType">
                <option value="" disabled selected>
                  Meal Type
                </option>
                <option value="Burrito">Burrito</option>
                <option value="Burrito Bowl">Burrito Bowl</option>
                <option value="Tacos">Tacos</option>
                <option value="Salad">Salad</option>
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            {tortilla}

            <span className="field-label">Select Protiens (No more than two)</span>
            <div onChange={this.getSelected} className="fillings">
              {fillingsSpans}
            </div>

            <span className="field-label">Select Rice </span>
            <div className="select-container">
              <select onChange={this.updateState} className="text-input" name="rice">
                <option value="" disabled selected>
                  Select rice
                </option>
                <option value="White Rice">White Rice</option>
                <option value="Brown Rice">Brown Rice</option>
                <option value="Both (half/half)">Both (half/half)</option>
                <option value="No Rice">No Rice</option>
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <span className="field-label">Select Beans</span>
            <div className="select-container">
              <select onChange={this.updateState} className="text-input" name="beans">
                <option value="" disabled selected>
                  Select beans
                </option>
                <option value="Black Beans">Black Beans</option>
                <option value="Pinto Beans">Pinto Beans</option>
                <option value="Both (half/half)">Both (half/half)</option>
                <option value="No Beans">No Beans</option>
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <span className="field-label">Add Toppings</span>
            <div onChange={this.getSelected} className="toppings">
              {toppingsSpans}
            </div>
          </form>
          <br></br>
        </div>
      </Form>
    );
  }
}
