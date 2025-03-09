import { ReactNode, ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isLoading?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    leftIcon,
    rightIcon,
    isLoading = false,
    ...props
}: ButtonProps) => {
    return (
        <ButtonContainer
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <LoadingSpinner size={size} />}
            <ButtonContent isLoading={isLoading}>
                {leftIcon && <ButtonIcon>{leftIcon}</ButtonIcon>}
                {children}
                {rightIcon && <ButtonIcon>{rightIcon}</ButtonIcon>}
            </ButtonContent>
        </ButtonContainer>
    );
};

const getButtonStyles = (variant: string, theme: any) => {
    switch (variant) {
        case 'primary':
            return css`
        background: ${theme.gradients.primary};
        color: ${theme.colors.primary.contrast};
        border: none;
        
        &:hover:not(:disabled) {
          box-shadow: ${theme.shadows.md}, 0 0 0 4px ${theme.colors.primary.light}50;
        }
        
        &:active:not(:disabled) {
          background: ${theme.colors.primary.dark};
        }
      `;
        case 'secondary':
            return css`
        background: ${theme.gradients.secondary};
        color: ${theme.colors.secondary.contrast};
        border: none;
        
        &:hover:not(:disabled) {
          box-shadow: ${theme.shadows.md}, 0 0 0 4px ${theme.colors.secondary.light}50;
        }
        
        &:active:not(:disabled) {
          background: ${theme.colors.secondary.dark};
        }
      `;
        case 'accent':
            return css`
        background: ${theme.gradients.accent};
        color: ${theme.colors.accent.contrast};
        border: none;
        
        &:hover:not(:disabled) {
          box-shadow: ${theme.shadows.md}, 0 0 0 4px ${theme.colors.accent.light}50;
        }
        
        &:active:not(:disabled) {
          background: ${theme.colors.accent.dark};
        }
      `;
        case 'outline':
            return css`
        background: transparent;
        color: ${theme.colors.primary.main};
        border: 2px solid ${theme.colors.primary.main};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primary.main}10;
        }
        
        &:active:not(:disabled) {
          background: ${theme.colors.primary.main}20;
        }
      `;
        case 'ghost':
            return css`
        background: transparent;
        color: ${theme.colors.neutral[700]};
        border: none;
        
        &:hover:not(:disabled) {
          background: ${theme.colors.neutral[200]};
        }
        
        &:active:not(:disabled) {
          background: ${theme.colors.neutral[300]};
        }
      `;
        default:
            return css``;
    }
};

const getButtonSize = (size: string, theme: any) => {
    switch (size) {
        case 'small':
            return css`
        font-size: ${theme.typography.fontSize.xs};
        height: 32px;
        padding: 0 ${theme.spacing.md};
      `;
        case 'medium':
            return css`
        font-size: ${theme.typography.fontSize.sm};
        height: 40px;
        padding: 0 ${theme.spacing.lg};
      `;
        case 'large':
            return css`
        font-size: ${theme.typography.fontSize.md};
        height: 48px;
        padding: 0 ${theme.spacing.xl};
      `;
        default:
            return css``;
    }
};

const ButtonContainer = styled.button<{
    variant: string;
    size: string;
    fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.ease};
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  ${props => getButtonStyles(props.variant, props.theme)}
  ${props => getButtonSize(props.size, props.theme)}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadows.sm}, 0 0 0 2px ${props => props.theme.colors.primary.light}30;
  }
`;

const ButtonContent = styled.span<{ isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  opacity: ${props => props.isLoading ? 0 : 1};
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

const getSpinnerSize = (size: string) => {
    switch (size) {
        case 'small': return '14px';
        case 'large': return '22px';
        default: return '18px';
    }
};

const LoadingSpinner = styled.span<{ size: string }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${props => getSpinnerSize(props.size)};
  height: ${props => getSpinnerSize(props.size)};
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export default Button;