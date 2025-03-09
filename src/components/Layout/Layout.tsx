import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <Container>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
            <ContentWrapper
                $sidebarCollapsed={isSidebarCollapsed}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Header toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
                <MainContent>
                    {children}
                </MainContent>
            </ContentWrapper>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const ContentWrapper = styled(motion.div) <{ $sidebarCollapsed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: ${props => props.$sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)'};
  margin-left: ${props => props.$sidebarCollapsed ? '80px' : '280px'};
  transition: ${props => props.theme.transitions.ease};
  background-color: ${props => props.theme.colors.neutral[50]};
  overflow-y: auto;
  
  @media (max-width: 1024px) {
    width: 100%;
    margin-left: ${props => props.$sidebarCollapsed ? '0' : '280px'};
  }
`;

const MainContent = styled.main`
  padding: ${props => props.theme.spacing.xl};
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

export default Layout;