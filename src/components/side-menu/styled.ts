import styled, { css } from 'styled-components';

const SideMenu = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 94px;
  height: calc(100% - 294px);
  width: 220px;
  padding: 20px 0;
  border-bottom: 1px solid #e6e6e6;
  z-index: 2;
`;

const Navigation = styled.nav`
  & > section:nth-of-type(n + 2) {
    margin-top: 10px;
  }

  & > section:nth-of-type(n + 2):before {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    margin-bottom: 10px;
    background: #e6e6e6;
  }

  & > section.alternative > ul > li > a {
    padding: 10px 20px;
  }

  & > section.alternative > ul > li > a > span {
    font-size: 100%;
    font-weight: 400;
  }
`;

const SideMenuItem = styled.li<{ selected: boolean }>`
  & > a {
    display: flex;
    align-items: center;
    padding: 12px 20px;
  }

  & > a > svg {
    margin-right: 10px;
    transform: scale(1.1);
    fill: #aaa;
  }

  & > a > span {
    font-size: 105%;
    font-weight: 500;
  }

  &:hover {
    background: #efefef;
    cursor: pointer;
  }

  ${({ selected }) =>
    selected &&
    css`
      background: #efefef;

      & > a > svg {
        fill: #0069a5;
      }
    `}
`;

export default { SideMenu, Navigation, SideMenuItem };
