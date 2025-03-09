import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    font-family: ${theme.typography.fontFamily.sans};
    font-size: ${theme.typography.fontSize.md};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.neutral[800]};
    background-color: ${theme.colors.neutral[50]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeight.tight};
    color: ${theme.colors.neutral[900]};
    margin-bottom: ${theme.spacing.lg};
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  p {
    margin-bottom: ${theme.spacing.lg};
  }

  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    transition: ${theme.transitions.ease};

    &:hover {
      color: ${theme.colors.primary.dark};
    }
  }

  button {
    font-family: ${theme.typography.fontFamily.sans};
    border: none;
    background: none;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  input, textarea, select {
    font-family: ${theme.typography.fontFamily.sans};
  }

  code, pre {
    font-family: ${theme.typography.fontFamily.mono};
  }

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.neutral[300]};
    border-radius: ${theme.radius.round};
    
    &:hover {
      background: ${theme.colors.neutral[400]};
    }
  }

  /* Remove default focus outline and add custom one */
  :focus {
    outline: none;
  }

  :focus-visible {
    outline: none;
    box-shadow: ${theme.shadows.glow};
  }

  /* Improve default selection colors */
  ::selection {
    background-color: ${theme.colors.primary.main}20;
    color: ${theme.colors.primary.dark};
  }
`;

export default GlobalStyle;