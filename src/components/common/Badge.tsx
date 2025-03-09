import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'small' | 'medium' | 'large';
    rounded?: boolean;
    dot?: boolean;
    icon?: ReactNode;
    className?: string;
}

const Badge = ({
    children,
    variant = 'default',
    size = 'medium',
    rounded = false,
    dot = false,
    icon,
    className
}: BadgeProps) => {
    return (
        <BadgeContainer
            variant={variant}
            size={size}
            rounded={rounded}
            className={className}
        >
            {dot && <StatusDot variant={variant} />}
            {icon && <BadgeIcon>{icon}</BadgeIcon>}
            <BadgeText>{children}</BadgeText>
        </BadgeContainer>
    );
};

const getBadgeStyles = (variant: string, theme: any) => {
    switch (variant) {
        case 'primary':
            return css`
        background-color: ${theme.colors.primary.light}20;
        color: ${theme.colors.primary.dark};
        border: 1px solid ${theme.colors.primary.light}30;
      `;
        case 'secondary':
            return css`
        background-color: ${theme.colors.secondary.light}20;
        color: ${theme.colors.secondary.dark};
        border: 1px solid ${theme.colors.secondary.light}30;
      `;
        case 'success':
            return css`
        background-color: ${theme.colors.success.light}20;
        color: ${theme.colors.success.dark};
        border: 1px solid ${theme.colors.success.light}30;
      `;
        case 'warning':
            return css`
        background-color: ${theme.colors.warning.light}20;
        color: ${theme.colors.warning.dark};
        border: 1px solid ${theme.colors.warning.light}30;
      `;
        case 'error':
            return css`
        background-color: ${theme.colors.error.light}20;
        color: ${theme.colors.error.dark};
        border: 1px solid ${theme.colors.error.light}30;
      `;
        default:
            return css`
        background-color: ${theme.colors.neutral[200]};
        color: ${theme.colors.neutral[800]};
        border: 1px solid ${theme.colors.neutral[300]};
      `;
    }
};

const getBadgeSize = (size: string, theme: any) => {
    switch (size) {
        case 'small':
            return css`
        font-size: ${theme.typography.fontSize.xs};
        height: 20px;
        padding: 0 ${theme.spacing.xs};
      `;
        case 'large':
            return css`
        font-size: ${theme.typography.fontSize.sm};
        height: 28px;
        padding: 0 ${theme.spacing.md};
      `;
        default:
            return css`
        font-size: ${theme.typography.fontSize.xs};
        height: 24px;
        padding: 0 ${theme.spacing.sm};
      `;
    }
};

const BadgeContainer = styled.span<{
    variant: string;
    size: string;
    rounded: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.rounded ? '999px' : props.theme.radius.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  white-space: nowrap;
  
  ${props => getBadgeStyles(props.variant, props.theme)}
  ${props => getBadgeSize(props.size, props.theme)}
`;

const BadgeText = styled.span``;

const BadgeIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${props => props.theme.spacing.xs};
  font-size: 1.1em;
`;

const StatusDot = styled.span<{ variant: string }>`
  width: 6px;
  height: 6px;
  margin-right: ${props => props.theme.spacing.xs};
  border-radius: 50%;
  
  ${props => {
        switch (props.variant) {
            case 'primary':
                return css`background-color: ${props.theme.colors.primary.main};`;
            case 'secondary':
                return css`background-color: ${props.theme.colors.secondary.main};`;
            case 'success':
                return css`background-color: ${props.theme.colors.success.main};`;
            case 'warning':
                return css`background-color: ${props.theme.colors.warning.main};`;
            case 'error':
                return css`background-color: ${props.theme.colors.error.main};`;
            default:
                return css`background-color: ${props.theme.colors.neutral[600]};`;
        }
    }}
`;

export default Badge;