import {Typography, Button, Space} from 'antd';
import { useTranslation } from 'react-i18next';
import backgroundImage from '../../components/pic/pic-1.jpg';
import pic2 from '../../components/pic/pic-2.png';
import pic3 from '../../components/pic/pic-3.png';
import pic4 from '../../components/pic/pic-4.png';
import popular01 from '../../components/pic/popular-01.png';
import popular02 from '../../components/pic/popular-02.png';
import popular03 from '../../components/pic/popular-03.png';
import popular04 from '../../components/pic/popular-04.png';
import './index.css';
import {useEffect} from "react";

const { Text, Link } = Typography;

const HomePage = () => {


    // 自动滚动的卡片
    const autoScrollCards = () => {
        const scrollContainer = document.getElementById('scroll-container');
        if (scrollContainer) {
            let scrollAmount = 0;
            const scrollStep = 2;
            const scrollMax = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            let scrollInterval; // 声明变量但不立即赋值

            const startScrolling = () => {
                scrollInterval = setInterval(() => {
                    scrollAmount += scrollStep;
                    if (scrollAmount >= scrollMax) {
                        scrollAmount = 0;
                    }
                    scrollContainer.scrollLeft = scrollAmount;
                }, 30);
            };

            startScrolling();

            // 鼠标悬停时暂停滚动
            scrollContainer.addEventListener('mouseenter', () => {
                clearInterval(scrollInterval);
            });

            // 鼠标离开时恢复滚动
            scrollContainer.addEventListener('mouseleave', () => {
                startScrolling();
            });
        }
    };

    // 页面加载完成后启动自动滚动
    useEffect(() => {
        autoScrollCards();
    }, []);

    const { t } = useTranslation();

    return (
        <div style={{ width: '100%' }}>
            {/* 第一部分：主标题区域 */}
            <div style={{
                position: 'relative',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between' // 上下分布空间
            }}>
                {/* 半透明遮罩层 */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 0
                }} />

                {/* 顶部主标题 */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '20px',
                    textAlign: 'center',
                    marginTop: '25vh' // 距离顶部15%视口高度
                }}>
                    <Text
                        italic={true}
                        style={{
                            color: 'white',
                            fontSize: '4rem',
                            fontWeight: 500,
                            fontFamily: '"Microsoft YaHei", "微软雅黑", sans-serif',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                            display: 'block',
                            marginBottom: '32px'
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
                            marginBottom: '10px',
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}
                        dangerouslySetInnerHTML={{ __html: t('home.mainDescription') }}
                    />

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
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(5px)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                                }}
                            >
                                {t('home.getStarted')}
                            </Button>
                        </Link>
                    </Space>
                </div>
            </div>

            {/* 第二部分：介绍区域 */}
            <div style={{
                padding: '60px 20px',
                backgroundColor: '#F5F7FA', // 背景颜色
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 600,
                        color: '#333',
                        background: 'linear-gradient(90deg, #C2A756, #B69B4A)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        margin: '0'
                    }}>
                        立足于抖音"短视频&直播"生态<br />数据驱动电商增长
                    </h1>
                </div>

                {/* 三张卡片区域 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around', // 横向平均分布
                    flexWrap: 'wrap',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* 卡片 1 */}
                    <div className="home-card" style={{
                        width: '350px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}>
                        <img
                            src={pic2}
                            alt="电商运营"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* 卡片 2 */}
                    <div className="home-card" style={{
                        width: '350px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}>
                        <img
                            src={pic3}
                            alt="达人投放"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* 卡片 3 */}
                    <div className="home-card" style={{
                        width: '350px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}>
                        <img
                            src={pic4}
                            alt="品牌自营"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* 第三部分：左右布局，左边文本右边自动滑动卡片 */}
            <div style={{
                padding: '60px 20px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // 深色半透明背景
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* 左边文本内容 */}
                <div style={{
                    width: '30%',
                    padding: '40px',
                    color: 'white',
                    zIndex: 2
                }}>
                    <div style={{
                        display: 'inline-block',
                        backgroundColor: '#4CD964',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        marginRight: '10px'
                    }}>
                        选爆款
                    </div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 600,
                        margin: '20px 0',
                        lineHeight: 1.4
                    }}>
                        预见流量爆款<br />市场快人一步
                    </h2>
                </div>

                {/* 右边自动滑动卡片 */}
                <div id="scroll-container" style={{
                    width: '70%',
                    overflowX: 'auto',
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    scrollBehavior: 'smooth',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* 卡片 1 */}
                    <div style={{
                        width: '300px',
                        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding: '20px',
                        flexShrink: 0
                    }}>
                        <img
                            src={popular01}
                            alt="热门榜单"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* 卡片 2 */}
                    <div style={{
                        width: '300px',
                        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding: '20px',
                        flexShrink: 0
                    }}>
                        <img
                            src={popular02}
                            alt="高转化流量词"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* 卡片 3 */}
                    <div style={{
                        width: '300px',
                        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding: '20px',
                        flexShrink: 0
                    }}>
                        <img
                            src={popular03}
                            alt="细分渠道销量"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* 卡片 4 */}
                    <div style={{
                        width: '300px',
                        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding: '20px',
                        flexShrink: 0
                    }}>
                        <img
                            src={popular04}
                            alt="细分渠道销量"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>

                {/* 左右渐变遮罩 */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '40px',
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    pointerEvents: 'none'
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '40px',
                    background: 'linear-gradient(270deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    pointerEvents: 'none'
                }}></div>
            </div>
        </div>
    );
};

export default HomePage;