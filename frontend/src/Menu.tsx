import { ExportOutlined, GithubOutlined,  ExperimentOutlined, ApiOutlined, TeamOutlined, GlobalOutlined, NodeIndexOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps, Space, Dropdown, Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const RootMenu = ({ selectedKey, style, homePage }: {
    selectedKey: string,
    style?: React.CSSProperties,
    homePage?: boolean  // 添加homePage属性
}) => {
    const { t, i18n } = useTranslation();
    const [mlflowUrl, setMlflowUrl] = useState<string>("");

    useEffect(() => {
        fetch("/api/mlflow/url")
            .then(res => res.json())
            .then(res => {
                setMlflowUrl(res.data);
            });
    }, []);

    const handleLanguageChange = () => {
        const newLang = i18n.language === 'en' ? 'zh' : 'en';
        i18n.changeLanguage(newLang);
    };

    // // Experiment submenu items
    // const experimentItems: MenuProps['items'] = [
    // ];

    const agentItems: MenuProps['items'] = [
        {
            key: '/agent-templates',
            label: <Link to="/agent-templates">{t('menu.agentTemplates')}</Link>,
            icon: <SettingOutlined />,
        },
        {
            key: '/profiles',
            label: <Link to="/profiles">{t('menu.profiles')}</Link>,
            icon: <TeamOutlined />,
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            key: '/Workbench',
            label: <Link to="/workbench">{t('menu.workbench')}</Link>,
            icon: <SettingOutlined />,
        },
        {
            key: '/llms',
            label: <Link to="/llms">{t('menu.llmConfigs')}</Link>,
            icon: <ApiOutlined />,
        },
        {
            key: '/maps',
            label: <Link to="/maps">{t('menu.maps')}</Link>,
            icon: <GlobalOutlined />,
        },
        {
            key: '/agents',
            label: (
                <Dropdown menu={{ items: agentItems }} placement="bottomLeft" arrow>
                    <div>
                        <Link to="/agents"><Space><TeamOutlined />{t('menu.agents')}</Space></Link>
                    </div>
                </Dropdown>
            ),

        },
        {
            key: '/workflows',
            label: <Link to="/workflows">{t('menu.workflows')}</Link>,
            icon: <NodeIndexOutlined />,
        },
        {
            key: "/console",
            label: <Link to="/console">{t('menu.experiments')}</Link>,
            icon: <ExperimentOutlined />,
        },
        { key: "/survey", label: <Link to="/survey">{t('menu.survey')}</Link> },
    ];

    if (mlflowUrl !== "") {
        menuItems.push({ key: "/mlflow", label: <Link to={mlflowUrl} rel="noopener noreferrer" target="_blank"><Space>{t('menu.mlflow')}<ExportOutlined /></Space></Link> });
    }
    menuItems.push({ key: "/Documentation", label: <Link to="https://agentsociety.readthedocs.io/en/latest/" rel="noopener noreferrer" target="_blank"><Space>{t('menu.documentation')}</Space></Link> });
    menuItems.push({ key: "/Github", label: <Link to="https://github.com/1506417378/AgentSociety" rel="noopener noreferrer" target="_blank"><Space>{t('menu.github')}<GithubOutlined /></Space></Link> });
    menuItems.push({key:"/Analysis",label:<Link to="https://lame-stiff-meat.anvil.app/" rel="noopener noreferrer" target="_blank"><Space>{t('menu.analysis')}</Space></Link> });

    const menuStyle: React.CSSProperties = {
        ...style,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Menu
                theme={homePage ? "light" : "dark"} // 根据页面切换主题
                mode="horizontal"
                items={menuItems}
                selectedKeys={[selectedKey]}
                style={menuStyle}
            />
            <div style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                minWidth: '320px',
                justifyContent: 'flex-end'
            }}>
                {/* 添加数据分析按钮 */}
                <Link to="https://lame-stiff-meat.anvil.app/" rel="noopener noreferrer" target="_blank" style={{ marginRight: 16 }}>
                    <Button type="text" style={{ color: homePage ? '#000000' : 'white' }}>
                        数据分析
                    </Button>
                </Link>
                <Button
                    type="text"
                    style={{ color: homePage ? '#000000' : 'white' }} // 根据页面切换按钮颜色
                    onClick={handleLanguageChange}
                >
                    {i18n.language === 'en' ? '中文' : 'English'}
                </Button>
            </div>
        </div>
    );
};

export default RootMenu;
