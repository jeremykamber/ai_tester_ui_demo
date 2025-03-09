import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RiFileChartLine } from 'react-icons/ri';
import Card from '../components/common/Card';

const Reports = () => {
    // Mock data for reports
    const reports = [
        { id: 1, title: 'Test Report #1', date: 'Jun 28, 2023', agent: 'Senior User Agent', persona: 'Martha, 68', issuesFound: 5, duration: '1h 23m' },
        { id: 2, title: 'Test Report #2', date: 'Jul 01, 2023', agent: 'Teenage Shopper', persona: 'Alex, 17', issuesFound: 2, duration: '45m' },
        { id: 3, title: 'Test Report #3', date: 'Jul 05, 2023', agent: 'Professional User', persona: 'James, 42', issuesFound: 9, duration: '2h 10m' }
    ];

    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header>
                <Title>Reports</Title>
                <Description>View detailed reports generated by your AI agents</Description>
            </Header>

            <ReportGrid>
                {reports.map(report => (
                    <ReportCard key={report.id}>
                        <CardHeader>
                            <CardTitle>{report.title}</CardTitle>
                            <CardSubtitle>{report.date}</CardSubtitle>
                        </CardHeader>
                        <CardContent>
                            <ReportInfo>
                                <ReportItem>
                                    <ReportItemLabel>Agent</ReportItemLabel>
                                    <ReportItemValue>{report.agent}</ReportItemValue>
                                </ReportItem>
                                <ReportItem>
                                    <ReportItemLabel>Persona</ReportItemLabel>
                                    <ReportItemValue>{report.persona}</ReportItemValue>
                                </ReportItem>
                                <ReportItem>
                                    <ReportItemLabel>Issues Found</ReportItemLabel>
                                    <ReportItemValue highlight>{report.issuesFound}</ReportItemValue>
                                </ReportItem>
                                <ReportItem>
                                    <ReportItemLabel>Test Duration</ReportItemLabel>
                                    <ReportItemValue>{report.duration}</ReportItemValue>
                                </ReportItem>
                            </ReportInfo>
                            <ReportChart>
                                <ChartPlaceholder>
                                    <RiFileChartLine />
                                </ChartPlaceholder>
                            </ReportChart>
                        </CardContent>
                    </ReportCard>
                ))}
            </ReportGrid>
        </Container>
    );
};

const Container = styled(motion.div)`
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Description = styled.p`
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

const ReportCard = styled(Card)`
  padding: 0;
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
`;

const CardTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const CardSubtitle = styled.p`
  color: ${props => props.theme.colors.neutral[600]};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

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

export default Reports;