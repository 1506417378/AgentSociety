import React, { useState, useEffect } from 'react';
import { Card, Button, Select, Space, Typography, Divider, message, Row, Col, Spin, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExperimentOutlined, ApiOutlined, TeamOutlined, GlobalOutlined, RocketOutlined, NodeIndexOutlined } from '@ant-design/icons';
import { ConfigItem } from '../../services/storageService';
import { fetchCustom } from '../../components/fetch';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
const { Option } = Select;

// Add these interfaces at the top of the file
interface LLMConfig {
    provider?: string;
    model?: string;
    api_key?: string;
    base_url?: string;
}

interface WorkflowConfig extends ConfigItem {
    config: {
        llm?: LLMConfig;
        [key: string]: any;
    }
}

const CreateExperiment: React.FC = () => {
    const { t } = useTranslation();
    // State declarations
    const [llms, setLLMs] = useState<ConfigItem[]>([]);
    const [agents, setAgents] = useState<ConfigItem[]>([]);
    const [workflows, setWorkflows] = useState<ConfigItem[]>([]);
    const [maps, setMaps] = useState<ConfigItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedLLM, setSelectedLLM] = useState<string>('');
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');
    const [selectedMap, setSelectedMap] = useState<string>('');
    const [experimentName, setExperimentName] = useState<string>('');
    const [experimentRunning, setExperimentRunning] = useState(false);
    const [experimentId, setExperimentId] = useState<string | null>(null);
    const [statusCheckInterval, setStatusCheckInterval] = useState<NodeJS.Timeout | null>(null);
    const [experimentStatus, setExperimentStatus] = useState<string | null>(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // Load all configurations
    useEffect(() => {
        const loadConfigurations = async () => {
            setLoading(true);
            try {
                // Load all configurations
                const llmConfigsRes = await fetchCustom('/api/llm-configs');
                if (!llmConfigsRes.ok) {
                    throw new Error('Failed to fetch LLM configurations');
                }
                const llmConfigs = (await llmConfigsRes.json()).data;
                const agtsRes = await fetchCustom('/api/agent-configs');
                if (!agtsRes.ok) {
                    throw new Error('Failed to fetch agent configurations');
                }
                const agts = (await agtsRes.json()).data;
                const wkfsRes = await fetchCustom('/api/workflow-configs');
                if (!wkfsRes.ok) {
                    throw new Error('Failed to fetch workflow configurations');
                }
                const wkfs = (await wkfsRes.json()).data;
                const mpsRes = await fetchCustom('/api/map-configs');
                if (!mpsRes.ok) {
                    throw new Error('Failed to fetch map configurations');
                }
                const mps = (await mpsRes.json()).data;

                setLLMs(llmConfigs);
                setAgents(agts);
                setWorkflows(wkfs);
                setMaps(mps);

                // Set defaults if available
                if (llmConfigs.length > 0) setSelectedLLM(llmConfigs[0].id);
                if (agts.length > 0) setSelectedAgent(agts[0].id);
                if (wkfs.length > 0) setSelectedWorkflow(wkfs[0].id);
                if (mps.length > 0) setSelectedMap(mps[0].id);
            } catch (error) {
                message.error(t('form.experiment.messages.loadFailed'));
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadConfigurations();
    }, [t]);

    // Clean up interval timer
    useEffect(() => {
        return () => {
            if (statusCheckInterval) {
                clearInterval(statusCheckInterval);
            }
        };
    }, [statusCheckInterval]);

    // Handle navigation to create new configuration pages
    const handleCreateNew = (type: 'llm' | 'agent' | 'workflow' | 'map') => {
        switch (type) {
            case 'llm':
                navigate('/llms');
                break;
            case 'agent':
                navigate('/agents');
                break;
            case 'workflow':
                navigate('/workflows');
                break;
            case 'map':
                navigate('/maps');
                break;
        }
    };

    // Render option content with name and description
    const renderOptionContent = (item: ConfigItem) => (
        <div>
            <div>{item.name}</div>
            {item.description && <Text type="secondary">{item.description}</Text>}
        </div>
    );

    // Handle form submission to start experiment
    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Validate form
            await form.validateFields();

            // Build configuration from selected components
            const llm = llms.find(llm => llm.id === selectedLLM);
            if (!llm) {
                throw new Error('LLM not found');
            }
            const map = maps.find(map => map.id === selectedMap);
            if (!map) {
                throw new Error('Map not found');
            }
            const agent = agents.find(agent => agent.id === selectedAgent);
            if (!agent) {
                throw new Error('Agent not found');
            }
            const workflow = workflows.find(workflow => workflow.id === selectedWorkflow);
            if (!workflow) {
                throw new Error('Workflow not found');
            }
            const config = {
                exp_name: experimentName,
                llm: {
                    tenant_id: llm.tenant_id,
                    id: llm.id,
                },
                map: {
                    tenant_id: map.tenant_id,
                    id: map.id,
                },
                agents: {
                    tenant_id: agent.tenant_id,
                    id: agent.id,
                },
                workflow: {
                    tenant_id: workflow.tenant_id,
                    id: workflow.id,
                },
            }

            // Send request to start experiment
            const response = await fetchCustom('/api/run-experiments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            const newExperimentId = data.data.id;

            setExperimentId(newExperimentId);
            setExperimentRunning(true);
            message.success(t('form.experiment.messages.startSuccess', { id: newExperimentId }));

            // Start polling for pod status
            const interval = setInterval(async () => {
                try {
                    const statusResponse = await fetchCustom(`/api/run-experiments/${newExperimentId}/status`);
                    if (!statusResponse.ok) {
                        throw new Error('Failed to fetch experiment status');
                    }
                    const statusData = await statusResponse.json();
                    const status = statusData.data;
                    if (status !== 'Running') {
                        setExperimentStatus(status);
                    }

                    if (status === 'Running') {
                        try {
                            // Pod is running, now check experiment initialization
                            const experimentResponse = await fetchCustom(`/api/experiments/${newExperimentId}`);
                            
                            if (experimentResponse.status === 404) {
                                // 404 is expected during initialization, continue waiting
                                setExperimentStatus('Initializing experiment data...');
                                return;
                            }
                            
                            if (!experimentResponse.ok) {
                                throw new Error('Failed to fetch experiment details');
                            }

                            const experimentData = await experimentResponse.json();
                            const experiment = experimentData.data;

                            // Check if experiment is fully initialized
                            if (experiment.status === 1) {
                                clearInterval(interval);
                                message.success(t('form.experiment.messages.initSuccess'));
                                navigate('/console');
                            } else {
                                setExperimentStatus('Initializing experiment data...');
                            }
                        } catch (error) {
                            if (error.response?.status === 404) {
                                // 404 error is expected during initialization, continue waiting
                                setExperimentStatus('Initializing experiment data...');
                                return;
                            }
                            throw error;
                        }
                    } else if (status === 'Failed' || status === 'Error') {
                        clearInterval(interval);
                        message.error(t('form.experiment.messages.startFailed'));
                        setExperimentRunning(false);
                    }
                } catch (error) {
                    // Only handle non-404 errors as failures
                    if (error.response?.status !== 404) {
                        console.error('Error checking experiment status:', error);
                        message.error(t('form.experiment.messages.statusCheckFailed'));
                        clearInterval(interval);
                        setExperimentRunning(false);
                    }
                }
            }, 2000);

            setStatusCheckInterval(interval);
        } catch (error) {
            message.error(t('form.experiment.messages.startFailed', { error: error.message }), 3);
            console.error(error);
            setExperimentRunning(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
                experimentName: '',
            }}
        >
            <Card title={t('form.experiment.createTitle')} extra={
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={experimentRunning}
                >
                    {t('form.experiment.startButton')}
                </Button>
            }>
                <Form.Item
                    name="experimentName"
                    label={t('form.experiment.nameLabel')}
                    rules={[{ required: true, message: t('form.experiment.nameRequired') }]}
                >
                    <Input
                        placeholder={t('form.experiment.namePlaceholder')}
                        onChange={(e) => setExperimentName(e.target.value)}
                        disabled={experimentRunning}
                    />
                </Form.Item>

                <Divider orientation="left">{t('form.experiment.componentsTitle')}</Divider>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card
                            title={<Space><ApiOutlined /> {t('form.experiment.llmTitle')}</Space>}
                            extra={<Button type="link" onClick={() => handleCreateNew('llm')}>{t('form.experiment.createNew')}</Button>}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Text>{t('form.experiment.selectLLM')}</Text>
                                <Form.Item
                                    name="llm"
                                    rules={[{ required: true, message: t('form.experiment.llmRequired') }]}
                                    initialValue={selectedLLM}
                                >
                                    <Select
                                        placeholder={t('form.experiment.selectLLMPlaceholder')}
                                        style={{ width: '100%' }}
                                        loading={loading}
                                        value={selectedLLM || undefined}
                                        onChange={setSelectedLLM}
                                        optionLabelProp="label"
                                        disabled={experimentRunning}
                                    >
                                        {llms.map(llm => (
                                            <Option key={llm.id} value={llm.id} label={llm.name}>
                                                {renderOptionContent(llm)}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            title={<Space><GlobalOutlined /> {t('form.experiment.mapTitle')}</Space>}
                            extra={<Button type="link" onClick={() => handleCreateNew('map')}>{t('form.experiment.createNew')}</Button>}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Text>{t('form.experiment.selectMap')}</Text>
                                <Form.Item
                                    name="map"
                                    rules={[{ required: true, message: t('form.experiment.mapRequired') }]}
                                    initialValue={selectedMap}
                                >
                                    <Select
                                        placeholder={t('form.experiment.selectMapPlaceholder')}
                                        style={{ width: '100%' }}
                                        loading={loading}
                                        value={selectedMap || undefined}
                                        onChange={setSelectedMap}
                                        optionLabelProp="label"
                                        disabled={experimentRunning}
                                    >
                                        {maps.map(map => (
                                            <Option key={map.id} value={map.id} label={map.name}>
                                                {renderOptionContent(map)}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            title={<Space><TeamOutlined /> {t('form.experiment.agentTitle')}</Space>}
                            extra={<Button type="link" onClick={() => handleCreateNew('agent')}>{t('form.experiment.createNew')}</Button>}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Text>{t('form.experiment.selectAgent')}</Text>
                                <Form.Item
                                    name="agent"
                                    rules={[{ required: true, message: t('form.experiment.agentRequired') }]}
                                    initialValue={selectedAgent}
                                >
                                    <Select
                                        placeholder={t('form.experiment.selectAgentPlaceholder')}
                                        style={{ width: '100%' }}
                                        loading={loading}
                                        value={selectedAgent || undefined}
                                        onChange={setSelectedAgent}
                                        optionLabelProp="label"
                                        disabled={experimentRunning}
                                    >
                                        {agents.map(agent => (
                                            <Option key={agent.id} value={agent.id} label={agent.name}>
                                                {renderOptionContent(agent)}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            title={<Space><NodeIndexOutlined /> {t('form.experiment.workflowTitle')}</Space>}
                            extra={<Button type="link" onClick={() => handleCreateNew('workflow')}>{t('form.experiment.createNew')}</Button>}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Text>{t('form.experiment.selectWorkflow')}</Text>
                                <Form.Item
                                    name="workflow"
                                    rules={[{ required: true, message: t('form.experiment.workflowRequired') }]}
                                    initialValue={selectedWorkflow}
                                >
                                    <Select
                                        placeholder={t('form.experiment.selectWorkflowPlaceholder')}
                                        style={{ width: '100%' }}
                                        loading={loading}
                                        value={selectedWorkflow || undefined}
                                        onChange={setSelectedWorkflow}
                                        optionLabelProp="label"
                                        disabled={experimentRunning}
                                    >
                                        {workflows.map(workflow => (
                                            <Option key={workflow.id} value={workflow.id} label={workflow.name}>
                                                {renderOptionContent(workflow)}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Card>
                    </Col>
                </Row>

                <Divider />

                {experimentRunning && (
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Spin size="large" />
                        <div style={{ marginTop: 16 }}>
                            <Text>
                                {t('form.experiment.statusLabel')}: {' '}
                                <Text strong type={
                                    experimentStatus === 'Running' ? 'warning' :
                                    experimentStatus?.includes('Initializing') ? 'warning' :
                                    experimentStatus === 'Failed' || experimentStatus === 'Error' ? 'danger' :
                                    'warning'
                                }>
                                    {experimentStatus === 'Running' ? t('form.experiment.statusStarting') :
                                     experimentStatus === 'Failed' ? t('form.experiment.statusFailed') :
                                     experimentStatus === 'Error' ? t('form.experiment.statusError') :
                                     experimentStatus || t('form.experiment.statusPreparing')}
                                </Text>
                            </Text>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <Text type="secondary">
                                {experimentStatus === 'Running' ? t('form.experiment.statusStartingDesc') :
                                 experimentStatus?.includes('Initializing') ? t('form.experiment.statusInitializingDesc') :
                                 experimentStatus === 'Failed' || experimentStatus === 'Error' ? t('form.experiment.statusFailedDesc') :
                                 t('form.experiment.statusPreparingDesc')}
                            </Text>
                        </div>
                    </div>
                )}
            </Card>
        </Form>
    );
};

export default CreateExperiment; 