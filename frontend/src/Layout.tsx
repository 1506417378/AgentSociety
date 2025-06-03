import { Divider, Flex, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import RootMenu from "./Menu";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";

export default function RootLayout({
                                       children,
                                       selectedKey,
                                       homePage,
                                   }: {
    children: React.ReactNode
    selectedKey: string
    homePage?: boolean
}) {
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // 根据页面类型设置导航栏样式
    const headerStyle = homePage ? {
        background: '#FFFFFF',
        color: '#000000',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    } : {
        background: '#000088',
        color: 'white',
    }

    // 根据页面类型设置菜单样式
    const menuStyle = homePage ? {
        background: '#FFFFFF',
        color: '#000000',
    } : {
        background: '#000088',
        color: 'white',
    }

    // get the height of the header to set the content height
    useEffect(() => {
        if (contentRef.current === null) {
            return
        }
        if (headerRef.current) {
            const headerHeight = headerRef.current.clientHeight;
            if (contentRef.current) {
                contentRef.current.style.minHeight = `calc(100vh - ${headerHeight}px)`;
                return
            }
        }
        contentRef.current.style.minHeight = `90vh`;
    }, [headerRef, contentRef]);

    const contentStyle: React.CSSProperties = homePage ? {
        width: "100vw",
        top: 0,
        left: 0,
        alignContent: "center",
        justifyContent: "center",
    } : {
    }

    return (
        <Layout>
            <Header ref={headerRef} style={headerStyle}>
                <Flex gap='small' align='center' style={{ width: '100%' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        {/* 首页使用深色logo */}
                        <img
                            src={homePage ? "/logo_dark.png" : "/logo.png"}
                            alt="AgentSociety"
                            style={{ height: '24px', display: 'block' }}
                        />
                    </Link>
                    <Divider type="vertical" />
                    <div style={{ flex: 1 }}>
                        {/* 传递homePage属性给菜单组件 */}
                        <RootMenu
                            selectedKey={homePage ? "" : selectedKey}
                            style={menuStyle}
                            homePage={homePage}
                        />
                    </div>
                </Flex>
            </Header>
            <Content ref={contentRef} style={contentStyle}>
                {children}
            </Content>
        </Layout>
    )
}