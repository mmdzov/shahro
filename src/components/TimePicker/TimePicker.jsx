import { useEffect, useState } from "react";
import {
  Picker,
  PickerItem,
  PickerList,
  Time,
  TimePicker as Tpk,
  TimeWrapper,
} from "./TimePicker.styled";

// use in popup : /events
const TimePicker = ({ time }) => {
  const [hs, setHs] = useState("");
  const [mn, setMn] = useState("");
  const [vsbl, setVsbl] = useState(false);

  //pickHours
  const [pkHs, setPkHs] = useState([]);

  //pickMinutes
  const [pkMn, setPkMn] = useState([]);

  const PickTimeCount = (count) => {
    let arr = [];
    for (let i = 0; i <= count; i++) {
      if (i < 10) i = `0${i}`;
      else i = i.toString();
      arr.push(i);
    }
    return arr;
  };
  useEffect(() => {
    setPkHs(PickTimeCount(12));
    setPkMn(PickTimeCount(59));
  }, []);
  useEffect(() => {
    if (time) {
      const parse = time?.split(":");
      setHs(parse[0]);
      setMn(parse[1]);
      return;
    }
    setHs("00");
    setMn("00");
  }, [time]);
  const handlePickTime = () => setVsbl(true);
  return (
    <Tpk onClick={handlePickTime} 
    // tabIndex='1' onBlur={() => setVsbl(false)}
    >
      {vsbl ? (
        <Picker>
          <PickerList>
            {pkHs.map((item) => (
              <PickerItem className='' key={item}>
                {item}
              </PickerItem>
            ))}
          </PickerList>
          <PickerList>
            {pkMn.map((item) => (
              <PickerItem className='pickTimeItem' key={item}>
                {item}
              </PickerItem>
            ))}
          </PickerList>
        </Picker>
      ) : null}
      <TimeWrapper>
        <Time>{hs}</Time>
        <span>:</span>
        <Time className=''>{mn}</Time>
      </TimeWrapper>
    </Tpk>
  );
};

export default TimePicker;
