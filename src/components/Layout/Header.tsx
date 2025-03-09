import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RiSearchLine,
    RiMenuLine,
    RiNotification3Line,
    RiUser3Line,
    RiSettings4Line,
    RiLogoutBoxRLine,
    RiArrowDownSLine
} from 'react-icons/ri';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    return (
        <HeaderContainer>
            <HeaderLeft>
                <MobileMenuButton onClick={toggleSidebar}>
                    <RiMenuLine />
                </MobileMenuButton>

                <SearchContainer $focused={searchFocused}>
                    <SearchIcon>
                        <RiSearchLine />
                    </SearchIcon>
                    <SearchInput
                        placeholder="Search agents, tests, reports..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                </SearchContainer>
            </HeaderLeft>

            <HeaderRight>
                <IconButton>
                    <RiNotification3Line />
                    <NotificationBadge>3</NotificationBadge>
                </IconButton>

                <ProfileButton
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    $active={showProfileMenu}
                >
                    <ProfileAvatar>
                        <ProfileAvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=6366F1&color=fff" />
                    </ProfileAvatar>
                    <ProfileInfo>
                        <ProfileName>John Doe</ProfileName>
                        <ProfileRole>Admin</ProfileRole>
                    </ProfileInfo>
                    <ProfileArrow $open={showProfileMenu}>
                        <RiArrowDownSLine />
                    </ProfileArrow>
                </ProfileButton>

                <AnimatePresence>
                    {showProfileMenu && (
                        <ProfileMenu
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ProfileMenuItem>
                                <RiUser3Line />
                                Profile Settings
                            </ProfileMenuItem>
                            <ProfileMenuItem>
                                <RiSettings4Line />
                                App Settings
                            </ProfileMenuItem>
                            <ProfileMenuDivider />
                            <ProfileMenuItem $danger>
                                <RiLogoutBoxRLine />
                                Sign Out
                            </ProfileMenuItem>
                        </ProfileMenu>
                    )}
                </AnimatePresence>
            </HeaderRight>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
  height: 72px;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndices.dropdown};
  
  @media (max-width: 768px) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const MobileMenuButton = styled.button`
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radius.md};
  color: ${props => props.theme.colors.neutral[600]};
  font-size: 1.25rem;
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral[100]};
    color: ${props => props.theme.colors.primary.main};
  }
  
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const SearchContainer = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  width: 320px;
  height: 40px;
  padding: 0 ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.lg};
  background-color: ${props => props.theme.colors.neutral[100]};
  transition: ${props => props.theme.transitions.ease};
  
  ${props => props.$focused && `
    background-color: white;
    box-shadow: ${props.theme.shadows.md};
  `}
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  color: ${props => props.theme.colors.neutral[400]};
  margin-right: ${props => props.theme.spacing.sm};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  color: ${props => props.theme.colors.neutral[900]};
  font-size: ${props => props.theme.typography.fontSize.md};
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral[400]};
  }
  
  &:focus {
    outline: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  position: relative;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radius.md};
  color: ${props => props.theme.colors.neutral[600]};
  font-size: 1.25rem;
  position: relative;
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral[100]};
    color: ${props => props.theme.colors.primary.main};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: ${props => props.theme.radius.round};
  background-color: ${props => props.theme.colors.primary.main};
  color: white;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled.div`
  text-align: left;
`;

const ProfileButton = styled.button<{ $active: boolean }>`
  height: 40px;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: 0 ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.radius.lg};
  transition: ${props => props.theme.transitions.ease};
  
  ${props => props.$active && `
    background-color: ${props.theme.colors.neutral[100]};
  `}
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral[100]};
  }
  
  @media (max-width: 768px) {
    padding: 0;
    
    ${ProfileInfo} {
      display: none;
    }
  }
`;

const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.radius.round};
  overflow: hidden;
`;

const ProfileAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[900]};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ProfileRole = styled.div`
  color: ${props => props.theme.colors.neutral[500]};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const ProfileArrow = styled.span<{ $open: boolean }>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.neutral[400]};
  transition: ${props => props.theme.transitions.ease};
  transform: rotate(${props => props.$open ? '180deg' : '0deg'});
`;

const ProfileMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + ${props => props.theme.spacing.sm});
  right: 0;
  width: 220px;
  background: white;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  z-index: ${props => props.theme.zIndices.dropdown};
`;

const ProfileMenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  color: ${props => props.$danger ? props.theme.colors.error.main : props.theme.colors.neutral[700]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral[50]};
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

const ProfileMenuDivider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.neutral[200]};
  margin: ${props => props.theme.spacing.xs} 0;
`;

export default Header;