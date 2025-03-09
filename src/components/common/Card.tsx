import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'accent';
    hover?: boolean;
    footer?: ReactNode;
    className?: string;
}

const Card = ({
    title,
    subtitle,
    children,
    variant = 'default',
    hover = false,
    footer,
    className
}: CardProps) => {
    return (
        <CardContainer variant={variant} hover={hover} className={className}>
            {(title || subtitle) && (
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
                </CardHeader>
            )}
            <CardContent>
                {children}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </CardContainer>
    );
};

const getCardStyle = (variant: string, theme: any) => {
    switch (variant) {
        case 'primary':
            return css`
        border-top: 3px solid ${theme.colors.primary.main};
        background: linear-gradient(to bottom right, ${theme.colors.primary.light}10, ${theme.colors.neutral[50]});
      `;
        case 'secondary':
            return css`
        border-top: 3px solid ${theme.colors.secondary.main};
        background: linear-gradient(to bottom right, ${theme.colors.secondary.light}10, ${theme.colors.neutral[50]});
      `;
        case 'accent':
            return css`
        border-top: 3px solid ${theme.colors.accent.main};
        background: linear-gradient(to bottom right, ${theme.colors.accent.light}10, ${theme.colors.neutral[50]});
      `;
        default:
            return css`
        border: 1px solid ${theme.colors.neutral[200]};
        background-color: #fff;
      `;
    }
};

const CardContainer = styled.div<{ variant: string; hover: boolean }>`
  border-radius: ${props => props.theme.radius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  ${props => getCardStyle(props.variant, props.theme)};
  transition: ${props => props.theme.transitions.ease};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  ${props => props.hover && css`
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${props.theme.shadows.lg};
    }
  `}
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.neutral[100]};
`;

const CardTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.neutral[900]};
`;

const CardSubtitle = styled.p`
  color: ${props => props.theme.colors.neutral[600]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: 0;
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
  flex: 1;
`;

const CardFooter = styled.div`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.neutral[100]};
  background-color: ${props => props.theme.colors.neutral[50]};
`;

export default Card;