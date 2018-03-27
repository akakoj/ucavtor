import * as React from 'react';
import Link from 'next/link';
import { Row, Col } from 'antd';

const Course = ({ _id, icon, name, content, slug }) => (
  <Col span={12}>
    <article className="course">
      <Link as={`/courses/${slug}`}  href={`/courses?slug=${slug}`}>
        <a className="course__link">
          <Row>
            <Col span={6} className="left-column">
              <figure className="course__img-container">
                <img src={icon} alt={name} className="course__img" width="100" height="100" />
              </figure>
            </Col>
            
            <Col span={18} className="right-column">
              <header className="course__header">
                <h3 className="course__title">{`${name.slice(0, 40)}...`}</h3>
              </header>
              <section className="course__body" dangerouslySetInnerHTML={{ __html: `${content.slice(0, 100)}...` }} />
            </Col>
          </Row>
        </a>
      </Link>
    </article>
  </Col>
);

export default Course;
