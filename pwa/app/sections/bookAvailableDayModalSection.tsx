import { useState } from "react";
import { Day } from "~/routes/components";
import { BookAvailableDaysModal } from "~/components/bookAvailableDaysModal";

export function BookAvailableDayModalSection() {
  const [showModal, setShowModal] = useState(false);
  const [days, setDays] = useState<Day[]>(
    Array.from({ length: 3 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
      selected: true,
    })),
  );

  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-extrabold text-primary">
        Book available days
      </h2>

      <button className="btn" onClick={() => setShowModal(true)}>
        Show modal
      </button>

      <BookAvailableDaysModal
        showModal={showModal}
        days={days}
        setShowModal={setShowModal}
        setDays={setDays}
      />
    </section>
  );
}
