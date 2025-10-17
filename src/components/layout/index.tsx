import Layout from './src/Layout.tsx';
import Header from './src/Header.tsx';
import Content from './src/Content.tsx';
import Footer from './src/Footer.tsx';
import Sider from './src/Sider.tsx';

export type { LayoutProps } from './interface';
export type { HeaderProps } from './interface';
export type { ContentProps } from './interface';
export type { FooterProps } from './interface';
export type { SiderProps } from './interface';

type InternalLayout = typeof Layout & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Sider: typeof Sider;
};

const LayoutExport: InternalLayout = Layout as InternalLayout;
LayoutExport.Header = Header;
LayoutExport.Content = Content;
LayoutExport.Footer = Footer;
LayoutExport.Sider = Sider;

export default LayoutExport;