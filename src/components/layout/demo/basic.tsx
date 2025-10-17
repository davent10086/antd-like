import React from 'react';
import Layout from '../index';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Layout hasSider>
        <Sider 
          collapsible 
          width={200} 
          style={{ 
            background: '#fff', 
            borderRight: '1px solid #f0f0f0' 
          }}
        >
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <span>侧边栏</span>
          </div>
        </Sider>
        
        <Layout>
          <Header style={{ 
            background: '#fff', 
            padding: '0 16px',
            borderBottom: '1px solid #f0f0f0' 
          }}>
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              头部区域
            </div>
          </Header>
          
          <Content style={{ 
            margin: '16px', 
            padding: '16px', 
            background: '#fff',
            borderRadius: 4
          }}>
            <div style={{ 
              height: '100%',
              minHeight: 280 
            }}>
              内容区域
            </div>
          </Content>
          
          <Footer style={{ 
            textAlign: 'center', 
            background: '#fff',
            borderTop: '1px solid #f0f0f0' 
          }}>
            底部区域
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;