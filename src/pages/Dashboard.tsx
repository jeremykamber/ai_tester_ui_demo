import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    RiRobot2Line, RiUserLine, RiAddLine,
    RiFileChartLine, RiTimeLine, RiBugLine,
    RiArrowRightSLine, RiPlayFill, RiPauseFill
} from 'react-icons/ri';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

// Styled Link components
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PlusIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.radius.round};
  background-color: ${props => props.theme.colors.neutral[300]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  transition: ${props => props.theme.transitions.ease};
`;

const Dashboard = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Mock data for statistics and agents
    const stats = [
        { title: 'Total Agents', value: 12, icon: <RiRobot2Line />, color: 'primary' },
        { title: 'Total Personas', value: 24, icon: <RiUserLine />, color: 'secondary' },
        { title: 'Bugs Found', value: 87, icon: <RiBugLine />, color: 'error' },
        { title: 'Testing Hours', value: 156, icon: <RiTimeLine />, color: 'success' },
    ];

    const recentAgents = [
        {
            id: 1,
            name: 'Senior User Agent',
            persona: 'Martha, 68, Low Tech-savvy',
            status: 'active',
            lastRun: '2 hours ago',
            issuesFound: 5,
            progress: 75,
            type: 'user-testing',
        },
        {
            id: 2,
            name: 'Teenage Shopper',
            persona: 'Alex, 17, Tech Native',
            status: 'paused',
            lastRun: '1 day ago',
            issuesFound: 2,
            progress: 45,
            type: 'e-commerce',
        },
        {
            id: 3,
            name: 'Professional User',
            persona: 'James, 42, Business Executive',
            status: 'completed',
            lastRun: '3 days ago',
            issuesFound: 9,
            progress: 100,
            type: 'user-testing',
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <DashboardHeader>
                <div>
                    <DashboardTitle>Dashboard</DashboardTitle>
                    <DashboardDescription>
                        Overview of your AI agents and testing insights
                    </DashboardDescription>
                </div>
                <StyledLink to="/create">
                    <Button leftIcon={<RiAddLine />}>
                        Create New Agent
                    </Button>
                </StyledLink>
            </DashboardHeader>

            <StatGrid>
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <StatIconWrapper $color={stat.color}>
                            {stat.icon}
                        </StatIconWrapper>
                        <StatContent>
                            <StatValue>{stat.value}</StatValue>
                            <StatTitle>{stat.title}</StatTitle>
                        </StatContent>
                    </StatCard>
                ))}
            </StatGrid>

            <SectionHeader>
                <SectionTitle>Recent Agents</SectionTitle>
                <FilterContainer>
                    {['all', 'active', 'paused', 'completed'].map((filter) => (
                        <FilterButton
                            key={filter}
                            selected={selectedFilter === filter}
                            onClick={() => setSelectedFilter(filter)}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </FilterButton>
                    ))}
                </FilterContainer>
            </SectionHeader>

            <AgentGrid>
                {recentAgents.map((agent) => (
                    <AgentCard
                        key={agent.id}
                        hover
                        as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <AgentCardContent>
                            <AgentHeader>
                                <div>
                                    <AgentName>{agent.name}</AgentName>
                                    <AgentPersona>
                                        <RiUserLine />
                                        {agent.persona}
                                    </AgentPersona>
                                </div>
                                <StatusBadge
                                    variant={
                                        agent.status === 'active' ? 'success' :
                                            agent.status === 'paused' ? 'warning' : 'primary'
                                    }
                                    rounded
                                    dot
                                >
                                    {agent.status}
                                </StatusBadge>
                            </AgentHeader>

                            <AgentStats>
                                <AgentStat>
                                    <AgentStatLabel>Last Run</AgentStatLabel>
                                    <AgentStatValue>{agent.lastRun}</AgentStatValue>
                                </AgentStat>
                                <AgentStat>
                                    <AgentStatLabel>Issues Found</AgentStatLabel>
                                    <AgentStatValue highlight>{agent.issuesFound}</AgentStatValue>
                                </AgentStat>
                            </AgentStats>

                            <ProgressContainer>
                                <ProgressLabel>Test Progress</ProgressLabel>
                                <ProgressWrapper>
                                    <ProgressBar progress={agent.progress} />
                                </ProgressWrapper>
                                <ProgressValue>{agent.progress}%</ProgressValue>
                            </ProgressContainer>
                        </AgentCardContent>
                        <AgentActions>
                            <AgentActionButton
                                variant={agent.status === 'active' ? 'ghost' : 'primary'}
                                size="small"
                                leftIcon={agent.status === 'active' ? <RiPauseFill /> : <RiPlayFill />}
                            >
                                {agent.status === 'active' ? 'Pause' : 'Resume'}
                            </AgentActionButton>
                            <AgentActionButton
                                as={Link}
                                to={`/agent/${agent.id}`}
                                variant="outline"
                                size="small"
                                rightIcon={<RiArrowRightSLine />}
                            >
                                Details
                            </AgentActionButton>
                        </AgentActions>
                    </AgentCard>
                ))}

                <CreateAgentCard as={Link} to="/create">
                    <PlusIcon>
                        <RiAddLine />
                    </PlusIcon>
                    <CreateAgentText>Create New Agent</CreateAgentText>
                </CreateAgentCard>
            </AgentGrid>

            <SectionHeader>
                <SectionTitle>Recent Reports</SectionTitle>
                <StyledLink to="/reports">
                    <Button
                        variant="ghost"
                        size="small"
                        rightIcon={<RiArrowRightSLine />}
                    >
                        View All
                    </Button>
                </StyledLink>
            </SectionHeader>

            <ReportGrid>
                {[1, 2, 3].map((report) => (
                    <ReportCard
                        key={report}
                        title={`Test Report #${report}`}
                        subtitle="Generated on Jun 28, 2023"
                    >
                        <ReportInfo>
                            <ReportItem>
                                <ReportItemLabel>Agent</ReportItemLabel>
                                <ReportItemValue>Senior User Agent</ReportItemValue>
                            </ReportItem>
                            <ReportItem>
                                <ReportItemLabel>Persona</ReportItemLabel>
                                <ReportItemValue>Martha, 68</ReportItemValue>
                            </ReportItem>
                            <ReportItem>
                                <ReportItemLabel>Issues Found</ReportItemLabel>
                                <ReportItemValue highlight>5</ReportItemValue>
                            </ReportItem>
                            <ReportItem>
                                <ReportItemLabel>Test Duration</ReportItemLabel>
                                <ReportItemValue>1h 23m</ReportItemValue>
                            </ReportItem>
                        </ReportInfo>
                        <ReportChart>
                            <ChartPlaceholder>
                                <RiFileChartLine />
                            </ChartPlaceholder>
                        </ReportChart>
                    </ReportCard>
                ))}
            </ReportGrid>
        </motion.div>
    );
};

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const DashboardTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const DashboardDescription = styled.p`
  color: ${props => props.theme.colors.neutral[600]};
  margin-bottom: 0;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const StatIconWrapper = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  
  ${props => {
        switch (props.$color) {
            case 'primary':
                return `
          background: ${props.theme.gradients.primary};
          color: ${props.theme.colors.primary.contrast};
        `;
            case 'secondary':
                return `
          background: ${props.theme.gradients.secondary};
          color: ${props.theme.colors.secondary.contrast};
        `;
            case 'error':
                return `
          background: linear-gradient(135deg, ${props.theme.colors.error.main} 0%, ${props.theme.colors.error.dark} 100%);
          color: ${props.theme.colors.error.contrast};
        `;
            case 'success':
                return `
          background: linear-gradient(135deg, ${props.theme.colors.success.main} 0%, ${props.theme.colors.success.dark} 100%);
          color: ${props.theme.colors.success.contrast};
        `;
            default:
                return '';
        }
    }}
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  line-height: 1;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatTitle = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[500]};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  margin-bottom: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  
  @media (max-width: 550px) {
    display: none;
  }
`;

const FilterButton = styled.button<{ selected: boolean }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.ease};
  
  background-color: ${props => props.selected ? props.theme.colors.primary.main : 'transparent'};
  color: ${props => props.selected ? props.theme.colors.primary.contrast : props.theme.colors.neutral[700]};
  
  &:hover {
    background-color: ${props => !props.selected && props.theme.colors.neutral[100]};
  }
`;

const AgentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AgentCard = styled(Card)`
  padding: 0;
`;

const AgentCardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const AgentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const AgentName = styled.h3`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const AgentPersona = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
`;

const StatusBadge = styled(Badge)``;

const AgentStats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AgentStat = styled.div``;

const AgentStatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.neutral[500]};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const AgentStatValue = styled.div<{ highlight?: boolean }>`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.highlight ? props.theme.colors.primary.main : props.theme.colors.neutral[800]};
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ProgressLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[700]};
  min-width: 100px;
`;

const ProgressWrapper = styled.div`
  flex: 1;
  height: 6px;
  background-color: ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.radius.round};
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background: ${props => props.theme.gradients.primary};
  border-radius: ${props => props.theme.radius.round};
`;

const ProgressValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[700]};
  min-width: 40px;
  text-align: right;
`;

const AgentActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.neutral[100]};
  background-color: ${props => props.theme.colors.neutral[50]};
`;

const AgentActionButton = styled(Button)``;

const CreateAgentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  border: 2px dashed ${props => props.theme.colors.neutral[300]};
  background-color: ${props => props.theme.colors.neutral[50]};
  box-shadow: none;
  transition: ${props => props.theme.transitions.ease};
  text-decoration: none;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    background-color: ${props => props.theme.colors.primary.light}10;
    
    ${PlusIcon} {
      background-color: ${props => props.theme.colors.primary.main};
      color: white;
    }
  }
`;

const CreateAgentText = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[600]};
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ReportCard = styled(Card)``;

const ReportInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ReportItem = styled.div``;

const ReportItemLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.neutral[500]};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ReportItemValue = styled.div<{ highlight?: boolean }>`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.highlight ? props.theme.colors.primary.main : props.theme.colors.neutral[800]};
`;

const ReportChart = styled.div`
  height: 120px;
  border-radius: ${props => props.theme.radius.md};
  background-color: ${props => props.theme.colors.neutral[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.neutral[400]};
  font-size: 3rem;
`;

const ChartPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Dashboard;