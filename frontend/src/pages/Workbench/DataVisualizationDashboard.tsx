import React, { useEffect, useRef } from 'react';
import { Card, Row, Col, Typography, Statistic, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import pic1 from './components/logo-1.jpg';
import './DataVisualizationDashboard.css';


const { Title, Text } = Typography;

interface ProductData {
    key: string;
    product: string;
    time: string;
    sales: string;
    revenue: string;
}

const genderAgeOption = {
    title: {
        left: 'left',
        textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#333'
        }
    },
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '20%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: '{b}: {c}%'
    },
    xAxis: {
        type: 'category',
        data: ['18-23', '24-30', '31-40', '41-50', '50+'],
        axisTick: { alignWithLabel: true },
        axisLabel: {
            color: '#555',
            fontSize: 12
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}%',
            color: '#555'
        },
        splitLine: {
            show: false
        }
    },
    series: [
        {
            name: '年龄分布',
            type: 'bar',
            data: [0, 10, 35.14, 30, 24.86],
            barWidth: '30%',
            itemStyle: {
                color: '#facc15',
                borderRadius: [4, 4, 0, 0]
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                fontSize: 10,
                color: '#333',
                backgroundColor: '#eee',
                padding: [2, 4],
                borderRadius: 4
            }
        }
    ]
};

const DataVisualizationDashboard: React.FC = () => {
    const chartRef = useRef(null);
    const peopleChartRef = useRef(null);
    const interactionChartRef = useRef(null);

    useEffect(() => {
        // 初始化图表
        initCharts();
    }, []);

    const initCharts = () => {
        // 销售趋势图
        if (chartRef.current) {
            const salesChart = chartRef.current.getEchartsInstance();
            salesChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    },
                },
                legend: {
                    data: ['销售额', '订单数', '客单价'],
                    textStyle: {
                        color: '#333',
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            },
                        },
                        axisLabel: {
                            color: '#666',
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            },
                        },
                        axisLabel: {
                            color: '#666',
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eee',
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '销售额',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0,
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(58, 122, 255, 0.8)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(58, 122, 255, 0.1)',
                                },
                            ]),
                        },
                        emphasis: {
                            focus: 'series',
                        },
                        data: [200, 320, 500, 720, 900, 1000],
                    },
                    {
                        name: '订单数',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0,
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(255, 100, 100, 0.8)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255, 100, 100, 0.1)',
                                },
                            ]),
                        },
                        emphasis: {
                            focus: 'series',
                        },
                        data: [150, 210, 300, 420, 500, 600],
                    },
                    {
                        name: '客单价',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0,
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(100, 255, 100, 0.8)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(100, 255, 100, 0.1)',
                                },
                            ]),
                        },
                        emphasis: {
                            focus: 'series',
                        },
                        data: [50, 60, 70, 80, 90, 100],
                    },
                ],
            });
        }

        // 人数趋势图
        if (peopleChartRef.current) {
            const orderChart = peopleChartRef.current.getEchartsInstance();
            orderChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        // 每分钟一个节点，共60个节点（1小时）
                        data: Array.from({ length: 60 }, (_, i) => `09:${i < 10 ? '0' + i : i}`),
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            },
                        },
                        axisLabel: {
                            color: '#666',
                            // 仅显示部分标签，避免拥挤
                            interval: 5,
                            formatter: (value) => value.replace('09:', '')
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 50000,
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            },
                        },
                        axisLabel: {
                            color: '#666',
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eee',
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '人数',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            width: 2,
                            color: '#5470c6',
                        },
                        symbol: 'circle',
                        symbolSize: 6,
                        // 生成0-50000之间的随机数据，并添加一些峰值
                        data: Array.from({ length: 60 }, (_, i) => {
                            // 添加一些随机波动
                            const baseValue = Math.random() * 35000;
                            // 添加一些峰值
                            if (i % 10 === 0) {
                                return baseValue + Math.random() * 45000;
                            }
                            // 添加一些次级峰值
                            if (i % 5 === 0) {
                                return baseValue + Math.random() * 40000;
                            }
                            return baseValue;
                        }),
                    },
                ],
            });
        }

        // 互动趋势图
        if (interactionChartRef.current) {
            const interactionChart = interactionChartRef.current.getEchartsInstance();
            interactionChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        // 横坐标每隔15分钟显示一次，从09:00开始
                        data: [
                            '09:00', '09:15', '09:30', '09:45',
                            '10:00', '10:15', '10:30', '10:45',
                            '11:00', '11:15', '11:30', '11:45',
                            '12:00',
                        ],
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            },
                        },
                        axisLabel: {
                            color: '#666',
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 87000, // 设置最大值为8.7万
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            },
                        },
                        axisLabel: {
                            color: '#666',
                            formatter: function (value) {
                                return value / 10000 + 'w'; // 将数值转换为以万为单位
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eee',
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '互动数',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            width: 2,
                            color: '#ee6666',
                        },
                        symbol: 'circle',
                        symbolSize: 6,
                        data: [
                            0,  // 09:00
                            5000, // 09:15 增长较慢
                            12000, // 09:30 增长较快
                            20000, // 09:45 增长较快
                            30000, // 10:00 增长较慢
                            45000, // 10:15 增长较快
                            55000, // 10:30 增长较慢
                            65000, // 10:45 增长较快
                            70000, // 11:00 增长较慢
                            75000, // 11:15 增长较慢
                            80000, // 11:30 增长较快
                            85000, // 11:45 增长较快
                            87000, // 12:00 增长较慢，达到8.7万
                        ],
                    },
                ],
            });
        }
    };

    const columns = [
        {
            title: '顺序',
            dataIndex: 'key',
            key: 'key',
            width: 60,
            render: (text: string) => <Text strong className="rank-text">{text}</Text>,
        },
        {
            title: '商品',
            dataIndex: 'product',
            key: 'product',
            render: (_, record: ProductData) => (
                <div className="product-info">
                    <Text ellipsis className="product-name">{record.product}</Text>
                </div>
            ),
        },
        {
            title: '上架时间',
            dataIndex: 'time',
            key: 'time',
            width: 120,
            render: (text: string) => <Text className="time-text">{text}</Text>,
        },
        {
            title: '直播销售量',
            dataIndex: 'sales',
            key: 'sales',
            width: 120,
            render: (text: string) => <Text className="sales-text">{text}</Text>,
        },
        {
            title: '直播销售额',
            dataIndex: 'revenue',
            key: 'revenue',
            width: 120,
            render: (text: string) => <Text className="revenue-text">{text}</Text>,
        },
    ];

    const productData: ProductData[] = [
        {
            key: '1',
            product: '美白精华液套装系列护肤保湿套装乳液',
            time: '06/05 09:44',
            sales: '10000-25000w',
            revenue: '2.5w-5w',
        },
        {
            key: '2',
            product: '美白精华小样套装保湿补水护肤保湿套装',
            time: '06/05 09:04',
            sales: '25w-50w',
            revenue: '1000-2500w',
        },
        {
            key: '3',
            product: '500ml大容量保温杯时尚保温水杯双层不锈钢杯',
            time: '06/05 09:20',
            sales: '5w-7.5w',
            revenue: '5000-7500w',
        },
        {
            key: '4',
            product: 'HBNO 果酸焕颜精华水光针精华液精华水提亮肤色',
            time: '06/05 09:04',
            sales: '2.5w-5w',
            revenue: '100-250w',
        },
        {
            key: '5',
            product: '花西子空气蜜粉定妆粉持久防水防汗控油不脱妆',
            time: '06/05 09:04',
            sales: '1w-2.5w',
            revenue: '100-250w',
        },
        {
            key: '6',
            product: '[限量版] P20极光光效自拍灯美颜一体自拍美颜灯',
            time: '06/05 09:10',
            sales: '1w-2.5w',
            revenue: '0-50w',
        },
    ];

    return (
        <div className="dashboard-container">
            <Row gutter={[16, 16]}>
                {/* Left Column */}
                <Col xs={24} sm={24} md={24} lg={24} xl={6} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Left Upper Card */}
                    <Card className="left-card" style={{height:'180px'}}>
                        <div className="left-card-content">
                            <div className="card-header">
                                <div className="card-title" >
                                    <img src={pic1} alt="Streamer Avatar" className="avatar-image" />
                                    <div>
                                        <Title level={5} className="streamer-name">与辉同行</Title>
                                        <Text type="secondary" className="follower-count">2929.1w 粉丝</Text>
                                    </div>
                                </div>
                            </div>
                            <div className="broadcast-status">
                                <Text type="secondary" className="status-text">已下播</Text>
                                <Text className="broadcast-duration">直播时长 6h10m35s</Text>
                                <Text className="broadcast-start-time">开播时间 06/05 17:59</Text>
                            </div>
                        </div>
                    </Card>


                    {/* Left Middle Card */}
                    <Card className="left-card" style={{height:'240px'}}>
                        <div className="left-card-content">
                            <div className="card-subtitle">观众画像</div>
                            <div className="gender-bar-container">
                                <div className="gender-bar">
                                    <div className="gender-male" style={{width: '17.67%'}}></div>
                                    <div className="gender-female" style={{width: '82.33%'}}></div>
                                </div>
                                <div className="gender-labels">
                                    <span className="gender-label male">男性 17.67%</span>
                                    <span className="gender-label female">女性 82.33%</span>
                                </div>
                            </div>
                            {/* 年龄分布 ECharts */}
                            <ReactECharts
                                option={genderAgeOption}
                                style={{ height: '120px', width: '100%' }}
                            />
                        </div>
                    </Card>

                    {/* Left Lower Card */}
                    <Card className="left-card" style={{height:'212px'}}>
                        <div className="left-card-content">
                            <div className="card-subtitle">销售数据</div>
                            <div className="sales-chart">
                                <ReactECharts
                                    ref={chartRef}
                                    style={{height: '100%'}}
                                    option={{}}
                                />
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Middle Column */}
                <Col xs={24} sm={24} md={24} lg={24} xl={12}
                     style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    {/* Middle Upper Card */}
                    <Card className="middle-card" style={{ height: '65%',padding:'0px' }}>
                        <div className="middle-card-content">
                            <div className="gmv-banner">
                                <Title className="gmv-amount" style={{fontWeight:'bolder',color:'whitesmoke',textAlign:'center',fontSize:'45px'}}>¥ 1000w-2500w</Title>
                                <div className="stats-row">
                                    <div className="stat-item">
                                        <Text type="secondary" className="stat-label">销量</Text>
                                        <Title className="stat-value" style={{fontWeight:'bolder',color:'whitesmoke',textAlign:'center',fontSize:'20px'}}>10w-25w</Title>
                                    </div>
                                    <div className="stat-item">
                                        <Text type="secondary" className="stat-label">观看人次</Text>
                                        <Title level={5} className="stat-value" style={{fontWeight:'bolder',color:'whitesmoke',textAlign:'center',fontSize:'20px'}}>6,186,142</Title>
                                    </div>
                                    <div className="stat-item">
                                        <Text type="secondary" className="stat-label">平均停留</Text>
                                        <Title level={5} className="stat-value" style={{fontWeight:'bolder',color:'whitesmoke',textAlign:'center',fontSize:'20px'}}>2m46s</Title>
                                    </div>
                                </div>
                                <div className="stats-row">
                                    <div className="stat-item">
                                        <Text type="secondary" className="stat-label">UV价值</Text>
                                        <Title className="stat-text" style={{fontWeight:'bolder',color:'whitesmoke',textAlign:'center',fontSize:'20px'}}>0-10</Title>
                                    </div>
                                    <div className="stat-item">
                                        <Text type="secondary" className="stat-label">直播间销售均价</Text>
                                        <Title className="stat-text" style={{fontWeight:'bolder',color:'whitesmoke',textAlign:'center',fontSize:'20px'}}>50-100</Title>
                                    </div>
                                    <div className="stat-item">
                                        <Text type="secondary" className="stat-label">销售转化率</Text>
                                        <Title className="stat-text" style={{fontWeight:'bolder',color:'whitesmoke',textAlign:'center',fontSize:'20px'}}>0-5%</Title>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Middle Lower Card */}
                    <Card className="middle-card" style={{ height: '35%' }}>
                        <div className="middle-card-content">
                            <div className="card-header">
                                <Text className="card-subtitle">商品排行 (206件)</Text>
                                <div className="search-container">
                                    <Input.Search
                                        placeholder="请输入商品关键词"
                                        enterButton
                                        className="search-input"
                                        suffix={<SearchOutlined />}
                                    />
                                </div>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={productData}
                                pagination={false}
                                size="small"
                                rowKey="key"
                                scroll={{ y: 200 }}
                                className="product-table"
                            />
                        </div>
                    </Card>
                </Col>

                {/* Right Column */}
                <Col xs={24} sm={24} md={24} lg={24} xl={6} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Right Upper Card */}
                    <Card className="right-card" style={{height:'324px'}}>
                        <div className="right-card-content">
                            <div className="card-subtitle">实时数据</div>
                            <div className="realtime-stats">
                                <div className="stat-item">
                                    <Text type="secondary" className="stat-label">在线人数</Text>
                                    <Statistic value={1300} className="stat-value" />
                                </div>
                                <div className="stat-item">
                                    <Text type="secondary" className="stat-label">进场人次</Text>
                                    <Statistic value={4170} className="stat-value" />
                                </div>
                                <div className="stat-item">
                                    <Text type="secondary" className="stat-label">平均在线</Text>
                                    <Statistic value={4.8} suffix="w" className="stat-value" />
                                </div>
                                <div className="stat-item">
                                    <Text type="secondary" className="stat-label">分钟流量获取</Text>
                                    <Statistic value={1.7} suffix="w" className="stat-value" />
                                </div>
                            </div>
                            <div className="realtime-chart">
                                <ReactECharts
                                    ref={peopleChartRef}
                                    style={{ height: '180px' }}
                                    option={{}}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Right Lower Card */}
                    <Card className="right-card" style={{height:'324px'}}>
                        <div className="right-card-content">
                            <div className="card-subtitle">互动数据</div>
                            <div className="interaction-stats">
                                <div className="stat-item">
                                    <Text type="secondary" className="stat-label">弹幕总数</Text>
                                    <Statistic value={8.7} suffix="w" className="stat-value" />
                                </div>
                                <div className="stat-item">
                                    <Text type="secondary" className="stat-label">弹幕人数</Text>
                                    <Statistic value={2.5} suffix="w" className="stat-value" />
                                </div>
                                <div className="stat-item">
                                    <Text type="secondary" className="stat-label">互动率</Text>
                                    <Statistic value={0.4} suffix="%" className="stat-value" />
                                </div>
                            </div>
                            <div className="interaction-chart-placeholder">
                                <ReactECharts
                                    ref={interactionChartRef}
                                    style={{ height: '180px' }}
                                    option={{}}
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DataVisualizationDashboard;