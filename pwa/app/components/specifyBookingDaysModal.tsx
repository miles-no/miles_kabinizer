import { DayButtons } from "~/components/dayButtons";

export interface Day {
  date: Date;
  selected: boolean;
}

interface SpecifyBookingDaysModalProps {
  days: Day[];
  toggleDay: (day: Day) => void;
  unselectAll: () => void;
  selectAll: () => void;
  closeModal: () => void;
}

export const SpecifyBookingDaysModal = ({
  days,
  toggleDay,
  unselectAll,
  selectAll,
  closeModal,
}: SpecifyBookingDaysModalProps) => (
  <dialog className="modal modal-middle" open>
    <div className="modal-box text-center border-2 border-black space-y-8 p-12">
      <h3 className="font-bold text-2xl">Når tenker du å bruke hytten?</h3>
      <p className="text-lg">
        Hytten står mye ubrukt i ukedagene og dersom du vet når du skal reise
        opp så kan du markere dagene du ikke bruker hytten og dermed gi andre
        mulighet til å bruke de ledige dagene.
      </p>
      <p className="text-lg">
        Kanskje du ikke ønsker å bruke noe av hyttetiden du har fått? Ting
        skjer. Regn og vind, syke barn og livet. Det er helt greit! Du kan si
        ifra deg all hyttetiden din.
      </p>
      <DayButtons days={days} onDayClick={toggleDay} />
      <input
        type="button"
        className="btn btn-link"
        value={
          days.some((d) => d.selected)
            ? "Fjern merkerte dager"
            : "Marker alle dager"
        }
        onClick={days.some((d) => d.selected) ? unselectAll : selectAll}
      />
      <form method="dialog">
        <button className="btn btn-accent rounded-full" onClick={closeModal}>
          Lagre endringer
        </button>
      </form>
    </div>
  </dialog>
);
