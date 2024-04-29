import { StyledCheckBoxWithLabel } from "@/pages/styledCheckBoxWithLabel.tsx";
import { useState } from "react";
import { FormCalendar } from "@/pages/formCalendar.tsx";
import { Form, useLoaderData } from "react-router-dom";

// Note, this is all happening in the browser since we are using an SPA

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  console.log("Running loader");
  return { greeting: "Hello, world!" };
}
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }) {
  console.log("Running action", { request, params });
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log("Form data", updates);
  return { greeting: "You just ran an action!" };
}

const TorjePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());

  // @ts-expect-error - We know greeting is in the loader data
  const { greeting } = useLoaderData();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="p-4 xl:pr-4">
        <div className="sticky top-8">
          <div className=" pb-8 text-4xl font-extrabold text-miles-red-500">
            Kabinizer
          </div>
          <div className="p-4 pb-4 pt-4 text-2xl font-extrabold text-red-900">
            {greeting}
          </div>
          <h1 className="max-w-xl text-3xl font-extrabold text-red-900">
            Hei kollega! <br />
            Velg når du ønsker å bruke Miles-hytten i{" "}
            <input
              className="input-number input input-md"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
          </h1>
        </div>
      </div>
      <Form
        method="post"
        // onSubmit={(e) => {
        //   setIsSubmitting(true);
        //   setTimeout(() => {
        //     setIsSubmitting(false);
        //     setShowSuccess(true);
        //     setTimeout(() => {
        //       setShowSuccess(false);
        //     }, 2000);
        //   }, 2000);
        //   e.preventDefault();
        // }}
        className="max-w-xl"
      >
        <div className="p-4 pb-4 pt-4">
          <h2
            className={
              "sticky top-0 border-b bg-gray-100 bg-opacity-90 pb-2 pt-2 text-2xl font-extrabold"
            }
          >
            Velg ferie
          </h2>
          <div className={" flex flex-col gap-4 pt-6"}>
            <StyledCheckBoxWithLabel title="Vinterferien" name="vinterferie" />
            <StyledCheckBoxWithLabel
              title="Påskeferien - Første halvdel"
              name="påskeferie-første"
            />
            <StyledCheckBoxWithLabel
              title="Påskeferien - Andre halvdel"
              name="påskeferie-andre"
            />
            <StyledCheckBoxWithLabel
              title="Sommer - Fellesferien"
              name="sommer-felles"
            />
            <StyledCheckBoxWithLabel title="Høstferien" name="høstferie" />
            <StyledCheckBoxWithLabel title="Juleferien" name="juleferie" />
            <p className="justify-center p-4 text-center text-red-500">
              NB. Vi ønsker å prioritere ansatte med barn i skolealder for
              vinter- og høstferie.
            </p>
          </div>
        </div>

        <div className="p-4 pb-4 pt-4">
          <h2
            className={
              "sticky top-0 border-b bg-gray-100 bg-opacity-90 pb-2 pt-2 text-2xl font-extrabold"
            }
          >
            Velg uker
          </h2>
          <div className={"flex flex-col gap-4 pt-6"}>
            <FormCalendar year={year} />
          </div>
        </div>
        <div className="sticky bottom-0 flex justify-center border-t bg-gray-100 bg-opacity-90 p-8 pt-4">
          <button
            className="h-16 w-72 rounded-full bg-miles-red-500 font-bold text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Sender inn..."
              : showSuccess
                ? "Sendt!"
                : "Send inn"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default TorjePage;
