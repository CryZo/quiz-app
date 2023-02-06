import type { IAnswer } from ".";

export default interface IQuestion {
  question: string;
  answers: [IAnswer, IAnswer, IAnswer, IAnswer];
}
