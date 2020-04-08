import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const NavBar = styled.div`
  background: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  max-width: 100%;
  padding: 12px 12px;
  font-family: Nunito, serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);

  a {
    text-decoration: none;
    color: #000000;
  }

  .nav-left {
    h1 {
      color: #000000;
      text-decoration: none;
      text-transform: capitalize;
      font-size: 36px;
      font-weight: 800;
      margin: 0 24px 0 0;
    }

    .left-nav-icon,
    .right-nav-icon {
      display: none;
    }
  }

  .menu-container {
    overflow-x: scroll;
    overflow-y: hidden;

    .menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 550px;
      font-weight: 700;

      span {
        font-size: 18px;
        cursor: pointer;
      }

      .create {
        font-size: 18px;
        background: #0067ff;
        color: #ffffff;
        border-radius: 20px;
        padding: 8px 16px;
        display: flex;
        align-items: center;

        img {
          margin-left: 6px;
        }
      }
    }
  }

  @media ${size.tablet} {
    flex-direction: column;

    .nav-left {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        margin: 0px;
      }

      .left-nav-icon,
      .right-nav-icon {
        display: block;
        width: 40px;
        max-height: 40px;

        img {
          width: 100%;
        }
      }

      h1 {
        text-align: center;
      }
    }

    .menu-container {
      display: none;
      margin-top: 12px;

      .menu {
        display: flex;
        flex-direction: column;
        width: 100%;

        a {
          padding: 12px 0px;
        }

        span {
          font-size: 22px;
        }
      }
    }
  }
`;

export default NavBar;
