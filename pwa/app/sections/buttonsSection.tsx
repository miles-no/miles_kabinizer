import { Button } from "~/components/button";

export const ButtonsSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-extrabold text-primary">Buttons</h2>
      <div className="flex flex-wrap gap-2 items-center">
        {/*<Button className="btn-accent" label="Button" />*/}
        {/*<Button className="btn-primary" label="Button" />*/}
        {/*<Button className="btn-outline" label="Button" />*/}
        {/*<Button*/}
        {/*  className="btn-disabled"*/}
        {/*  label="Button"*/}
        {/*  tooltip="Disabled"*/}
        {/*  disabled*/}
        {/*/>*/}
        {/*  Don't use own Button, just style with tailwind  + daisyui classes instead */}
        <button className="btn btn-primary rounded-full font-semibold min-w-24">
          Button
        </button>
        <button className="btn btn-accent rounded-full font-semibold min-w-24">
          Button
        </button>
        <button className="btn btn-outline rounded-full font-semibold min-w-24">
          Button
        </button>
        <div className="tooltip" data-tip={"Disabled"}>
          <button
            disabled
            className="btn btn-disabled rounded-full font-semibold min-w-24"
          >
            Button
          </button>
        </div>
      </div>
    </section>
  );
};
