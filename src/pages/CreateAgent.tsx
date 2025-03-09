import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    RiUserSmileLine,
    RiSettings4Line,
    RiTestTubeLine,
    RiCheckLine,
    RiArrowRightLine,
    RiArrowLeftLine,
    RiAddLine,
    RiDeleteBinLine
} from 'react-icons/ri';

interface FormState {
    name: string;
    description: string;
    persona: {
        name: string;
        age: string;
        techLevel: string;
        traits: string[];
        goals: string[];
        preferences: string[];
    };
    configuration: {
        targetUrl: string;
        scenarios: { description: string; steps: string[] }[];
        waitTime: string;
        maxDuration: string;
    };
}

const initialFormState: FormState = {
    name: '',
    description: '',
    persona: {
        name: '',
        age: '',
        techLevel: '',
        traits: [],
        goals: [],
        preferences: []
    },
    configuration: {
        targetUrl: '',
        scenarios: [{ description: '', steps: [''] }],
        waitTime: '2',
        maxDuration: '30'
    }
};

const CreateAgent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormState>(initialFormState);

    const handlePersonaChange = (field: keyof FormState['persona'], value: any) => {
        setFormData(prev => ({
            ...prev,
            persona: { ...prev.persona, [field]: value }
        }));
    };

    const handleConfigChange = (field: keyof FormState['configuration'], value: any) => {
        setFormData(prev => ({
            ...prev,
            configuration: { ...prev.configuration, [field]: value }
        }));
    };

    const addScenario = () => {
        setFormData(prev => ({
            ...prev,
            configuration: {
                ...prev.configuration,
                scenarios: [...prev.configuration.scenarios, { description: '', steps: [''] }]
            }
        }));
    };

    const removeScenario = (index: number) => {
        setFormData(prev => ({
            ...prev,
            configuration: {
                ...prev.configuration,
                scenarios: prev.configuration.scenarios.filter((_, i) => i !== index)
            }
        }));
    };

    const addStep = (scenarioIndex: number) => {
        setFormData(prev => ({
            ...prev,
            configuration: {
                ...prev.configuration,
                scenarios: prev.configuration.scenarios.map((scenario, i) =>
                    i === scenarioIndex
                        ? { ...scenario, steps: [...scenario.steps, ''] }
                        : scenario
                )
            }
        }));
    };

    const removeStep = (scenarioIndex: number, stepIndex: number) => {
        setFormData(prev => ({
            ...prev,
            configuration: {
                ...prev.configuration,
                scenarios: prev.configuration.scenarios.map((scenario, i) =>
                    i === scenarioIndex
                        ? {
                            ...scenario,
                            steps: scenario.steps.filter((_, j) => j !== stepIndex)
                        }
                        : scenario
                )
            }
        }));
    };

    const handleSubmit = () => {
        // In a real app, we would make an API call here
        console.log('Form submitted:', formData);
        navigate('/');
    };

    const steps = [
        { number: 1, title: 'Basic Info', icon: <RiUserSmileLine /> },
        { number: 2, title: 'Persona', icon: <RiSettings4Line /> },
        { number: 3, title: 'Configuration', icon: <RiTestTubeLine /> }
    ];

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Title>Create New Agent</Title>
                    <Steps>
                        {steps.map((step, index) => (
                            <Step key={step.number}>
                                <StepNumber $active={currentStep === step.number} $completed={currentStep > step.number}>
                                    {currentStep > step.number ? <RiCheckLine /> : step.number}
                                </StepNumber>
                                <StepLabel>
                                    {step.title}
                                    <StepIcon>{step.icon}</StepIcon>
                                </StepLabel>
                                {index < steps.length - 1 && <StepConnector $active={currentStep > step.number} />}
                            </Step>
                        ))}
                    </Steps>
                </HeaderContent>
            </Header>

            <Content>
                <FormSection
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentStep === 1 && (
                        <>
                            <FormGroup>
                                <Label>Agent Name</Label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter a name for your agent"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe what this agent will test"
                                    rows={4}
                                />
                            </FormGroup>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <FormGroup>
                                <Label>Persona Name</Label>
                                <Input
                                    type="text"
                                    value={formData.persona.name}
                                    onChange={e => handlePersonaChange('name', e.target.value)}
                                    placeholder="Give your persona a name"
                                />
                            </FormGroup>
                            <FormRow>
                                <FormGroup>
                                    <Label>Age</Label>
                                    <Input
                                        type="number"
                                        value={formData.persona.age}
                                        onChange={e => handlePersonaChange('age', e.target.value)}
                                        placeholder="Age"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Tech Proficiency Level</Label>
                                    <Select
                                        value={formData.persona.techLevel}
                                        onChange={e => handlePersonaChange('techLevel', e.target.value)}
                                    >
                                        <option value="">Select level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </Select>
                                </FormGroup>
                            </FormRow>
                            <FormGroup>
                                <Label>Traits</Label>
                                <TagInput>
                                    {formData.persona.traits.map((trait, index) => (
                                        <Tag key={index}>
                                            {trait}
                                            <TagRemove onClick={() => {
                                                handlePersonaChange('traits',
                                                    formData.persona.traits.filter((_, i) => i !== index)
                                                );
                                            }}>
                                                ×
                                            </TagRemove>
                                        </Tag>
                                    ))}
                                    <Input
                                        type="text"
                                        placeholder="Add trait and press Enter"
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const value = (e.target as HTMLInputElement).value.trim();
                                                if (value && !formData.persona.traits.includes(value)) {
                                                    handlePersonaChange('traits', [...formData.persona.traits, value]);
                                                    (e.target as HTMLInputElement).value = '';
                                                }
                                            }
                                        }}
                                    />
                                </TagInput>
                            </FormGroup>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            <FormGroup>
                                <Label>Target URL</Label>
                                <Input
                                    type="url"
                                    value={formData.configuration.targetUrl}
                                    onChange={e => handleConfigChange('targetUrl', e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Test Scenarios</Label>
                                {formData.configuration.scenarios.map((scenario, scenarioIndex) => (
                                    <ScenarioCard key={scenarioIndex}>
                                        <ScenarioHeader>
                                            <ScenarioTitle>Scenario {scenarioIndex + 1}</ScenarioTitle>
                                            {formData.configuration.scenarios.length > 1 && (
                                                <RemoveButton onClick={() => removeScenario(scenarioIndex)}>
                                                    <RiDeleteBinLine />
                                                </RemoveButton>
                                            )}
                                        </ScenarioHeader>
                                        <FormGroup>
                                            <Label>Description</Label>
                                            <Input
                                                type="text"
                                                value={scenario.description}
                                                onChange={e => {
                                                    const newScenarios = [...formData.configuration.scenarios];
                                                    newScenarios[scenarioIndex].description = e.target.value;
                                                    handleConfigChange('scenarios', newScenarios);
                                                }}
                                                placeholder="Describe the scenario"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Steps</Label>
                                            {scenario.steps.map((step, stepIndex) => (
                                                <StepRow key={stepIndex}>
                                                    <StepNumber $small>{stepIndex + 1}</StepNumber>
                                                    <Input
                                                        type="text"
                                                        value={step}
                                                        onChange={e => {
                                                            const newScenarios = [...formData.configuration.scenarios];
                                                            newScenarios[scenarioIndex].steps[stepIndex] = e.target.value;
                                                            handleConfigChange('scenarios', newScenarios);
                                                        }}
                                                        placeholder="Describe this step"
                                                    />
                                                    {scenario.steps.length > 1 && (
                                                        <RemoveButton
                                                            onClick={() => removeStep(scenarioIndex, stepIndex)}
                                                            title="Remove step"
                                                        >
                                                            <RiDeleteBinLine />
                                                        </RemoveButton>
                                                    )}
                                                </StepRow>
                                            ))}
                                            <AddButton onClick={() => addStep(scenarioIndex)}>
                                                <RiAddLine /> Add Step
                                            </AddButton>
                                        </FormGroup>
                                    </ScenarioCard>
                                ))}
                                <AddButton onClick={addScenario}>
                                    <RiAddLine /> Add Scenario
                                </AddButton>
                            </FormGroup>
                            <FormRow>
                                <FormGroup>
                                    <Label>Wait Time Between Actions (seconds)</Label>
                                    <Input
                                        type="number"
                                        value={formData.configuration.waitTime}
                                        onChange={e => handleConfigChange('waitTime', e.target.value)}
                                        min="0"
                                        step="0.5"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Maximum Test Duration (minutes)</Label>
                                    <Input
                                        type="number"
                                        value={formData.configuration.maxDuration}
                                        onChange={e => handleConfigChange('maxDuration', e.target.value)}
                                        min="1"
                                    />
                                </FormGroup>
                            </FormRow>
                        </>
                    )}
                </FormSection>

                <ButtonGroup>
                    {currentStep > 1 && (
                        <Button onClick={() => setCurrentStep(prev => prev - 1)} variant="outline">
                            <RiArrowLeftLine /> Previous
                        </Button>
                    )}
                    {currentStep < steps.length ? (
                        <Button onClick={() => setCurrentStep(prev => prev + 1)}>
                            Next <RiArrowRightLine />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>
                            Create Agent <RiCheckLine />
                        </Button>
                    )}
                </ButtonGroup>
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Steps = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const StepNumber = styled.div<{ $active?: boolean; $completed?: boolean; $small?: boolean }>`
  width: ${props => props.$small ? '24px' : '32px'};
  height: ${props => props.$small ? '24px' : '32px'};
  border-radius: ${props => props.theme.radius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.ease};
  
  ${props => props.$completed && `
    background-color: ${props.theme.colors.success.main};
    color: white;
  `}
  
  ${props => props.$active && `
    background-color: ${props.theme.colors.primary.main};
    color: white;
  `}
  
  ${props => !props.$active && !props.$completed && `
    background-color: ${props.theme.colors.neutral[100]};
    color: ${props.theme.colors.neutral[600]};
  `}
`;

const StepLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.neutral[700]};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const StepIcon = styled.div`
  color: ${props => props.theme.colors.neutral[400]};
`;

const StepConnector = styled.div<{ $active?: boolean }>`
  width: 60px;
  height: 2px;
  background-color: ${props =>
        props.$active
            ? props.theme.colors.success.main
            : props.theme.colors.neutral[200]
    };
  transition: ${props => props.theme.transitions.ease};
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl} ${props => props.theme.spacing.xl};
`;

const FormSection = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[700]};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  transition: ${props => props.theme.transitions.ease};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: ${props => props.theme.shadows.glow};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral[400]};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: ${props => props.theme.transitions.ease};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: ${props => props.theme.shadows.glow};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral[400]};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  background-color: white;
  cursor: pointer;
  transition: ${props => props.theme.transitions.ease};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.radius.md};
  
  input {
    border: none;
    padding: ${props => props.theme.spacing.sm};
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary.main}20;
  color: ${props => props.theme.colors.primary.main};
  border-radius: ${props => props.theme.radius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const TagRemove = styled.button`
  color: currentColor;
  font-size: 1.2em;
  line-height: 0.7;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ScenarioCard = styled.div`
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.radius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ScenarioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ScenarioTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.neutral[700]};
`;

const StepRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
`;

const Button = styled.button<{ variant?: 'outline' }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.radius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.ease};
  
  ${props => props.variant === 'outline' ? `
    border: 1px solid ${props.theme.colors.neutral[300]};
    color: ${props.theme.colors.neutral[700]};
    
    &:hover {
      border-color: ${props.theme.colors.primary.main};
      color: ${props.theme.colors.primary.main};
      background-color: ${props.theme.colors.primary.main}10;
    }
  ` : `
    background-color: ${props.theme.colors.primary.main};
    color: white;
    
    &:hover {
      background-color: ${props.theme.colors.primary.dark};
    }
  `}
`;

const AddButton = styled(Button).attrs({ variant: 'outline' })`
  width: 100%;
  justify-content: center;
`;

const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radius.md};
  color: ${props => props.theme.colors.neutral[500]};
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    background-color: ${props => props.theme.colors.error.main}20;
    color: ${props => props.theme.colors.error.main};
  }
`;

export default CreateAgent;