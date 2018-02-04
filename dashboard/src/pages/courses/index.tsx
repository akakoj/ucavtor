/*!
 * Vendor
 */

import * as React from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';

import { compose, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Modal } from 'antd';

/*!
 * Components
 */

import Dashboard from '../../components/layout';

declare const require: any;

/*!
 * Utils
 */

import { init } from '../../utils/payment';

/*!
 * Payment modal
 */

function error() {
  const modal = Modal.error({
    title: 'Ошибка',
    content: 'На данный момент покупка курсов недоступна, мы работаем над тем что бы устранить эту ошибку как можно быстрее',
  });
}


/*!
 * Expo
 */

const Index = ({ courses: { data, loaded }, auth }) => (
  <Dashboard title="Курсы">
    <header style={{ marginBottom: 20, padding: '10px 20px', background: '#ffffff' }}>
      <h1 style={{ margin: 0 }}>Доступные курсы</h1>
    </header>
    <Row gutter={16}>
      {data.map(({ _id, name, content, thumb, price, duration }) => (
        <Col key={_id} span={6}>
          <Card title={name} className="uc-course-card">
            <img
              src={thumb}
              alt="го и чс"
              className="uc-img-response"
            />
            <div style={{ padding: 20 }} dangerouslySetInnerHTML={{ __html: content.slice(0, 125) }} />
            <Row>
              <Col span={12}>
                <p style={{ margin: 0, padding: 20, textAlign: 'center', fontSize: 24 }}>{price} / {duration} ч.</p>
              </Col>
              <Col span={12}>
                <div style={{ padding: 20, textAlign: 'center' }}>
                  <Button type="primary" onClick={() => init(auth.user._id, _id).then(
                    ({ data }) => location.href = data.RedirectUrl,
                    () => error(),
                  )}>Купить</Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      )}
    </Row>
  </Dashboard>
);

const mapStateToProps = ({ courses, auth }) => ({ courses, auth });

export default connect(
  mapStateToProps,
)(Index);