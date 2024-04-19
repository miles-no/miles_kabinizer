import Button from "./Button";
import { useState } from "react";
import { DrawService } from "../../api/services/DrawService";
import { Draw } from "../../api/models/Draw";
import {format} from "date-fns"

const EditPeriodView = (props: { draw: Draw }) => {


  const { draw } = props;
  const [tempDraw, setTempDraw] = useState(draw);


  const handleChangePeriod = (e) => {
    const isSpecial =
      e.target.name === "isSpecial" ? e.target.checked : draw.isSpecial;
    setTempDraw({
      ...tempDraw,
      [e.target.name]: e.target.value,
      isSpecial,
    });
  };

  const handleSubmit = () => {
    try {
      DrawService.putApiDraw(tempDraw);
    } catch (error) {
      console.error(error);
    }
  };

  const addToDrawPeriods = (e, key) => {
    const { name, value } = e.target;
    const addTextToPeriodDraw = draw?.periods?.map((date, index) => {
      if (index === key) {
        return {
          ...date,
          [name]: value,
        };
      }
      return date;
    }, []);
    setTempDraw({
      ...draw,
      periods: addTextToPeriodDraw,
    });
  };

  const addTitleToDrawPeriods = (value: string, key: number) => {
    const addTextToPeriodDraw = draw?.periods?.map((date, index) => {
      if (index === key) {
        return {
          ...date,
          title: value,
        };
      }
      return date;
    }, []);
    setTempDraw({
      ...tempDraw,
      periods: addTextToPeriodDraw,
    });
  };

 
  const formatStupidDate = (date: string | undefined) => {
    if (!date) return "";

    return format(new Date(date), "yyyy-MM-dd");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center gap-10 rounded bg-gray-300 p-4">
        <div className="flex flex-col justify-between gap-4">
          <label className="w-20 rounded-xl bg-[#354A71] p-1 text-center">
            Deadline title
          </label>
          <input
            className="w-56 rounded bg-white p-1 text-justify text-black"
            type="text"
            name="title"
            id="title"
            value={draw?.title || ""}
            onChange={handleChangePeriod}
          />
        </div>
         <div className="flex flex-col justify-between gap-4">
          <label className="w-32 rounded bg-[#354A71] p-1 text-center">
            Deadline from
          </label>
          <input
            className="w-56 rounded bg-white p-1 text-justify  text-black"
            type="date"
            value={formatStupidDate(draw?.start)}
            name="start"
            id="start"
            onChange={handleChangePeriod}
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <label className="w-32 rounded bg-[#354A71] p-1 text-center">
            Deadline to
          </label>
          <input
            className="text-between w-56 rounded bg-white p-1  text-black"
            type="date"
            value={formatStupidDate(draw?.end)}
            name="end"
            id="end"
            onChange={handleChangePeriod}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <label className="w-52 rounded bg-[#354A71] p-1 text-center">
            Is special draw?
          </label>
          <input
            className="text-between w-56 rounded bg-white p-1  text-black"
            type="checkbox"
            defaultChecked={draw?.isSpecial}
            name="isSpecial"
            id="isSpecial"
            onChange={handleChangePeriod}
          />
        </div>

        <label className="w-full rounded bg-[#354A71] p-1 text-center">
          <hr />
        </label>
        {draw?.periods?.map((date, key) => {
          return (
            <div className="flex flex-col justify-between gap-4" key={key}>
              <label className="w-32 rounded bg-[#354A71] p-1 text-center">
                Period from
              </label>
              <input
                className="w-56 rounded bg-white p-1 text-justify  text-black"
                type="date"
                value={formatStupidDate(date?.periodStart)}
                name="periodStart"
                id="periodStart"
                onChange={(e) => addToDrawPeriods(e, key)}
              />
              <label className="w-32 rounded bg-[#354A71] p-1 text-center">
                Period to
              </label>
              <input
                className="w-56 rounded bg-white p-1 text-justify  text-black"
                type="date"
                value={formatStupidDate(date?.periodEnd)}
                name="periodEnd"
                id="periodEnd"
                onChange={(e) => addToDrawPeriods(e, key)}
              />
              <label className="w-32 rounded bg-[#354A71] p-1 text-center">
                Period title
              </label>
              <input
                className="w-56 rounded bg-white p-1 text-justify  text-black"
                type="text"
                name="title"
                id="title"
                value={date?.title || ""}
                onChange={(e) => addTitleToDrawPeriods(e.target.value, key)}
              />
            </div>
          );
        })}
        <div className="w-20 rounded bg-[#354A71] p-1">
          <Button size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </div> 
      </div>
    </div>
  );
};

export default EditPeriodView;
