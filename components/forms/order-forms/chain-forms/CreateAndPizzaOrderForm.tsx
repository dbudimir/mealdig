/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

export default class CreateAndPizzaOrderForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contentSchema: 'AndPizzaOrder',
      chainName: '&pizza'
    };
  }

  updateState = (e: any) => {
    const { setOrder } = this.props;
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });

    setOrder(this.state);
  };

  getSelected = () => {
    const { setOrder } = this.props;
    const selectedSauces = [].filter
      .call(document.getElementsByName('sauce'), (c: any) => c.checked)
      .map((c: any) => c.value);
    const selectedCheeses = [].filter
      .call(document.getElementsByName('cheese'), (c: any) => c.checked)
      .map((c: any) => c.value);
    const selectedVeggies = [].filter
      .call(document.getElementsByName('veggie'), (c: any) => c.checked)
      .map((c: any) => c.value);
    const selectedProteins = [].filter
      .call(document.getElementsByName('protein'), (c: any) => c.checked)
      .map((c: any) => c.value);
    const selectedFinishes = [].filter
      .call(document.getElementsByName('finish'), (c: any) => c.checked)
      .map((c: any) => c.value);
    this.setState({
      sauce: selectedSauces,
      cheese: selectedCheeses,
      veggies: selectedVeggies,
      proteins: selectedProteins,
      finishes: selectedFinishes
    });
    setOrder(this.state);
  };

  submitOrder = async () => {
    const { setOrder } = this.props;
    this.setState(prevState => ({
      ...prevState,
      submitOrder: true
    }));
    setOrder(this.state);
  };

  render() {
    const sauces = ['Classic Tomato', 'Spicy Tomato', 'Garlic Ricotta', 'Mushroom Truffle', 'Basil Pesto'] // prettier-ignore
    const saucesSpans = sauces.map((sauce, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={sauce} name="sauce" value={sauce} key={i} />
        <label className="checkbox-label" htmlFor={sauce}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{sauce}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const cheeses = ['Mozarella', 'Shredded Blend', 'Vegan Mozzarella'];
    const cheesesSpans = cheeses.map((cheese, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={cheese} name="cheese" value={cheese} key={i} />
        <label className="checkbox-label" htmlFor={cheese}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{cheese}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const veggies = [ 'Broccoli', 'Grilled Onion', 'Jalapeno', 'Tomato', 'Mushroom', 'Roasted Pepper', 'Spinach', 'Pineapple', 'Spicy Chickpea', ];

    const veggiesSpans = veggies.map((veggie, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={veggie} name="veggie" value={veggie} key={i} />
        <label className="checkbox-label" htmlFor={veggie}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{veggie}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const proteins = [ 'Pepperoni', 'Beef Meatball', 'Chicken', 'Italian Sausage', 'Scrambled Egg', 'Salami', 'Shrimp', 'Bacon', 'Vegan Sausage', ];

    const proteinsSpans = proteins.map((protein, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={protein} name="protein" value={protein} key={i} />
        <label className="checkbox-label" htmlFor={protein}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{protein}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const finishes = [ 'Arugula', 'Basil', 'Kalamata Olive', 'Black Pepper', 'Banana Pepper', 'Pickled Onion', 'Goat Cheese', 'Romaine', 'Parmesan', 'Fig Balsamic', 'Basil Pesto', 'BBQ Sauce', 'Caesar Dressing', 'Buffalo Sauce', 'Ranch', 'Olive Oil', 'Red Pepper Chili Oil', 'Garlic Oil', 'Crumbled Croutons', "Mike's Hot Honey", 'Red Pepper Chili Flakes', ];

    const finishesSpans = finishes.map((finish, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={finish} name="finish" value={finish} key={i} />
        <label className="checkbox-label" htmlFor={finish}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{finish}</span>
        </label>
      </span>
    ));

    return (
      <Form>
        <div className="customize">
          <form>
            <h3>Customize it...</h3>

            <div>
              <div>
                <span className="field-label">Dough</span>
                <div className="select-container">
                  <select onChange={this.updateState} className="text-input" name="dough">
                    <option value="" disabled selected>
                      Select Dough
                    </option>
                    <option value="Traditional">Traditional</option>
                    <option value="Gluten Free">Gluten Free</option>
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
            </div>

            <span className="field-label">Select Sauces</span>
            <div onChange={this.getSelected} className="sauces">
              {saucesSpans}
            </div>

            <span className="field-label">Select Cheeses</span>
            <div onChange={this.getSelected} className="cheeses">
              {cheesesSpans}
            </div>

            <span className="field-label">Select Veggies</span>
            <div onChange={this.getSelected} className="veggies">
              {veggiesSpans}
            </div>

            <span className="field-label">Select Proteins</span>
            <div onChange={this.getSelected} className="proteins">
              {proteinsSpans}
            </div>

            <span className="field-label">Select Finishes</span>
            <div onChange={this.getSelected} className="finishes">
              {finishesSpans}
            </div>
          </form>
          <br></br>
        </div>
      </Form>
    );
  }
}
