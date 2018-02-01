/*!
 * Vendor
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'antd';

/*!
 * Components
 */

import Dashboard from './../components/layout';
import Profile from './../components/home/profile';

/*!
 * Expo
 */

const Home = ({ auth }) => (
  <Dashboard title="Главная">
     <header style={{ marginBottom: 20, padding: '10px 20px', background: '#ffffff' }}>
      <h1 style={{ margin: 0 }}>Главная</h1>
    </header>
    <div>
      <Row gutter={16}>
        <Col span={5}>
          <Profile user={auth.user} />
        </Col>
        <Col span={10}>
          <Card title="активные курсы" className="dashboard-card">
            {
              !!auth.user.courses.length
              ? <Row gutter={8}>
                  {auth.user.courses.map(({ _id, name, content, thumb, price, duration }) => (
                    <Col key={_id} span={12}>
                      <Link to={`/courses/${_id}`}>
                        <Card title={name} className="uc-course-card">
                          <img
                            src={thumb}
                            alt="го и чс"
                            className="uc-img-response"
                          />
                        </Card>
                      </Link>
                    </Col>
                  )}
                </Row>
              : <p className="label-empty-data">Активных курсов нет</p>
            }
          </Card>
        </Col>
        <Col span={9}>
          <Card title="завершенные курсы" className="dashboard-card">
            <p className="label-empty-data">Завершенных курсов нет</p>
          </Card>
        </Col>
      </Row>
    </div>
  </Dashboard>
);

const mapDispatchToProps = ({ auth }) => ({ auth });

export default connect(
  mapDispatchToProps,
)(Home);
