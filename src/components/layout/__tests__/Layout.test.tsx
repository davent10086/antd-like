import { render } from '@testing-library/react';
import Layout from '../index';

const { Header, Content, Footer, Sider } = Layout;

describe('Layout', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with sider', () => {
    const { container } = render(
      <Layout hasSider>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should apply vertical class when direction is vertical', () => {
    const { container } = render(
      <Layout direction="vertical">
        <Header>Header</Header>
        <Content>Content</Content>
      </Layout>
    );
    expect(container.querySelector('.ant-layout-vertical')).toBeInTheDocument();
  });

  it('should apply has-sider class when hasSider is true', () => {
    const { container } = render(
      <Layout hasSider>
        <Sider>Sider</Sider>
      </Layout>
    );
    expect(container.querySelector('.ant-layout-has-sider')).toBeInTheDocument();
  });

  it('should support custom className', () => {
    const { container } = render(
      <Layout className="custom-class">
        <Content>Content</Content>
      </Layout>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should support custom style', () => {
    const { container } = render(
      <Layout style={{ backgroundColor: 'red' }}>
        <Content>Content</Content>
      </Layout>
    );
    expect(container.firstChild).toHaveStyle('background-color: red');
  });
});