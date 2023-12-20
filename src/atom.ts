import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
}
// 객체의 key값은 string이고 value는 string 배열 값이다
export interface IBoardsState {
  // todo : [text : string, id : number]
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
  effects: [
    // any 타입으로 해주는게 중요한 듯
    ({ setSelf, onSet }: any) => {
      const STORAGEKEY = "BOARD";
      const savedValue = localStorage.getItem(STORAGEKEY);
      if (savedValue) setSelf(JSON.parse(savedValue));

      onSet((newValue: IBoardsState[]) => {
        localStorage.setItem(STORAGEKEY, JSON.stringify(newValue));
      });
    },
  ],
});
