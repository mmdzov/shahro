import { PpForm } from "./StyledEvents";
import { useEffect, useRef, useState } from "react";
import CustomInput from "components/Utilities/CustomInput";
import { TextField } from "@material-ui/core";
import zeroInTime from "utilities/zeroInTime";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  eventSelected,
  modifyCalendarEvents,
  setCalendarEvents,
} from "store/actions/calendarActions";
import zeroInTimeCustom from "utilities/zeroInTimeCustom";
import CheckIcon from "@material-ui/icons/Check";
import { SubmitButton } from "./StyledEvents";
import { SubBtmWrapper } from "./StyledEvents";
import rmvZeroTime from "utilities/removeZeroTime";
import { TimePickerWrapper } from "./StyledEvents";
import styled from "styled-components";
import Ripples from "components/Utilities/Ripples";
import AddIcon from "components/Utilities/AddIcon";
import AreYouSure from "components/Utilities/AreYouSure";
import Delete from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    padding: "0px 5px",
  },
}));

const BottomMenu = ({ value, setValue, mode, handleDeleteEvent }) => {
  const classes = useStyles();
  const [validate, setValidate] = useState({ title: "", description: "" });
  const [form, setForm] = useState({
    title: "",
    description: "",
    time: "",
  });
  const tpkRf = useRef(null);
  const { date, selected } = useSelector(({ calendar }) => calendar);
  const dispatch = useDispatch();
  const handleChangePp = (e) => {
    let { name, value } = e.target;
    if (name === "title" && value.length >= 3)
      setValidate((prev) => ({ ...prev, title: "" }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleNewEvent = (events) => {
    const weeks = [
      "يكشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنج شنبه",
      "جمعه",
      "شنبه",
    ];
    const srt = events.sort((a, b) => a.day - b.day);
    const obj = {};

    for (let i = 0; i < 31; i++) {
      let flt = srt.filter((item) => item.day === i);
      if (flt.length > 0) {
        obj[i] = {
          title: weeks[flt[0].day_week],
          data: flt,
        };
      }
    }
    let newData = [];
    for (let i in obj) {
      const fullItem = obj[i];
      fullItem.data[0].dayWeekName = fullItem?.title;
      newData.push(...fullItem.data);
    }
    return newData;
  };
  const handleSubmitPp = () => {
    const ins = { ...form };

    if (form.title.length < 3)
      return setValidate((prev) => ({
        ...prev,
        title: "عنوان رویداد نباید کمتر از 3 حرف باشد",
      }));

    ins.time += ":0";
    let splt = ins.time.split(":");
    ins.time = {
      ...date,
      hours: rmvZeroTime(splt[0]),
      minutes: rmvZeroTime(splt[1]),
      seconds: rmvZeroTime(splt[2]),
    };
    if (mode === "add") {
      dispatch(setCalendarEvents(ins, handleNewEvent));
    } else if (mode === "modify") {
      dispatch(modifyCalendarEvents(ins));
    }
    setValue(false);
    const min = zeroInTime("min");
    const hs = zeroInTime("hs");
    setForm({
      title: "",
      description: "",
      time: `${hs}:${min}`,
    });
  };
  useEffect(() => {
    if (mode) {
      if (mode === "add") {
        const min = zeroInTime("min");
        const hs = zeroInTime("hs");
        setForm((prev) => ({
          title: "",
          description: "",
          time: `${hs}:${min}`,
        }));
      } else if (mode === "modify") {
        const { title, description, hours, minutes } = selected;
        let to12 = hours % 12;
        const hs = zeroInTimeCustom(to12);
        const mn = zeroInTimeCustom(minutes);
        setForm((prev) => ({
          title,
          description,
          time: `${hs}:${mn}`,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, selected]);
  const [modal, setModal] = useState(false);

  const handleDeleteEv = () => {
    setModal(false);
    handleDeleteEvent(selected?.token);
    dispatch(eventSelected());
  };
  const cancel = (mode) => {
    setModal(mode);
    dispatch(eventSelected());
  };
  useEffect(() => {
    if (value) {
      const title = document.getElementById("title");
      title.focus();
    }
  }, [value]);
  return (
    <PpForm onSubmit={(e) => e.preventDefault()}>
      <div className="" style={{ height: "95px", marginTop: "-4px" }}>
        <CustomInput
          mode="group"
          label="عنوان"
          type="input"
          name="title"
          id="title"
          value={form.title}
          onChange={handleChangePp}
        />
        <Invalid className="" style={{ color: "red" }}>
          {validate?.title}
        </Invalid>
      </div>
      {modal ? (
        <AreYouSure
          Icon={Delete}
          mode="delete"
          setOpen={cancel}
          click={handleDeleteEv}
        />
      ) : null}
      <CustomInput
        mode="group"
        label="توضیح"
        type="textarea"
        name="description"
        value={form.description}
        onChange={handleChangePp}
      />
      <SubBtmWrapper style={{ paddingBottom: 15 }}>
        <TimePickerWrapper className="">
          <TextField
            id="time"
            label="انتخاب ساعت"
            type="time"
            name="time"
            value={form.time}
            ref={tpkRf}
            className={`${classes.textField} clockInputEvent`}
            style={{ width: "100%" }}
            onChange={handleChangePp}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </TimePickerWrapper>
        <Ripples
          onClick={handleSubmitPp}
          radius="10px"
          delay={300}
          delayAfterClick={300}
        >
          <SubmitButton type="submit">
            ثبت
            <CheckIcon style={{ marginTop: -8 }} />
          </SubmitButton>
          {selected?.token ? (
            <AddIcon
              mode="div"
              onClick={() => setModal(true)}
              Icon={Delete}
              style={{ background: "red", color: "white" }}
            />
          ) : null}
        </Ripples>
      </SubBtmWrapper>
    </PpForm>
  );
};

const Invalid = styled.div`
  color: #ff4747;
  font-size: 0.7rem;
  margin-top: -8px;
  margin-right: 6px;
  font-weight: 600;
`;

export default BottomMenu;
