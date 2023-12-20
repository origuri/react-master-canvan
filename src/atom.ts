import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
}
// 객체의 key값은 string이고 value는 string 배열 값이다
export interface IBoardsState {
  [key: string]: IToDo[];
}

export const boardsState = atom<IBoardsState>({
  key: "toDo",
  default: {
    // 띄어쓰기 하려면 큰따옴표 사용
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
