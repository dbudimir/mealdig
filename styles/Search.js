import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const SearchRow = styled.div`
  display: flex;
  background-color: #1774ff;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center center;

  textarea,
  input.text,
  input[type='text'],
  input[type='button'],
  input[type='submit'],
  .input-checkbox {
    -webkit-appearance: none;
    border-radius: 0;
  }

  .search-container {
    display: flex;
    flex-direction: column;
    padding: 160px 0 200px;
    max-width: 768px;
    width: 96%;
    margin: 0 auto;

    .header-text {
      width: 100%;
      text-align: center;
      color: #ffffff;

      h1 {
        font-family: Nunito;
        font-size: 48px;
        font-weight: 800;
        margin: 0px;
      }

      h2 {
        margin: 16px auto 48px;
        font-family: Nunito;
        font-weight: 400;
        font-size: 18px;
        max-width: 620px;
        line-height: 1.5;
        letter-spacing: 0.75px;
      }
    }

    .search-box-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .search-action {
        height: 50px;
        background: #ffffff;
        flex-grow: 1;
        border: none;
        padding: 0;
        -webkit-appearance: none;
        border-radius: 3px;
      }

      .select-container {
        position: relative;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);

        svg {
          position: absolute;
          right: 0;
          height: 42%;
          margin: 0 12px;
          top: 50%;
          transform: translateY(-50%);
        }

        .chain-select {
          width: 260px;
          font-size: 22px;
          padding: 0 18px;
          font-family: Nunito, sans-serif;
          position: relative;
        }
      }

      .autocomplete-input {
        width: 100%;
        margin: 0px 12px;
        display: flex;
        flex-direction: column;
        position: relative;
        font-family: Nunito, sans-serif;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);

        .tag-input {
          padding: 0 18px;
          font-size: 22px;
        }

        .suggestions {
          list-style: none;
          margin-top: 0;
          overflow-y: auto;
          position: absolute;
          top: 60px;
          padding: 6px;
          background: #ffffff;
          border-radius: 3px;
          overflow: hidden;
          border: none;
          max-height: 300px;
          box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
          z-index: 1;
          width: 75%;

          li {
            padding: 10px 12px;
            font-size: 22px;
            line-height: 1.25;
          }

          .suggestion-active,
          li:hover {
            background-color: #5196e836;
            color: #000000;
            cursor: pointer;
            font-weight: 700;
            border-radius: 3px;
          }
        }
      }

      .search-submit {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);

        span {
          font-family: Nunito;
          font-size: 22px;
          padding: 0px 12px;
          font-weight: 700;
        }

        img {
          padding-right: 12px;
          max-height: 22px;
        }
      }
    }

    .no-suggestions {
      background-color: #ffffff;
      margin-top: 24px;
      padding: 24px;
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 20px;
      font-family: Nunito;

      .copy {
        width: 65%;

        h3 {
          margin: 0 0 18px 0;
          font-size: 24px;
        }

        span {
          margin: 0 0 24px 0;
          font-size: 18px;
        }
      }

      a {
        font-size: 18px;
        background: #0067ff;
        color: #ffffff;
        border-radius: 20px;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        width: fit-content;
        text-decoration: none;
        font-weight: 700;
        padding: 12px 18px;
        border-radius: 100px;
      }
    }
  }

  @media ${size.tablet} {
    display: flex;
    flex-direction: column;
    padding: 32px 0;

    .search-container {
      height: calc(50vh - 74px);
      padding: 0px;
      width: 78%;
      height: 600px;

      .header-text {
        h2 {
          font-size: 16px;
        }
      }

      .search-box-container {
        flex-direction: column;

        .search-action {
          margin-bottom: 12px;
        }

        .chain-select {
          width: 100% !important;
        }

        .autocomplete-input {
          margin: 0 auto !important;
        }
      }
    }
  }
`;

export default SearchRow;
