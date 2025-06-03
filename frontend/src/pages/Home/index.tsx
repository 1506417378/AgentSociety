import { Typography, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const {Text, Link } = Typography;


const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Text
                italic={true}
                style={{
                    color: 'white',
                    fontSize: '4rem',
                    fontWeight: 500,
                    fontFamily: '"Microsoft YaHei", "微软雅黑", sans-serif',
                }}
            >
                AgentSociety-抖音流量分析平台
            </Text>

            <div
                style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    lineHeight: 1.8,
                    display: 'block',
                    marginBottom: '64px',
                }}
                dangerouslySetInnerHTML={{ __html: t('home.mainDescription') }}
            />

            {/* 按钮组 */}
            <Space size="large">
                <Link href="/console">
                    <Button
                        type="default"
                        size="large"
                        style={{
                            height: '56px',
                            padding: '0 40px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            borderRadius: '32px',
                            color: 'white',
                            borderColor: 'white',
                            border: '2px solid white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {t('home.getStarted')}
                    </Button>
                </Link>

                {/*<Link href="https://github.com/tsinghua-fib-lab/agentsociety" target="_blank">*/}
                {/*    <Button*/}
                {/*        icon={<GithubOutlined />}*/}
                {/*        size="large"*/}
                {/*        style={{*/}
                {/*            height: '56px',*/}
                {/*            padding: '0 32px',*/}
                {/*            fontSize: '16px',*/}
                {/*            borderRadius: '32px',*/}
                {/*            background: 'rgba(255, 255, 255, 0.1)',*/}
                {/*            borderColor: 'transparent',*/}
                {/*            color: 'white'*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {stars > 0 ? `${stars.toLocaleString()} ${t('home.stars')}` : 'GitHub'}*/}
                {/*    </Button>*/}
                {/*</Link>*/}
            </Space>
        </div >
    );
};

export default HomePage;
