export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
export interface IOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: string;
}
