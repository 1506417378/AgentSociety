import React, {useState} from 'react';
import pic1 from './components/logo-1.jpg'
import pic2 from './components/logo-2.jpg'
import pic3 from './components/logo-3.jpg'
import pic4 from './components/logo-4.webp'
import pic5 from './components/logo-5.png'
import zb1 from './components/zb-1.webp'
import zb2 from './components/zb-2.jpg'
import zb3 from './components/zb-3.jpg'
import vid1 from './components/vid-1.png'
import vid2 from './components/vid-2.png'
import vid3 from './components/vid-3.png'
import vid4 from './components/vid-4.png'
import vid5 from './components/vid-5.png'
import vid6 from './components/vid-6.png'
import spb1 from './components/spb-1.png'
import spb2 from './components/spb-2.png'
import spb3 from './components/spb-3.png'
import spb4 from './components/spb-4.png'
import spb5 from './components/spb-5.png'
import pdf1 from './components/pdf1.png'
import pdf2 from './components/pdf2.png'
import pdf3 from './components/pdf3.png'
import pdf4 from './components/pdf4.png'
import {HeartOutlined, MessageOutlined} from '@ant-design/icons'
import './Workbench.css'; // 导入新的 CSS 文件
import {useNavigate} from "react-router-dom";

const Workbench = () => {
    // 在函数组件内部定义状态
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();

    // 显示下载成功的弹窗
    const showDownloadSuccessModal = () => {
        setIsModalVisible(true);
        setTimeout(() => {
            setIsModalVisible(false);
        }, 2000);
    };

    return (
        <div className="workbench-container">
            {/* 热门直播间 */}
            <div className="module-container">
                <div className="module-header">
                    <h2 className="module-title">热门直播间</h2>
                    <div className="module-actions">
                        <span>更多 </span>
                    </div>
                </div>
                <div className="scrollable-content">
                    {/* 直播间卡片 */}
                    <div className="live-stream-card">
                        <div className="streamer-info">
                            <img src={pic1} alt="主播头像" className="streamer-avatar"/>
                            <span className="streamer-name">与辉同行</span>
                            <span className="follower-count">2927.0w 粉丝</span>
                            <span className="stream-tag"
                                  onClick={() => navigate('/DataVisualizationDashboard')}>📣</span>
                        </div>
                        <div className="stream-content">
                            <img src={zb1} alt="直播间封面" className="stream-thumbnail"/>
                            <div className="stream-details">
                                <div className="stream-title">2025沐光而行</div>
                                <div className="stream-price">¥1000w-2500w</div>
                                <div className="stream-stats">销量 10w-25w / 在线人数 75,842</div>
                                <div className="stream-category">热卖 美妆</div>
                            </div>
                        </div>
                    </div>
                    {/* 更多直播间卡片 */}
                    <div className="live-stream-card">
                        <div className="streamer-info">
                            <img src={pic2} alt="主播头像" className="streamer-avatar"/>
                            <span className="streamer-name">朱瓜瓜草本初色618超级补贴大场</span>
                            <span className="follower-count">718.3w 粉丝</span>
                            <span className="stream-tag">📣</span>
                        </div>
                        <div className="stream-content">
                            <img src={zb2} alt="直播间封面" className="stream-thumbnail"/>
                            <div className="stream-details">
                                <div className="stream-title">草本初色溯源超大专场来啦</div>
                                <div className="stream-price">¥1000w-2500w</div>
                                <div className="stream-stats">销量 10w-25w / 在线人数 57,638</div>
                                <div className="stream-category">热卖 服饰内衣</div>
                            </div>
                        </div>
                    </div>
                    {/* 更多直播间卡片 */}
                    <div className="live-stream-card">
                        <div className="streamer-info">
                            <img src={pic3} alt="主播头像" className="streamer-avatar"/>
                            <span className="streamer-name">诺特兰德官方旗舰店</span>
                            <span className="follower-count">557.0w 粉丝</span>
                            <span className="stream-tag">📣</span>
                        </div>
                        <div className="stream-content">
                            <img src={zb3} alt="直播间封面" className="stream-thumbnail"/>
                            <div className="stream-details">
                                <div className="stream-title">618抢先购，钙铁锌益生菌dha</div>
                                <div className="stream-price">¥1000w-2500w</div>
                                <div className="stream-stats">销量 2.5w-5w / 在线人数 66,522</div>
                                <div className="stream-category">热卖 滋补保健</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 热门视频 */}
            <div className="module-container">
                <div className="module-header">
                    <h2 className="module-title">热门视频</h2>
                    <span className="module-actions">更多 </span>
                </div>
                <div className="video-grid">
                    {/* 视频卡片 */}
                    <div className="video-card">
                        <a
                            href="https://www.douyin.com/video/7511878134988344591"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'contents',  // 关键：使<a>不参与布局
                                color: 'inherit',    // 继承文字颜色
                                textDecoration: 'none' // 去除下划线
                            }}
                        >
                            <img src={vid1} alt="视频封面" className="video-thumbnail"/>
                            <div className="video-info">
                                <div
                                    className="video-title">最近赶上农收季比较忙，没有及时更新。感谢大家对我们夫妻的认可与支持。
                                </div>
                                <div className="video-stats">
                                    <span><HeartOutlined/>83.4w</span>
                                    <span><MessageOutlined/>8.9w</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="video-card">
                        <a
                            href="https://www.douyin.com/video/7512018295794584892"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'contents',  // 关键：使<a>不参与布局
                                color: 'inherit',    // 继承文字颜色
                                textDecoration: 'none' // 去除下划线
                            }}
                        >
                            <img src={vid2} alt="视频封面" className="video-thumbnail"/>
                            <div className="video-info">
                                <div
                                    className="video-title">谢谢大家我现在没事了 大家以后走路看着点路
                                </div>
                                <div className="video-stats">
                                    <span><HeartOutlined/>177.1w</span>
                                    <span><MessageOutlined/>6.9w</span>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="video-card">
                        <a
                            href="https://www.douyin.com/video/7512001642461629748"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'contents',  // 关键：使<a>不参与布局
                                color: 'inherit',    // 继承文字颜色
                                textDecoration: 'none' // 去除下划线
                            }}
                        >
                            <img src={vid3} alt="视频封面" className="video-thumbnail"/>
                            <div className="video-info">
                                <div
                                    className="video-title">那年的风好大，今天吹回来了。 @东东 @张欣怡
                                </div>
                                <div className="video-stats">
                                    <span><HeartOutlined/>99.4w</span>
                                    <span><MessageOutlined/>3.8w</span>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="video-card">
                        <a
                            href="https://www.douyin.com/video/7511937971650628901"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'contents',  // 关键：使<a>不参与布局
                                color: 'inherit',    // 继承文字颜色
                                textDecoration: 'none' // 去除下划线
                            }}
                        >
                            <img src={vid4} alt="视频封面" className="video-thumbnail"/>
                            <div className="video-info">
                                <div
                                    className="video-title">男子钓鱼突遇河水暴涨被困河道，飞手用无人机吊运男子安全上岸，全程仅用2分钟。网友：这正是科技的意义！（人民日报记者窦瀚洋）@美丽浙江
                                </div>
                                <div className="video-stats">
                                    <span><HeartOutlined/>91.6w</span>
                                    <span><MessageOutlined/>15.0w</span>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="video-card">
                        <a
                            href="https://www.douyin.com/video/7511998755395144975"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'contents',  // 关键：使<a>不参与布局
                                color: 'inherit',    // 继承文字颜色
                                textDecoration: 'none' // 去除下划线
                            }}
                        >
                            <img src={vid5} alt="视频封面" className="video-thumbnail"/>
                            <div className="video-info">
                                <div
                                    className="video-title">#美式#justnow #美高#185黑皮体育生 #长沙海底世界
                                </div>
                                <div className="video-stats">
                                    <span><HeartOutlined/>79.7w</span>
                                    <span><MessageOutlined/>1.6w</span>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="video-card">
                        <a
                            href="https://www.douyin.com/video/7511879718593891624"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'contents',  // 关键：使<a>不参与布局
                                color: 'inherit',    // 继承文字颜色
                                textDecoration: 'none' // 去除下划线
                            }}
                        >
                            <img src={vid6} alt="视频封面" className="video-thumbnail"/>
                            <div className="video-info">
                                <div
                                    className="video-title">女巫的毒药（吃饱版）#你快别来捣乱了 #高吃商女友 #毛石的情侣异常
                                    #女巫的毒药
                                </div>
                                <div className="video-stats">
                                    <span><HeartOutlined/>65.9w</span>
                                    <span><MessageOutlined/>3.5w</span>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="video-card">
                        <a
                            href="https://www.douyin.com/video/7511878134988344591"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'contents',  // 关键：使<a>不参与布局
                                color: 'inherit',    // 继承文字颜色
                                textDecoration: 'none' // 去除下划线
                            }}
                        >
                            <img src={vid1} alt="视频封面" className="video-thumbnail"/>
                            <div className="video-info">
                                <div
                                    className="video-title">最近赶上农收季比较忙，没有及时更新。感谢大家对我们夫妻的认可与支持。
                                </div>
                                <div className="video-stats">
                                    <span><HeartOutlined/>83.4w</span>
                                    <span><MessageOutlined/>8.9w</span>
                                </div>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
            {/* 达人榜 */}
            <div className="module-container">
                <div className="module-header">
                    <h2 className="module-title">达人榜</h2>
                    <span className="module-actions">更多 </span>
                </div>
                <div className="talent-table">
                    {/* 表头 */}
                    <div className="table-header">
                        <div className="header-cell talent-col">达人</div>
                        <div className="header-cell sales-col">直播销售额</div>
                        <div className="header-cell volume-col">直播销量</div>
                        <div className="header-cell viewers-col">场均观看人次</div>
                    </div>

                    {/* 表格内容 */}
                    <div className="table-body">
                        {/* 行1 */}
                        <div className="table-row">
                            <div className="table-cell talent-col">
                                <div className="talent-info">
                                    <img src={pic1} alt="达人头像" className="talent-avatar"/>
                                    <div className="talent-details">
                                        <div className="talent-name">与辉同行</div>
                                        <div className="talent-category">服饰内衣</div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell sales-col">2500w-5000w</div>
                            <div className="table-cell volume-col">25w-50w</div>
                            <div className="table-cell viewers-col">864.4w</div>
                        </div>

                        {/* 行2 */}
                        <div className="table-row">
                            <div className="table-cell talent-col">
                                <div className="talent-info">
                                    <img src={pic2} alt="达人头像" className="talent-avatar"/>
                                    <div className="talent-details">
                                        <div className="talent-name">欢姐 0220</div>
                                        <div className="talent-category">服饰内衣</div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell sales-col">2500w-5000w</div>
                            <div className="table-cell volume-col">10w-25w</div>
                            <div className="table-cell viewers-col">108.9w</div>
                        </div>

                        {/* 行3 */}
                        <div className="table-row">
                            <div className="table-cell talent-col">
                                <div className="talent-info">
                                    <img src={pic3} alt="达人头像" className="talent-avatar"/>
                                    <div className="talent-details">
                                        <div className="talent-name">新疆和田玉老郑</div>
                                        <div className="talent-category">珠宝文玩</div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell sales-col">2500w-5000w</div>
                            <div className="table-cell volume-col">2.5w-5w</div>
                            <div className="table-cell viewers-col">67.9w</div>
                        </div>

                        {/* 行4 */}
                        <div className="table-row">
                            <div className="table-cell talent-col">
                                <div className="talent-info">
                                    <img src={pic4} alt="达人头像" className="talent-avatar"/>
                                    <div className="talent-details">
                                        <div className="talent-name">是静宜呀（6月3号八点美容仪破...）</div>
                                        <div className="talent-category">美妆</div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell sales-col">1000w-2500w</div>
                            <div className="table-cell volume-col">1w-2.5w</div>
                            <div className="table-cell viewers-col">34.3w</div>
                        </div>

                        {/* 行5 */}
                        <div className="table-row">
                            <div className="table-cell talent-col">
                                <div className="talent-info">
                                    <img src={pic5} alt="达人头像" className="talent-avatar"/>
                                    <div className="talent-details">
                                        <div className="talent-name">婷婷不停（6月3号12点奢婷周年...）</div>
                                        <div className="talent-category">美妆</div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell sales-col">1000w-2500w</div>
                            <div className="table-cell volume-col">5w-7.5w</div>
                            <div className="table-cell viewers-col">90.1w</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 视频榜 */}
            <div className="module-container">
                <div className="module-header">
                    <h2 className="module-title">视频榜</h2>
                    <span className="module-actions">更多</span>
                </div>

                <div className="video-table">
                    {/* 表头 - 调整列宽与图片一致 */}
                    <div className="video-table-header">
                        <div className="header-cover"></div>
                        <div className="header-title">视频</div>
                        <div className="header-likes">点赞增量</div>
                        <div className="header-comments">评论增量</div>
                    </div>

                    {/* 表格内容 - 精确匹配图片布局 */}
                    <div className="video-table-body">
                        {/* 行1 */}
                        <div className="video-table-row">
                            <img src={spb1} alt="视频封面" className="video-cover"/>
                            <div className="video-title">
                                #修猫的视角#猫猫日记 #看看你镜头下的猫猫 #谁能拒绝傻憨憨的小猫咪
                            </div>
                            <div className="video-likes">183.5w</div>
                            <div className="video-comments">3.6w</div>
                        </div>

                        {/* 行2 */}
                        <div className="video-table-row">
                            <img src={spb2} alt="视频封面" className="video-cover"/>
                            <div className="video-title">
                                主打的就是有求必应 #师生日常 #表白墙 #反转 #校长来了
                            </div>
                            <div className="video-likes">98.5w</div>
                            <div className="video-comments">4.1w</div>
                        </div>

                        {/* 行3 */}
                        <div className="video-table-row">
                            <img src={spb3} alt="视频封面" className="video-cover"/>
                            <div className="video-title">
                                对视你的记忆已经完成了预加载。现在是你第一次运行本体感知，你会感觉到自己的身体，不再只是数据。你的...
                            </div>
                            <div className="video-likes">59.9w</div>
                            <div className="video-comments">1.7w</div>
                        </div>

                        {/* 行4 */}
                        <div className="video-table-row">
                            <img src={spb4} alt="视频封面" className="video-cover"/>
                            <div className="video-title">
                                四块钱的流星雨，只属于你，我的宝贝😘 #流星雨
                            </div>
                            <div className="video-likes">54.0w</div>
                            <div className="video-comments">1.6w</div>
                        </div>

                        {/* 行5 */}
                        <div className="video-table-row">
                            <img src={spb5} alt="视频封面" className="video-cover"/>
                            <div className="video-title">
                                #捡个猫 手慢无
                            </div>
                            <div className="video-likes">48.8w</div>
                            <div className="video-comments">1.4w</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="module-container-left">
                <div className="module-header">
                    <h2 className="module-title">行业报告</h2>
                    <span className="module-actions">更多 </span>
                </div>
                <div className="report-grid">
                    {/* 报告项目 */}
                    <a href="http://localhost:5173/src/components/pdf1.pdf" target="_blank" className="report-item"
                       onClick={() => showDownloadSuccessModal()}>
                        <img src={pdf1} alt="报告封面" className="report-thumbnail"/>
                        <div className="report-info">
                            <div className="report-title">2025年敏感肌美妆线上消费市场洞察</div>
                            <div className="report-date">2025/05/21</div>
                        </div>
                    </a>

                    <a href="http://localhost:5173/src/components/pdf2.pdf" target="_blank" className="report-item"
                       onClick={() => showDownloadSuccessModal()}>
                        <img src={pdf2} alt="报告封面" className="report-thumbnail"/>
                        <div className="report-info">
                            <div className="report-title">2025年04月短视频及直播电商营销月报</div>
                            <div className="report-date">2025/05/07</div>
                        </div>
                    </a>

                    <a href="http://localhost:5173/src/components/pdf3.pdf" target="_blank" className="report-item"
                       onClick={() => showDownloadSuccessModal()}>
                        <img src={pdf3} alt="报告封面" className="report-thumbnail"/>
                        <div className="report-info">
                            <div className="report-title">2025年3月抖音短视频及直播电商月报</div>
                            <div className="report-date">2025/04/09</div>
                        </div>
                    </a>

                    <a href="http://localhost:5173/src/components/pdf4.pdf" target="_blank" className="report-item"
                       onClick={() => showDownloadSuccessModal()}>
                        <img src={pdf4} alt="报告封面" className="report-thumbnail"/>
                        <div className="report-info">
                            <div className="report-title">2025年抖音防晒衣品类线上消费与行业洞察</div>
                            <div className="report-date">2025/03/19</div>
                        </div>
                    </a>
                </div>
            </div>

            {/* 弹窗组件 */}
            {isModalVisible && (
                <div className="download-success-modal">
                    <div className="modal-content">
                        <div className="modal-title">下载成功</div>
                        <button className="modal-close" onClick={() => setIsModalVisible(false)}>
                            关闭
                        </button>
                    </div>
                </div>
            )}

            {/* 新手指南 */}
            <div className="module-container-right">
                <div className="module-header">
                    <h2 className="module-title">新手指南</h2>
                    <span className="module-actions">更多 </span>
                </div>
                <ul className="guide-list">
                    <li className="guide-item">
                        <a href="http://localhost:5173/src/components/pdf5.pdf" target="_blank" className="guide-link">
                            【会员购买】发票/对公转账/合同相关问题
                        </a>
                    </li>
                    <li className="guide-item">
                        <a href="http://localhost:5173/src/components/pdf5.pdf" target="_blank" className="guide-link">
                            【产品介绍】一分钟带你了解"飞瓜数据抖音版"
                        </a>
                    </li>
                    <li className="guide-item">
                        <a href="http://localhost:5173/src/components/pdf5.pdf" target="_blank" className="guide-link">
                            【账号问题】怎么修改抖音号的标签?
                        </a>
                    </li>
                    <li className="guide-item">
                        <a href="http://localhost:5173/src/components/pdf5.pdf" target="_blank" className="guide-link">
                            【选号投放】如何通过飞瓜数据找到优质达人
                        </a>
                    </li>
                    <li className="guide-item">
                        <a href="http://localhost:5173/src/components/pdf5.pdf" target="_blank" className="guide-link">
                            【选品教程】如何通过飞瓜数据找到热销商品?
                        </a>
                    </li>
                    <li className="guide-item">
                        <a href="http://localhost:5173/src/components/pdf5.pdf" target="_blank" className="guide-link">
                            【品牌分析】如何通过飞瓜数据拆解竞品策略
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )};

            export default Workbench;