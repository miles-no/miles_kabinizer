import Button from "./Button";
import { CreateDrawDto } from "../../api";
import { useEffect, useState } from "react";
import { DrawService } from "../../api/services/DrawService";
import checkIfDateIsEmpty from "../components/CheckIfDateIsEmpty";
import { debug } from "console";

const NewPeriodView = () => {
  const [draw, setDraw] = useState<CreateDrawDto>({
    deadlineStart: "",
    deadlineEnd: "",
    title: "",
    isSpecial: false,
    drawPeriods: [{ start: "", end: "", title: "" }],
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangePeriod = (e) => {
    const isSpecial =
      e.target.name === "isSpecial" ? e.target.checked : draw.isSpecial;
    setDraw({
      ...draw,
      [e.target.name]: e.target.value,
      isSpecial,
    });
  };

  const validate = () => {
    const { deadlineStart, deadlineEnd, drawPeriods } = draw;

    drawPeriods?.map((date) => {
      if (
        checkIfDateIsEmpty(date.start) &&
        checkIfDateIsEmpty(date.end) &&
        checkIfDateIsEmpty(deadlineStart) &&
        checkIfDateIsEmpty(deadlineEnd)
      ) {
        setValidated(true);
        setError(false);
      }
      if (Number(date?.start) < Number(date?.end) - 7 && !date.title) {
        setValidated(false);
        setError(true);
      }
    });

    if (!validated) {
      setError(true);
    }
  };
  useEffect(() => {}, [error]);

  const handleSubmit = () => {
    const specialDates = draw?.drawPeriods?.filter(
      (date) => date?.start !== "",
    );
    validate();
    if (!validated) {
    }
    try {
      DrawService.postApiDraw({
        ...draw,
        drawPeriods: specialDates,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
    }
  };

  const addToDrawPeriods = (e, key) => {
    const { name, value } = e.target;
    const addTextToPeriodDraw = draw?.drawPeriods?.map((date, index) => {
      if (index === key) {
        return {
          ...date,
          [name]: value,
        };
      }
      return date;
    }, []);
    setDraw({
      ...draw,
      drawPeriods: addTextToPeriodDraw,
    });
  };

  const addTitleToDrawPeriods = (value: string, key: number) => {
    const addTextToPeriodDraw = draw?.drawPeriods?.map((date, index) => {
      if (index === key) {
        return {
          ...date,
          title: value,
        };
      }
      return date;
    }, []);
    setDraw({
      ...draw,
      drawPeriods: addTextToPeriodDraw,
    });
  };

  const addDrawPeriods = () => {
    setDraw({
      ...draw,
      drawPeriods: [...draw.drawPeriods, { start: "", end: "", title: "" }],
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-10 rounded bg-gray-300 p-4">
        <div className="flex flex-col justify-between gap-4">
          <label className="w-20 rounded-xl bg-[#354A71] p-1 text-center">
            Draw title
          </label>
          <input
            className="w-56 rounded bg-white p-1 text-justify text-black"
            type="text"
            name="title"
            id="title"
            onChange={handleChangePeriod}
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <label className="w-32 rounded bg-[#354A71] p-1 text-center">
            Booking opens
          </label>
          <input
            className="w-56 rounded bg-white p-1 text-justify  text-black"
            type="date"
            value={draw?.deadlineStart}
            name="deadlineStart"
            id="deadlineStart"
            onChange={handleChangePeriod}
            required={true}
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <label className="w-32 rounded bg-[#354A71] p-1 text-center">
            Deadline to
          </label>
          <input
            className="text-between w-56 rounded bg-white p-1  text-black"
            type="date"
            value={draw?.deadlineEnd}
            name="deadlineEnd"
            id="deadlineEnd"
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
        {draw?.drawPeriods?.map((date, key) => {
          return (
            <div className="flex flex-col justify-between gap-4" key={key}>
              <label className="w-32 rounded bg-[#354A71] p-1 text-center">
                Period from
              </label>
              <input
                className="w-56 rounded bg-white p-1 text-justify  text-black"
                type="date"
                value={date?.start}
                name="start"
                id="start"
                onChange={(e) => addToDrawPeriods(e, key)}
              />
              <label className="w-32 rounded bg-[#354A71] p-1 text-center">
                Period to
              </label>
              <input
                className="w-56 rounded bg-white p-1 text-justify  text-black"
                type="date"
                value={date?.end}
                name="end"
                id="end"
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
                onChange={(e) => addTitleToDrawPeriods(e.target.value, key)}
              />
            </div>
          );
        })}
        <div className=" rounded bg-[#354A71] p-1">
          <Button size="small" onClick={addDrawPeriods}>
            Add more periods
          </Button>
        </div>

        <div className="w-20 rounded bg-[#354A71] p-1">
          <Button size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        {/*  {!isSubmitted ? (
        ) : (
          <div className="w-24 rounded bg-[#354A71] p-2 text-green-400">
            Submitted
          </div>
        )} */}
        {!validated && (
          <p className="text-red-500">Please fill in all fields</p>
        )}
      </div>
    </div>
  );
};

export default NewPeriodView;
