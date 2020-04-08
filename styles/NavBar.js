import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const NavBar = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  max-width: 100%;
  padding: 8px 12px;
  font-family: Nunito, serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);

  .logo {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 12px;
    }
  }

  .mobile-menu-icon {
    display: none;
    max-height: 36px;
  }

  .menu {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #000000;
    max-height: 38px;
  }

  .icon-logo {
    height: 38px;
  }

  .search {
    width: 100%;
    display: block;
  }

  .log-in,
  .sign-up,
  .create-order {
    width: max-content;
    display: block;
    font-weight: 700;
    padding: 6px 18px;
    margin-left: 12px;
  }

  .sign-up,
  .create-order {
    background-color: #ffffff;
    border: 1px solid #1774ff;
    border-radius: 6px;
  }

  .create-order {
    color: #ffffff;
    background-color: #1774ff;

    &:hover {
      opacity: 0.8;
    }
  }

  .user-dropdown {
    position: relative;
    padding: 6px 18px;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;

    .username {
      display: flex;
      align-items: center;
      font-weight: 700;

      &:after {
        content: '';
        width: 0;
        height: 0;
        margin-left: 12px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #878a8c;
        clear: both;
      }
    }

    .open-dropdown {
      display: block;
      position: absolute;
      background: #ffffff;
      margin-top: 10px;
      border-radius: 6px;
      padding: 12px;
      width: 120px;
      left: 0;
      border: 1px solid #eeeef1;
      box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

      .my-stuff,
      .tools {
        display: flex;
        flex-direction: column;

        h4 {
          margin-top: 0px;
          cursor: auto;
        }

        .title {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 6px;
        }

        a {
          padding: 6px 8px;
          border-radius: 4px;
          padding: 6px 8px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            background-color: #eeeef1;
            cursor: pointer;
          }
        }
      }
    }

    &:hover {
      border: 1px solid #878a8c;
    }
  }

  @media ${size.tablet} {
    .mobile-menu-icon {
      display: block;
      cursor: pointer;
    }

    .menu {
      display: none;
    }

    .menu.open-logged-out {
      display: flex;
      position: absolute;
      background: #ffffff;
      width: max-content;
      top: 66px;
      right: 12px;
      padding: 8px 12px;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      border-radius: 12px;
      box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

      a {
        margin-bottom: 10px;
      }
    }

    .menu.open-logged-in {
      display: flex;
      position: absolute;
      background: #ffffff;
      width: calc(100vw - 50px);
      top: 94px;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 8px 12px;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      border-radius: 12px;
      box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
  }
`;

export default NavBar;
