import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateAgent from './pages/CreateAgent';
import AgentDetail from './pages/AgentDetail';
import Reports from './pages/Reports';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateAgent />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
