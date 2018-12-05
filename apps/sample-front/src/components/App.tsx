import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Global from 'src/modules/global';
import { RouteResolver } from './RouteResolver';

const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
      box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {  
    background-color: #f5f5f5;
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
  }
`;

export const App = () => {
  return (
    <>
      <Global />
      <RouteResolver />
      <GlobalStyle />
    </>
  );
};
