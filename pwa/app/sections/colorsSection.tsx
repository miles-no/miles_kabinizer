import { ColorBox } from "~/components/colorBox";

export const ColorsSection = () => {
  return (
    <section>
      <h2 className="max-w-xl text-2xl font-extrabold pb-4 text-primary">
        Colors
      </h2>
      <div className="flex flex-wrap gap-2">
        <ColorBox
          colorClass="bg-primary"
          textColorClass="text-primary-content"
          label="Primary"
        />
        <ColorBox
          colorClass="bg-secondary"
          textColorClass="text-secondary-content"
          label="Secondary"
        />
        <ColorBox
          colorClass="bg-accent"
          textColorClass="text-accent-content"
          label="Accent"
        />
        <ColorBox
          colorClass="bg-neutral"
          textColorClass="text-neutral-content"
          label="Neutral"
        />
        <ColorBox
          colorClass="bg-info"
          textColorClass="text-info-content"
          label="Info"
        />
        <ColorBox
          colorClass="bg-success"
          textColorClass="text-success-content"
          label="Success"
        />
        <ColorBox
          colorClass="bg-warning"
          textColorClass="text-warning-content"
          label="Warning"
        />
        <ColorBox
          colorClass="bg-error"
          textColorClass="text-error-content"
          label="Error"
        />
      </div>
    </section>
  );
};
