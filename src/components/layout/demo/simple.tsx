import React from 'react';
import Layout from '../index';

const { Header, Content, Footer } = Layout;

const SimpleLayoutDemo: React.FC = () => {
    return (
        <div style={{ height: '100vh', background: '#f5f5f5' }}>
            <Layout direction="vertical">
                <Header
                    style={{
                        background: '#fff',
                        padding: '0 16px',
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    顶部区域
                </Header>

                <Content
                    style={{
                        margin: 16,
                        padding: 16,
                        background: '#fff',
                        borderRadius: 4,
                        minHeight: 280,
                    }}
                >
                    内容区域
                </Content>

                <Footer
                    style={{
                        textAlign: 'center',
                        background: '#fff',
                        borderTop: '1px solid #f0f0f0',
                    }}
                >
                    底部区域
                </Footer>
            </Layout>
        </div>
    );
};

export default SimpleLayoutDemo;
