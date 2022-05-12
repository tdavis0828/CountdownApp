import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #ffffff;
        font-family: 'PT Sans Narrow', sans-serif;
    }

    html{
        height: 100vh;
        width: 100vw;
        overflow-x: hidden;
    }
`;

export default GlobalStyle;