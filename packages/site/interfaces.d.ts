interface ILayout {
  title?: string;
  description?: string;
  settings?: object;
  children?: object;
}

interface IBanner {
  settings?: object;
}

/**
 * Tag
 */

interface ITag {
  name: string;
  slug: string;
}

/**
 * Course
 */
interface ICourse {
  title: string;
  description: string;
  name: string;
  content: string;

  icon: string;
  thumb: string;

  price: number;
  duration: number;

  slug: string;
  tags?: ITag[];
}

interface ICourseProps {
  name: string;
  description: string;
  items: ICourse[];
  tagsCloud: ITag[];
}

interface ICourseState {
  selectedTags: string[];
}
