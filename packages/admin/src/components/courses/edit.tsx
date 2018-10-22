/*!
 * Vendor
 */

import * as React from 'react';
import CKEditor from 'react-ckeditor-component';

import { connect } from 'react-redux';
import { Form, Input, Button, Select, Tabs } from 'antd';

/*!
 * Actions
 */

import { success } from './../../utils/modals';
import { fetchCourse, updateCourse } from '../../actions/coursesActions';

/*!
 * Components
 */

import Lessons from '../lessons';
import Questions from '../questions';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;

/*!
 * TagsCloud
 */

const tagsCloud = [{
  name: 'Дерматовенерология',
  slug: 'dermatovenerologija',
}, {
  name: 'Кардиология',
  slug: 'kardiologija',
}, {
  name: 'Организация здравоохранения и общественное здоровье',
  slug: 'zdravoohranenija',
}, {
  name: 'Педиатрия',
  slug: 'pediatrija',
}, {
  name: 'Психиатрия',
  slug: 'psihiatrija',
}, {
  name: 'Психотерапия',
  slug: 'psihoterapija',
}, {
  name: 'Рентгенология',
  slug: 'rentgenologija',
}, {
  name: 'Терапевтическая стоматология',
  slug: 'stomatologija',
}, {
  name: 'Терапия',
  slug: 'terapija',
}, {
  name: 'Фармацевтическая химия и фармакогнозия',
  slug: 'farmacevtika',
}, {
  name: 'Эндокринология',
  slug: 'jendokrinologija',
}];

/*!
 * Expo
 */

class CourseEditForm extends React.Component<any, {
  title: string;
  description: string;
  name: string;
  content: string;
  price: number;
  duration: number;
  status: number;
  icon: string;
  thumb: string;
  tags: string[];
  lessons: string[];
  questions: string[];
  sections: string[];
  slug: string;
}> {
  state = {
    title: '',
    description: '',
    name: '',
    content: '',
    status: 0,
    price: 0,
    duration: 0,
    icon: '',
    thumb: '',
    tags: [],
    lessons: [],
    questions: [],
    sections: [],
    slug: '',
  };

  componentDidMount() {
    const { match: { params } } = this.props;

    this.fetchCourse(params.id);
  }

  fetchCourse = async (id) => {
    const { payload } = await this.props.fetchCourse(id);

    return this.setState({ ...payload });
  }

  private handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = { ...this.state, ...values };
        delete data.lessons;

        this.props.updateCourse(data).then(() => success());
      }
    });
  }

  private updateContent = content => this.setState({ content });
  private handleChangeContent = e => this.setState({ content: e.editor.getData() });

  public render() {
    const { form: { getFieldDecorator }, match: { params }  } = this.props;

    const {
      title,
      description,
      name,
      content = '',
      price,
      icon,
      thumb,
      duration,
      sections,
      lessons,
      questions,
      tags,
      slug,
      status,
    } = this.state;

    let editor = <p />;

    if (!!content.length) {
      editor = <CKEditor 
        content={content}
        config={{ language: 'ru', allowedContent: true }}
        events={{ change: this.handleChangeContent }}
      />;
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="ОБЩЕЕ" key="1">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Укажите название!' }],
                initialValue: name,
              })(<Input placeholder="название курса" />)}
            </FormItem>
            <FormItem>
              {editor}
            </FormItem>
          </TabPane>
          <TabPane tab="СЕО" key="2">
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Укажите заголовок!' }],
                initialValue: title,
              })(<Input placeholder="заголовок страницы ( тег title )" />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Укажите описание!' }],
                initialValue: description,
              })(
                <TextArea
                  rows={4}
                  placeholder="краткое описание ( тег meta='description' )"
                />,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('slug', {
                rules: [{ required: true, message: 'Укажите ЧПУ!' }],
                initialValue: slug,
              })(
                <Input placeholder="адрес страницы, например: testpage" />,
              )}
            </FormItem>
          </TabPane>
          <TabPane tab="ДАННЫЕ" key="3">
            <FormItem>
              {getFieldDecorator('sections', {
                rules: [{ required: true, message: 'Вы должны выбрать хотя бы один раздел!' }],
                initialValue: sections.map(({ _id }) => _id),
              })(
                <Select
                  mode="tags"
                  placeholder="раздел"
                >
                  {this.props.sections.data.map(({ _id, name }) => <Option key={_id} value={_id}>{name}</Option>)}
                </Select>,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('tags', {
                initialValue: tags.map(({ slug }) => slug),
              })(
                <Select
                  mode="tags"
                  placeholder="раздел"
                >
                  {tagsCloud.map(({ name, slug }) => <Option key={slug} value={slug}>{name}</Option>)}
                </Select>,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Укажите цену!' }],
                initialValue: price,
              })(
                <Input placeholder="стоимость курса" />,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('duration', {
                rules: [{ required: true, message: 'Укажите продолжительность курса!' }],
                initialValue: duration,
              })(
                <Input placeholder="продолжительность курса в часах" />,
              )}
            </FormItem>
          </TabPane>

          <TabPane tab="ИЗОБРАЖЕНИЯ" key="4">
            <FormItem>
              {getFieldDecorator('icon', {
                rules: [{ required: true, message: 'Укажите ссылку на изображение!' }],
                initialValue: icon,
              })(
                <Input placeholder="ссылка на изображение" />,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('thumb', {
                rules: [{ required: true, message: 'Укажите ссылку на миниатюру' }],
                initialValue: thumb,
              })(
                <Input placeholder="ссылка на миниатюру" />,
              )}
            </FormItem>
          </TabPane>

          <TabPane tab="УРОКИ" key="5">
            <Lessons course={params.id} data={lessons} />
          </TabPane>
          
          <TabPane tab="ТЕСТЫ" key="6">
            <Questions course={params.id} data={questions} />
          </TabPane>
        </Tabs>

        <hr style={{ border: 'none', borderBottom: '1px solid #eeeeee' }} />

        <FormItem>
          {getFieldDecorator('status', {
            initialValue: String(status),
          })(
            <Select>
              <Option value="0">Черновик</Option>
              <Option value="1">Опубликованно</Option>
            </Select>,
          )}
        </FormItem>

        <FormItem>
          <hr style={{ border: 'none', borderBottom: '1px solid #eeeeee' }} />
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>сохранить</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedCourseEditForm = Form.create()(CourseEditForm as any);

const mapStateToProps = ({ sections }) => ({ sections });

export default connect(
  mapStateToProps,
  { fetchCourse, updateCourse },
)(WrappedCourseEditForm as any);
