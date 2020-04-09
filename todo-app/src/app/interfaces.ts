export interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
  time: number;
  alarm: number;
  urgency: string;
}

export interface IUrgency {
  _id: string;
  level: number;
  name: string;
  color: string;
}

export interface IFormattedTodos {
  date: string;
  hidden: boolean;
  todos: ITodo[];
}

export interface IAuthenticationBody {
  email: string;
  password: string;
}

export interface IRecoverBody {
  email: string;
}

export interface IChangePasswordBody {
  password: string;
  prevPassword?: string;
  code?: string;
}

export interface IRules {
  header: string;
  body?: string;
  footer: string;
  bodyInformation?: string;
  bodyLog?: string;
}
