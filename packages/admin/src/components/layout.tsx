/*!
 * Vendor
 */

import * as React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';

/*!
 * Actions
 */

import { handleMenuSelectItem } from '../actions/menuActions';

/*!
 * Components
 */

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { IDashboardProps, IMenu } from '../interfaces';

const { Header, Content, Footer, Sider } = Layout;

declare const require: any;

/*!
 * Styles
 */

const styles = require('./style.css');

/*!
 * Expo
 */

const Dashboard = ({ menu, collapsed, handleCollapse, handleMenuSelectItem, children }: IDashboardProps) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider
      collapsible={true}
      collapsed={collapsed}
      onCollapse={handleCollapse}
      className={styles.sidebar}
    >
      <div className="profile">
        <figure className={styles.avatarContainer}>
          <img
            src={require('./../assets/img/whitecollar.svg')}
            className={styles.avatar}
          />
          <figcaption className={styles.caption}>
            Администратор
            <hr className={styles.devider} />
          </figcaption>
        </figure>
      </div>
      <Menu selectedKeys={menu.selected} mode="inline" onClick={handleMenuSelectItem}>
        {menu.data.map(({ _id, title, icon, href }) => (
          <Menu.Item key={_id} on>
            <Link to={href}>
              <Icon type={icon} />
              {title}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>главная</Breadcrumb.Item>
        </Breadcrumb>
        <div className="content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        УЦ "Автор" ©2017 разработанно <a href="http://troinof.ru/portfolio/author">troinof.ru</a>
      </Footer>
    </Layout>
  </Layout>
);

const mapDispatchToProps = ({ menu }: { menu: IMenu }) => ({ menu });

export default compose(
  connect(mapDispatchToProps, { handleMenuSelectItem }),
  withState('collapsed', 'handleCollapse', false),
)(Dashboard as any);
