import { atom } from "recoil";

export enum Category {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}
export interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom({
  key: "toDo",
  default: {
    to_do: ["a", "b", "c", "d", "e", "f"],
    doing: [],
    done: [],
  },
});
