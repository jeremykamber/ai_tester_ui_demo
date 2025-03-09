import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    RiPlayCircleLine,
    RiPauseCircleLine,
    RiStopCircleLine,
    RiHistoryLine,
    RiFileTextLine,
    RiSettings4Line,
    RiUser3Line,
    RiCheckboxCircleLine,
    RiCloseCircleLine,
    RiErrorWarningLine
} from 'react-icons/ri';

interface TestRun {
    id: string;
    status: 'running' | 'completed' | 'failed' | 'stopped';
    startTime: string;
    endTime?: string;
    scenario: string;
    steps: {
        description: string;
        status: 'success' | 'error' | 'pending';
        screenshot?: string;
        error?: string;
    }[];
}

const AgentDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'config'>('overview');
    const [isRunning, setIsRunning] = useState(false);

    // Mock data - in a real app this would come from an API
    const agent = {
        id,
        name: 'E-commerce Shopper',
        description: 'Tests the full e-commerce shopping experience',
        status: 'active',
        lastRun: '2024-01-15T10:30:00Z',
        successRate: 85,
        persona: {
            name: 'Sarah',
            age: 32,
            techLevel: 'intermediate',
            traits: ['detail-oriented', 'methodical', 'patient'],
            goals: ['complete purchase', 'find specific products'],
            preferences: ['mobile-first', 'fast checkout']
        },
        configuration: {
            targetUrl: 'https://example-store.com',
            scenarios: [
                {
                    description: 'Complete checkout flow',
                    steps: [
                        'Browse product catalog',
                        'Add item to cart',
                        'Proceed to checkout',
                        'Fill shipping details',
                        'Complete payment'
                    ]
                }
            ]
        },
        testRuns: [
            {
                id: 'run1',
                status: 'completed',
                startTime: '2024-01-15T10:00:00Z',
                endTime: '2024-01-15T10:30:00Z',
                scenario: 'Complete checkout flow',
                steps: [
                    {
                        description: 'Browse product catalog',
                        status: 'success'
                    },
                    {
                        description: 'Add item to cart',
                        status: 'success'
                    },
                    {
                        description: 'Proceed to checkout',
                        status: 'success'
                    },
                    {
                        description: 'Fill shipping details',
                        status: 'success'
                    },
                    {
                        description: 'Complete payment',
                        status: 'error',
                        error: 'Payment gateway timeout'
                    }
                ]
            }
        ] as TestRun[]
    };

    const handleStartTest = () => {
        setIsRunning(true);
        // In a real app, this would trigger the test execution
    };

    const handleStopTest = () => {
        setIsRunning(false);
        // In a real app, this would stop the test execution
    };

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <HeaderTop>
                        <Title>{agent.name}</Title>
                        <ButtonGroup>
                            {!isRunning ? (
                                <Button onClick={handleStartTest}>
                                    <RiPlayCircleLine /> Start Test
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline">
                                        <RiPauseCircleLine /> Pause
                                    </Button>
                                    <Button variant="danger" onClick={handleStopTest}>
                                        <RiStopCircleLine /> Stop
                                    </Button>
                                </>
                            )}
                        </ButtonGroup>
                    </HeaderTop>
                    <Description>{agent.description}</Description>
                    <Stats>
                        <StatItem>
                            <StatLabel>Success Rate</StatLabel>
                            <StatValue>{agent.successRate}%</StatValue>
                        </StatItem>
                        <StatItem>
                            <StatLabel>Last Run</StatLabel>
                            <StatValue>
                                {new Date(agent.lastRun).toLocaleDateString()}
                            </StatValue>
                        </StatItem>
                        <StatItem>
                            <StatLabel>Status</StatLabel>
                            <StatusBadge $status={agent.status}>
                                {agent.status}
                            </StatusBadge>
                        </StatItem>
                    </Stats>
                </HeaderContent>
            </Header>

            <Content>
                <TabBar>
                    <Tab
                        $active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                    >
                        <RiFileTextLine /> Overview
                    </Tab>
                    <Tab
                        $active={activeTab === 'history'}
                        onClick={() => setActiveTab('history')}
                    >
                        <RiHistoryLine /> Test History
                    </Tab>
                    <Tab
                        $active={activeTab === 'config'}
                        onClick={() => setActiveTab('config')}
                    >
                        <RiSettings4Line /> Configuration
                    </Tab>
                </TabBar>

                <TabContent
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'overview' && (
                        <Overview>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <RiUser3Line /> Persona
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <PersonaGrid>
                                        <PersonaItem>
                                            <PersonaLabel>Name</PersonaLabel>
                                            <PersonaValue>{agent.persona.name}</PersonaValue>
                                        </PersonaItem>
                                        <PersonaItem>
                                            <PersonaLabel>Age</PersonaLabel>
                                            <PersonaValue>{agent.persona.age}</PersonaValue>
                                        </PersonaItem>
                                        <PersonaItem>
                                            <PersonaLabel>Tech Level</PersonaLabel>
                                            <PersonaValue>{agent.persona.techLevel}</PersonaValue>
                                        </PersonaItem>
                                    </PersonaGrid>
                                    <PersonaSection>
                                        <PersonaLabel>Traits</PersonaLabel>
                                        <TagList>
                                            {agent.persona.traits.map((trait, index) => (
                                                <Tag key={index}>{trait}</Tag>
                                            ))}
                                        </TagList>
                                    </PersonaSection>
                                    <PersonaSection>
                                        <PersonaLabel>Goals</PersonaLabel>
                                        <List>
                                            {agent.persona.goals.map((goal, index) => (
                                                <ListItem key={index}>{goal}</ListItem>
                                            ))}
                                        </List>
                                    </PersonaSection>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <RiHistoryLine /> Latest Test Run
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {agent.testRuns[0] && (
                                        <>
                                            <RunHeader>
                                                <RunInfo>
                                                    <RunTitle>{agent.testRuns[0].scenario}</RunTitle>
                                                    <RunTime>
                                                        Started: {new Date(agent.testRuns[0].startTime).toLocaleString()}
                                                    </RunTime>
                                                </RunInfo>
                                                <RunStatus $status={agent.testRuns[0].status}>
                                                    {agent.testRuns[0].status}
                                                </RunStatus>
                                            </RunHeader>
                                            <Timeline>
                                                {agent.testRuns[0].steps.map((step, index) => (
                                                    <TimelineItem key={index}>
                                                        <TimelineIcon $status={step.status}>
                                                            {step.status === 'success' && <RiCheckboxCircleLine />}
                                                            {step.status === 'error' && <RiCloseCircleLine />}
                                                            {step.status === 'pending' && <RiErrorWarningLine />}
                                                        </TimelineIcon>
                                                        <TimelineContent>
                                                            <TimelineText>{step.description}</TimelineText>
                                                            {step.error && (
                                                                <TimelineError>{step.error}</TimelineError>
                                                            )}
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                ))}
                                            </Timeline>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Overview>
                    )}

                    {activeTab === 'history' && (
                        <History>
                            {agent.testRuns.map(run => (
                                <TestRunCard key={run.id}>
                                    <RunHeader>
                                        <RunInfo>
                                            <RunTitle>{run.scenario}</RunTitle>
                                            <RunTime>
                                                {new Date(run.startTime).toLocaleString()} -{' '}
                                                {run.endTime && new Date(run.endTime).toLocaleString()}
                                            </RunTime>
                                        </RunInfo>
                                        <RunStatus $status={run.status}>{run.status}</RunStatus>
                                    </RunHeader>
                                    <Timeline>
                                        {run.steps.map((step, index) => (
                                            <TimelineItem key={index}>
                                                <TimelineIcon $status={step.status}>
                                                    {step.status === 'success' && <RiCheckboxCircleLine />}
                                                    {step.status === 'error' && <RiCloseCircleLine />}
                                                    {step.status === 'pending' && <RiErrorWarningLine />}
                                                </TimelineIcon>
                                                <TimelineContent>
                                                    <TimelineText>{step.description}</TimelineText>
                                                    {step.error && <TimelineError>{step.error}</TimelineError>}
                                                </TimelineContent>
                                            </TimelineItem>
                                        ))}
                                    </Timeline>
                                </TestRunCard>
                            ))}
                        </History>
                    )}

                    {activeTab === 'config' && (
                        <Config>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <RiSettings4Line /> Test Configuration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ConfigItem>
                                        <ConfigLabel>Target URL</ConfigLabel>
                                        <ConfigValue>{agent.configuration.targetUrl}</ConfigValue>
                                    </ConfigItem>
                                    <ConfigSection>
                                        <ConfigLabel>Test Scenarios</ConfigLabel>
                                        {agent.configuration.scenarios.map((scenario, index) => (
                                            <ScenarioCard key={index}>
                                                <ScenarioTitle>{scenario.description}</ScenarioTitle>
                                                <List>
                                                    {scenario.steps.map((step, stepIndex) => (
                                                        <ListItem key={stepIndex}>{step}</ListItem>
                                                    ))}
                                                </List>
                                            </ScenarioCard>
                                        ))}
                                    </ConfigSection>
                                </CardContent>
                            </Card>
                        </Config>
                    )}
                </TabContent>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  min-height: 100%;
  background-color: ${props => props.theme.colors.neutral[50]};
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  padding: ${props => props.theme.spacing.xl} 0;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  margin: 0;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.neutral[600]};
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const StatItem = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.neutral[600]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-transform: capitalize;
  
  ${props => {
        switch (props.$status) {
            case 'active':
                return `
          background-color: ${props.theme.colors.success.main}20;
          color: ${props.theme.colors.success.main};
        `;
            case 'inactive':
                return `
          background-color: ${props.theme.colors.neutral[400]}20;
          color: ${props.theme.colors.neutral[600]};
        `;
            default:
                return `
          background-color: ${props.theme.colors.primary.main}20;
          color: ${props.theme.colors.primary.main};
        `;
        }
    }}
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl} ${props => props.theme.spacing.xl};
`;

const TabBar = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
`;

const Tab = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  color: ${props => props.$active ? props.theme.colors.primary.main : props.theme.colors.neutral[600]};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border-bottom: 2px solid ${props =>
        props.$active ? props.theme.colors.primary.main : 'transparent'
    };
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

const TabContent = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl};
`;

const History = styled.div`
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Config = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const Card = styled.div`
  background: white;
  border-radius: ${props => props.theme.radius.lg};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
`;

const CardTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.neutral[900]};
  
  svg {
    color: ${props => props.theme.colors.primary.main};
  }
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const PersonaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PersonaItem = styled.div``;

const PersonaLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const PersonaValue = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const PersonaSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const Tag = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary.main}20;
  color: ${props => props.theme.colors.primary.main};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TestRunCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const RunHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const RunInfo = styled.div``;

const RunTitle = styled.h4`
  margin: 0 0 ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.neutral[900]};
`;

const RunTime = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
`;

const RunStatus = styled.span<{ $status: string }>`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-transform: capitalize;
  
  ${props => {
        switch (props.$status) {
            case 'completed':
                return `
          background-color: ${props.theme.colors.success.main}20;
          color: ${props.theme.colors.success.main};
        `;
            case 'failed':
                return `
          background-color: ${props.theme.colors.error.main}20;
          color: ${props.theme.colors.error.main};
        `;
            case 'running':
                return `
          background-color: ${props.theme.colors.primary.main}20;
          color: ${props.theme.colors.primary.main};
        `;
            default:
                return `
          background-color: ${props.theme.colors.neutral[400]}20;
          color: ${props.theme.colors.neutral[600]};
        `;
        }
    }}
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const TimelineItem = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const TimelineIcon = styled.div<{ $status: string }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    ${props => {
        switch (props.$status) {
            case 'success':
                return `color: ${props.theme.colors.success.main};`;
            case 'error':
                return `color: ${props.theme.colors.error.main};`;
            default:
                return `color: ${props.theme.colors.neutral[400]};`;
        }
    }}
  }
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineText = styled.div`
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const TimelineError = styled.div`
  color: ${props => props.theme.colors.error.main};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ConfigItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ConfigLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ConfigValue = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const ConfigSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ScenarioCard = styled.div`
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ScenarioTitle = styled.h4`
  margin: 0 0 ${props => props.theme.spacing.md};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const Button = styled.button<{ variant?: 'outline' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.radius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.ease};
  
  ${props => {
        switch (props.variant) {
            case 'outline':
                return `
          border: 1px solid ${props.theme.colors.neutral[300]};
          color: ${props.theme.colors.neutral[700]};
          
          &:hover {
            border-color: ${props.theme.colors.primary.main};
            color: ${props.theme.colors.primary.main};
            background-color: ${props.theme.colors.primary.main}10;
          }
        `;
            case 'danger':
                return `
          background-color: ${props.theme.colors.error.main};
          color: white;
          
          &:hover {
            background-color: ${props.theme.colors.error.dark};
          }
        `;
            default:
                return `
          background-color: ${props.theme.colors.primary.main};
          color: white;
          
          &:hover {
            background-color: ${props.theme.colors.primary.dark};
          }
        `;
        }
    }}
`;

export default AgentDetail;