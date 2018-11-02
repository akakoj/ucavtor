interface IReduxAction {
  type: string;
  payload?: object;
}

interface IReducerState {
  loading: boolean;
  data: any[];
  current?: object;
}

interface IUserReducerState {
  user: object;
  loading: boolean;
  isAuthenticated: boolean,
}

/**
 * Courses
 */

interface ICourses {
  title: string;
  items?: ICourse[];
}

interface ICourse {
  _id: string;
  name: string;
  thumb: string;
  duration: number;
  price: number;
}

/**
 * User
 */

interface IProfile extends IUser {}

interface IUser {
  fio: string;
  position: string;
  courses: ICourse[];
}
