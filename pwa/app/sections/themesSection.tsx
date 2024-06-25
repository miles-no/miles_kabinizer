import { ThemeOption } from "~/components/themeOption";

export const ThemesSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-extrabold text-primary">Themes</h2>
      <div className="flex items-center gap-4">
        <ThemeOption label="Light" value="milesLight" />
        <ThemeOption label="Dark" value="milesDark" />
        <ThemeOption label="Svartedøden" value="cyberpunk" />
      </div>
    </section>
  );
};
