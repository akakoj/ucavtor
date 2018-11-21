/**
 * Vendor
 */

import { Document, SchemaOptions } from 'mongoose';

/*!
 * Libs
 */

/*!
 * Request
 */

interface IRequestParams {
  id: string;
}

/*!
 * Settings
 */

interface ISettings {}

interface ISettingsModel extends Document, ISettings {}

/*!
 * Question
 */

interface IQuestion {}

interface IQuestionModel extends Document, IQuestion {}

/*!
 * Course
 */

interface ILesson {
  course: string;
}

interface ICourse {
  name: string;
  price: number;
  lessons: ILesson[];
}

interface ICourseModel extends Document, ICourse {}

interface ILessonModel extends Document {
  course: string;
}

/*!
 * Section
 */

interface ISection {
  courses: ICourse[];
}

interface ISectionModel extends Document, ISection {}

/*!
 * Organization
 */

interface IOrganization {
  email: string;
  password: string;
}

interface IOrganizationModel extends Document, IOrganization {}

/*!
 * User
 */

interface IUser {
  fio: string;
  telephone: string;
  password: string;
  organization: string;
  courses: string[];
  finishedCourses: string[];

  payments: string;
  tests: string[];
  email: string;
  position: string;

  level: number;
}

interface IUserModel extends Document, IUser {}

/*!
 * Pages
 */


interface IPage {
  email: string;
  password: string;
}

interface IPageModel extends Document, IPage {}

/*!
 * Post
 */

interface IPost {
  id: string;
  title: string;
  description: string;
  name: string;
  content: string;
  thumb: string;
  tags: string[];
  rubrics: string[];
  slug: string;
  status: number;
}

/*!
 * Payment
 */

interface IPayment {
  user: string;
  course: string;
  ip: string;
  state: string;
  sessionId?: string;
}

interface IPaymentParams {
  userId: string;
  courseId: string;
}

interface IPaymentStatus {
  SessionId: string;
  Success: string;
}

interface IPaymentModel extends Document, IPayment {}

/*!
 * Token
 */

interface IToken {
  id: string;
}
