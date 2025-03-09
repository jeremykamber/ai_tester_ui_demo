import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RiErrorWarningLine } from 'react-icons/ri';
import Button from '../components/common/Button';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NotFound = () => {
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <IconWrapper>
                <RiErrorWarningLine />
            </IconWrapper>
            <Title>Page Not Found</Title>
            <Description>
                The page you are looking for does not exist or has been moved.
            </Description>
            <StyledLink to="/">
                <Button>
                    Go to Dashboard
                </Button>
            </StyledLink>
        </Container>
    );
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: ${props => props.theme.colors.neutral[50]};
  padding: ${props => props.theme.spacing.xl};
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.error.main};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.neutral[600]};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export default NotFound;