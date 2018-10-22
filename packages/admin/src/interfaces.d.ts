import { AxiosPromise } from "axios";
import { ReactChildren } from "react";

/**
 * Reducens
 */

interface IReducerState {
  loading: boolean;
  data: any[],
}

interface IMenuReducerState extends IReducerState {
  selected: string[]
}

/**
 * Models
 */

interface IPage {
  _id: string;
  title: string;
  description: string;
  name: string;
  content: string;
  thumb: string;
  tags: string[];
  rubrics: string[];
  slug: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

interface IOrganization {
  name: string;
  inn: string;
  kpp: string;
  bankAccount: string;
  bic: string;
  address: string;
  representativeFio: string;
  representativePosition: string;
  representativePhone: string;
  managerFio: string;
  managerPosition: string;
  managerPhone: string;
  email: string;
  password: string;
  employers: IUser[];
}

interface ISection {
  title: string;
  description: string;
  name: string;
  content: string;
  icon: string;
  courses: ICourse[],
  status: number;
  slug: string;
}

interface ILesson {
  name: string;
  content: string;
}

interface IQuestion {
  question: string;
  answers: string[];
  rightAnswer: number;
  course: ICourse;
}

interface ITest {}

interface ICourse {
  title: string;
  description: string;
  name: string;
  content: string;
  thumb: string;
  icon: string;
  price: number;
  duration: number;
  tags: string[];
  sections: ISection[];
  lessons: ILesson[];
  questions: IQuestion[];
  slug: string;
  status: number;
}

interface IPayment {
  user: IUser;
  course: ICourse;
  ip: string;
  state: string;
}

/**
 * User
 */
interface IUser {
  fio: string;
  telephone: string;
  password: string;
  organization: IOrganization;
  courses: ICourse[];
  finishedCourses: ICourse[];
  payments: IPayment[];
  tests: ITest[];
  email: string;
  position: string;
  level: number;
}

interface IUserProps extends IUser {
  match: {
    params: {
      id: string;
    }
  };
  form: {
    getFieldDecorator: (name: string, settings: object) => void;
  };
  fetchCourses: () => void;
  updateUser: (data: IUser) => AxiosPromise;
}

interface IUserState extends IUser {}

/*!
 * Containers
 */

interface ICourseContainerState {}
interface ICourseContainerProps {
  fetchSections: () => void;
  fetchCourses: () => void;
}

interface IOrganizationsContainerState {}
interface IOrganizationsContainerProps {
  fetchOrganizations: () => void;
}

interface IPagesContainerState {}
interface IPagesContainerProps {
  fetchPages: () => void;
}

interface IPostsContainerState {}
interface IPostsContainerProps {
  fetchPosts: () => void;
}

interface ISectionsContainerState {}
interface ISectionsContainerProps {
  fetchSections: () => void;
}

interface ISettingsContainerState {}
interface ISettingsContainerProps {
  fetchSettings: () => void;
}

interface IUsersContainerState {}
interface IUsersContainerProps {
  fetchUsers: () => void;
}

/**
 * Menu
 */
interface IMenu {
  data: IMenuItem[];
  selected: string[];
}

interface IMenuItem {
  _id: string;
  title: string;
  icon: string;
  href: string;
}


/**
 * Dashboard
 */

interface IDashboardProps {
  menu: IMenu;
  collapsed: boolean;
  handleCollapse(): void;
  handleMenuSelectItem(): void;
  children: ReactChildren[];
}
