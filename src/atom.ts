import { atom } from "recoil";

export enum Category {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}
export interface IToDoState {
  text: string;
  id: number;
  category: Category;
}

export const toDoState = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});
