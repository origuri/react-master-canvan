import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./atom";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  /* selector의 state로 가져오면 첫번째 엘리먼트는 selector의 get의 리턴 값이고,
  두번째 엘리먼트는 state를 변경하는 set 함수  */
  const [hours, setHour] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    // setHour의 newValue값
    setHour(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        type="number"
        placeholder="Hours"
        onChange={onHoursChange}
      />
    </div>
  );
}

export default App;
