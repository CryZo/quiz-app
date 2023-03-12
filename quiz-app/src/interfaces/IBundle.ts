import type { IQuestion } from ".";

export default interface IBundle {
  title: string;
  questions: IQuestion[];
}
