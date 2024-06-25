import { Day } from "~/routes/components";
import { DayButtons } from "~/components/dayButtons";

interface BookAvailableDaysModalProps {
  showModal: boolean;
  days: Day[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
}

export const BookAvailableDaysModal = ({
  showModal,
  days,
  setShowModal,
  setDays,
}: BookAvailableDaysModalProps) => {
  const unselectAll = () => {
    setDays(days.map((day) => ({ ...day, selected: false })));
  };

  const selectAll = () => {
    setDays(days.map((day) => ({ ...day, selected: true })));
  };

  const toggleDay = (day: Day) => {
    const newDays = days.map((d) =>
      d.date === day.date ? { ...d, selected: !d.selected } : d,
    );
    setDays(newDays);
  };

  return (
    <dialog className="modal modal-middle" open={showModal}>
      <div className="modal-box text-center border-2 border-black space-y-8 p-12">
        <h3 className="font-bold text-2xl">
          Ønsker du å bruke hytten i disse dagene?
        </h3>
        <DayButtons days={days} onDayClick={toggleDay} />
        {/*<input*/}
        {/*  type="button"*/}
        {/*  className="btn btn-link"*/}
        {/*  value={*/}
        {/*    days.some((d) => d.selected)*/}
        {/*      ? "Fjern merkerte dager"*/}
        {/*      : "Marker alle dager"*/}
        {/*  }*/}
        {/*  onClick={days.some((d) => d.selected) ? unselectAll : selectAll}*/}
        {/*/>*/}
        <form method="dialog" className="flex flex-col gap-4 items-center">
          <button
            className="btn btn-accent rounded-full font-semibold w-24"
            onClick={() => setShowModal(false)}
          >
            Ja
          </button>
          <button className="btn btn-link" onClick={() => setShowModal(false)}>
            Avbryt
          </button>
        </form>
      </div>
    </dialog>
  );
};
