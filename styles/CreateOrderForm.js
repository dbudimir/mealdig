import styled from 'styled-components';

const Form = styled.div`
  max-width: 600px;
  display: block;
  margin: 60px auto 240px;

  h2 {
    margin-top: 60px;
  }

  .order-name {
    margin-top: 24px;
  }

  h3 {
    font-family: Nunito, serif;
    min-width: fit-content;
    margin: 32px 0px 12px 0;
    font-size: 24px;
  }

  select {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: Nunito, serif;
  }

  .field-label {
    font-family: Nunito, serif;
    font-weight: 500;
    font-size: 20px;
    margin: 24px 0 12px;
  }

  .select-container {
    width: 100%;
    position: relative;

    svg {
      position: absolute;
      right: 0;
      height: 42%;
      margin: 0 12px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .select-chain {
    margin: 0px 12px;

    h3 {
      width: 100%;
    }

    select[name='chainName'] {
      width: 100%;
      height: 48px;
      font-size: 24px;
      padding: 8px 12px;
      border: 2px solid #0067ff;
      border-radius: 6px;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  .customize {
    padding: 0px 12px;

    select {
      width: 100%;
      height: 48px;
      font-size: 24px;
      padding: 8px 12px;
      border: 2px solid #0067ff;
      border-radius: 6px;
    }

    .fillings,
    .toppings,
    .sauces,
    .cheeses,
    .veggies,
    .proteins,
    .finishes {
      display: flex;
      flex-wrap: wrap;

      .checkbox-container {
        display: block;
        margin-right: 6px;
        font-size: 20px;
        border-radius: 4px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkbox-label {
          font-size: 20px;
          line-height: 24px;
          width: fit-content;
          cursor: pointer;
          font-family: Nunito;
          font-weight: 400;
          display: flex;
          align-items: center;
          border-radius: 6px;
          background-color: #f8f8f8;
        }

        .checkbox-label .checkbox-text {
          margin-right: 6px;
        }

        .checkbox-custom {
          height: 16px;
          width: 16px;
          background-color: transparent;
          border-radius: 5px;
          transition: all 0.3s ease-out;
          -webkit-transition: all 0.3s ease-out;
          -moz-transition: all 0.3s ease-out;
          -ms-transition: all 0.3s ease-out;
          -o-transition: all 0.3s ease-out;
          border: 2px solid #0067ff;
          margin: 6px;
        }

        input:checked + label {
          background-color: #0067ff;
          border-radius: 5px;
          color: #ffffff;
          font-weight: 500;
        }

        input:checked + label .checkbox-custom {
          background-color: #ffffff;
          border-radius: 5px;
          -webkit-transform: rotate(0deg) scale(1);
          -ms-transform: rotate(0deg) scale(1);
          transform: rotate(0deg) scale(1);
          opacity: 1;
          border: 2px solid #ffffff;
        }

        .checkbox-custom::after {
          position: absolute;
          content: '';
          left: 12px;
          top: 0px;
          height: 0px;
          width: 0px;
          border-radius: 5px;
          border: 2px solid #0067ff;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(0deg) scale(0);
          -ms-transform: rotate(0deg) scale(0);
          transform: rotate(0deg) scale(0);
          opacity: 1;
          transition: all 0.3s ease-out;
          -webkit-transition: all 0.3s ease-out;
          -moz-transition: all 0.3s ease-out;
          -ms-transition: all 0.3s ease-out;
          -o-transition: all 0.3s ease-out;
        }

        input:checked + label .checkbox-custom::after {
          -webkit-transform: rotate(45deg) scale(1);
          -ms-transform: rotate(45deg) scale(1);
          transform: rotate(45deg) scale(1);
          opacity: 1;
          left: 4px;
          width: 6px;
          height: 12px;
          border: 2px solid #0067ff;
          border-width: 0 2px 2px 0;
          background-color: transparent;
          border-radius: 0;
        }
      }
    }
  }

  .submit-order {
    padding: 0px 12px;

    input[name='orderName'] {
      width: 100%;
      height: 48px;
      font-size: 22px;
      border: 0px;
      padding: 0px 0px 0px 12px;
      background-color: #f8f8f8;
      border-radius: 4px;
      box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 4px 0;
      box-sizing: border-box;
      font-family: Nunito;
    }

    textarea {
      width: 100%;
      font-size: 16px;
      border: 0px;
      padding: 12px 0px 0px 12px;
      background-color: #f8f8f8;
      border-radius: 4px;
      box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 4px 0;
      box-sizing: border-box;
    }

    button[name='submit'] {
      width: 60%;
      display: block;
      margin: 0 auto;
      height: 48px;
      margin-top: 48px;
      border-radius: 100px;
      color: #ffffff;
      font-size: 24px;
      background-color: #0067ff;
      border: 0px;
      cursor: pointer;
    }
  }
`;

export default Form;
