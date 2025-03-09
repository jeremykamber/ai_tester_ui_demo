import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    RiDashboardLine, RiRobot2Line, RiUserLine,
    RiFileListLine, RiSettings4Line, RiMenuFoldLine,
    RiMenuUnfoldLine, RiNotification3Line, RiArrowRightSLine
} from 'react-icons/ri';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
    const location = useLocation();
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const mainMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <RiDashboardLine />,
            path: '/'
        },
        {
            id: 'agents',
            label: 'AI Agents',
            icon: <RiRobot2Line />,
            submenu: [
                { id: 'active', label: 'Active Agents', path: '/agents/active' },
                { id: 'create', label: 'Create Agent', path: '/create' },
                { id: 'templates', label: 'Templates', path: '/agents/templates' }
            ]
        },
        {
            id: 'personas',
            label: 'Personas',
            icon: <RiUserLine />,
            path: '/personas'
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: <RiFileListLine />,
            path: '/reports'
        }
    ];

    const bottomMenuItems = [
        {
            id: 'notifications',
            label: 'Notifications',
            icon: <RiNotification3Line />,
            path: '/notifications',
            badge: 3
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: <RiSettings4Line />,
            path: '/settings'
        }
    ];

    const handleSubMenuToggle = (menuId: string) => {
        setActiveSubMenu(activeSubMenu === menuId ? null : menuId);
    };

    const isPathActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <SidebarContainer $isCollapsed={isCollapsed}>
            <LogoSection>
                <Logo>
                    <RiRobot2Line />
                    {!isCollapsed && <LogoText>AI Tester</LogoText>}
                </Logo>
                <CollapseButton onClick={onToggle}>
                    {isCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                </CollapseButton>
            </LogoSection>

            <MenuSection>
                {mainMenuItems.map(item => (
                    <div key={item.id}>
                        {item.submenu ? (
                            <>
                                <MenuItem
                                    $isActive={isPathActive(item.path || '')}
                                    $isCollapsed={isCollapsed}
                                    onClick={() => handleSubMenuToggle(item.id)}
                                >
                                    <MenuIcon>{item.icon}</MenuIcon>
                                    {!isCollapsed && (
                                        <>
                                            <MenuLabel>{item.label}</MenuLabel>
                                            <MenuArrow $isOpen={activeSubMenu === item.id}>
                                                <RiArrowRightSLine />
                                            </MenuArrow>
                                        </>
                                    )}
                                </MenuItem>
                                {!isCollapsed && activeSubMenu === item.id && (
                                    <SubMenu>
                                        {item.submenu.map(subItem => (
                                            <SubMenuItem
                                                key={subItem.id}
                                                as={Link}
                                                to={subItem.path}
                                                $isActive={isPathActive(subItem.path)}
                                            >
                                                <SubMenuDot $isActive={isPathActive(subItem.path)} />
                                                {subItem.label}
                                            </SubMenuItem>
                                        ))}
                                    </SubMenu>
                                )}
                            </>
                        ) : (
                            <MenuItem
                                as={Link}
                                to={item.path || ''}
                                $isActive={isPathActive(item.path || '')}
                                $isCollapsed={isCollapsed}
                            >
                                <MenuIcon>{item.icon}</MenuIcon>
                                {!isCollapsed && <MenuLabel>{item.label}</MenuLabel>}
                            </MenuItem>
                        )}
                    </div>
                ))}
            </MenuSection>

            <BottomSection>
                {bottomMenuItems.map(item => (
                    <MenuItem
                        key={item.id}
                        as={Link}
                        to={item.path}
                        $isActive={isPathActive(item.path)}
                        $isCollapsed={isCollapsed}
                    >
                        <MenuIcon>
                            {item.icon}
                            {item.badge && (
                                <MenuBadge>
                                    {item.badge}
                                </MenuBadge>
                            )}
                        </MenuIcon>
                        {!isCollapsed && <MenuLabel>{item.label}</MenuLabel>}
                    </MenuItem>
                ))}

                <UserSection>
                    <UserAvatar>
                        <UserAvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=6366F1&color=fff" />
                    </UserAvatar>
                    {!isCollapsed && (
                        <UserInfo>
                            <UserName>John Doe</UserName>
                            <UserRole>Admin</UserRole>
                        </UserInfo>
                    )}
                </UserSection>
            </BottomSection>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.aside<{ $isCollapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.$isCollapsed ? '80px' : '280px'};
  background: white;
  border-right: 1px solid ${props => props.theme.colors.neutral[200]};
  display: flex;
  flex-direction: column;
  transition: ${props => props.theme.transitions.ease};
  z-index: ${props => props.theme.zIndices.modal};
  
  @media (max-width: 1024px) {
    transform: translateX(${props => props.$isCollapsed ? '-100%' : '0'});
  }
`;

const LogoSection = styled.div`
  height: 72px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary.main};
  font-size: 1.5rem;
`;

const LogoText = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: ${props => props.theme.typography.fontSize.lg};
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CollapseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radius.md};
  color: ${props => props.theme.colors.neutral[600]};
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral[100]};
    color: ${props => props.theme.colors.primary.main};
  }
`;

const MenuSection = styled.nav`
  flex: 1;
  padding: ${props => props.theme.spacing.md} 0;
  overflow-y: auto;
`;

const MenuItem = styled(motion.div) <{ $isActive?: boolean; $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  color: ${props => props.$isActive ? props.theme.colors.primary.main : props.theme.colors.neutral[600]};
  background-color: ${props => props.$isActive ? props.theme.colors.primary.main + '10' : 'transparent'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.ease};
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral[100]};
    color: ${props => props.theme.colors.primary.main};
  }
`;

const MenuIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const MenuLabel = styled.span`
  flex: 1;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const MenuArrow = styled.span<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  transition: ${props => props.theme.transitions.ease};
  transform: rotate(${props => props.$isOpen ? '90deg' : '0deg'});
`;

const SubMenu = styled(motion.div)`
  padding: ${props => props.theme.spacing.xs} 0;
  background-color: ${props => props.theme.colors.neutral[50]};
`;

const SubMenuItem = styled(motion.a) <{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  padding-left: calc(${props => props.theme.spacing.lg} + 32px);
  color: ${props => props.$isActive ? props.theme.colors.primary.main : props.theme.colors.neutral[600]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-decoration: none;
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral[100]};
    color: ${props => props.theme.colors.primary.main};
  }
`;

const SubMenuDot = styled.span<{ $isActive?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: ${props => props.theme.radius.round};
  background-color: ${props => props.$isActive ? props.theme.colors.primary.main : props.theme.colors.neutral[400]};
`;

const MenuBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
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

const BottomSection = styled.div`
  padding: ${props => props.theme.spacing.md} 0;
  border-top: 1px solid ${props => props.theme.colors.neutral[200]};
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.sm};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.radius.round};
  overflow: hidden;
`;

const UserAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[900]};
`;

const UserRole = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[500]};
`;

export default Sidebar;