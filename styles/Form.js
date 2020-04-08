import styled from 'styled-components';

const Form = styled.div`
  max-width: 340px;
  width: 92%;
  margin: 120px auto;

  .login-form,
  .signup-form,
  .forgot-password-form,
  .reset-password-form {
    font-family: Nunito, sans-serif;
    background: #ffffff;
    padding: 24px;
    border-radius: 8px;
    border: 2px solid;
    border-color: #e6e5e5;

    h3 {
      margin: 0 0 24px 0;
      font-size: 28px;
    }

    ul {
      padding-inline-start: 24px;
      font-size: 16px;

      li {
        margin-bottom: 12px;
      }
    }

    .form-input-label {
      margin: 20px 0 4px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      .forgot-password {
        font-size: 14px;
        text-decoration: underline;
        color: #0067ff;

        &:hover {
          cursor: pointer;
        }
      }
    }

    input {
      width: 100%;
      height: 36px;
      font-size: 16px;
      padding: 0px 0px 0px 10px;
      background-color: #f8f8f8;
      border-radius: 4px;
      box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 4px 0;
      box-sizing: border-box;
      border: 1px solid #00000030;
      font-family: Nunito, sans-serif;
      margin-bottom: 6px;
    }

    input[name='submit'] {
      border-radius: 6px;
      border-bottom: 0px;
      font-size: 18px;
      font-weight: 600;
      background-color: #0067ff;
      width: fit-content;
      padding: 6px 18px;
      height: auto;
      color: #ffffff;
      margin-top: 12px;
    }

    .sign-up-now {
      display: block;
      margin-top: 32px;

      a {
        font-weight: 800;
        text-decoration: none;
        color: #0067ff;
      }
    }
  }
`;

export default Form;
