import { ColorsSection } from "~/sections/colorsSection";
import { ButtonsSection } from "~/sections/buttonsSection";
import { NavbarSection } from "~/sections/navbarSection";
import { BottomNavigationSection } from "~/sections/bottomNavigationSection";
import { DayButtonsSection } from "~/sections/dayButtonsSection";
import { DayButtonsCalendarSection } from "~/sections/dayButtonsCalendarSection";
import { ThemesSection } from "~/sections/themesSection";
import { SpecifyBookingDaysModalSection } from "~/sections/specifyBookingDaysModalSection";
import { CalendarLegendsSection } from "~/sections/calendarLegendsSection";
import { BookAvailableDayModalSection } from "~/sections/bookAvailableDayModalSection";

export interface Day {
  date: Date;
  selected: boolean;
}

const ComponentsPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col gap-8 p-4">
        <section>
          <h1 className="text-4xl font-extrabold textarea-accent">
            Components playground
          </h1>
          <p>This is a playground to test out and develop new components</p>
        </section>
        <ColorsSection />
        <NavbarSection />
        <ButtonsSection />
        <ThemesSection />
        <BottomNavigationSection />
        <DayButtonsSection />
        <DayButtonsCalendarSection />
        <SpecifyBookingDaysModalSection />
        <BookAvailableDayModalSection />
        <CalendarLegendsSection />
      </div>
    </div>
  );
};

export default ComponentsPage;
