import { useState } from "react";
import { SpecifyBookingDaysModal } from "~/components/specifyBookingDaysModal";

export interface Day {
  date: Date;
  selected: boolean;
}

export const SpecifyBookingDaysModalSection = () => {
  const [showModal, setShowModal] = useState(false);

  const [days, setDays] = useState<Day[]>(
    Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
      selected: true,
    })),
  );

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
    <section className="space-y-2">
      <h2 className="text-2xl font-extrabold text-primary">
        Specify booking days
      </h2>

      <button className="btn" onClick={() => setShowModal(true)}>
        Show modal
      </button>

      {showModal && (
        <SpecifyBookingDaysModal
          days={days}
          toggleDay={toggleDay}
          unselectAll={unselectAll}
          selectAll={selectAll}
          closeModal={() => setShowModal(false)}
        />
      )}
    </section>
  );
};
