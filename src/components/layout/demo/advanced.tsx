import React from 'react';
import Layout from '../index';

const { Header, Content, Footer, Sider } = Layout;

const AdvancedLayoutDemo: React.FC = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Layout hasSider>
        <Sider 
          collapsible
          collapsedWidth={80}
          width={200}
          style={{ 
            background: '#001529',
            borderRight: '1px solid #f0f0f0' 
          }}
        >
          <div style={{ 
            height: 64,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Logo
          </div>
          <div style={{ 
            height: 'calc(100% - 64px)', 
            color: 'rgba(255, 255, 255, 0.65)'
          }}>
            <div style={{ padding: '16px' }}>导航菜单1</div>
            <div style={{ padding: '16px' }}>导航菜单2</div>
            <div style={{ padding: '16px' }}>导航菜单3</div>
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
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>头部区域</div>
              <div>用户信息</div>
            </div>
          </Header>
          
          <Content style={{ 
            margin: '16px', 
            padding: '16px', 
            background: '#fff',
            borderRadius: 4,
            minHeight: 280
          }}>
            <h2>页面内容</h2>
            <p>这是页面的主要内容区域。</p>
            <p>可以放置各种页面元素，如表格、表单、卡片等。</p>
          </Content>
          
          <Footer style={{ 
            textAlign: 'center', 
            background: '#fff',
            borderTop: '1px solid #f0f0f0' 
          }}>
            Ant Design ©2023 Created by Ant Group
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdvancedLayoutDemo;