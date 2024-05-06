import { StyledCheckBoxWithLabel } from "@/components/StyledCheckBoxWithLabel.tsx";
import { useState } from "react";
import { FormCalendar } from "@/components/FormCalendar.tsx";
import { Form, useLoaderData } from "react-router-dom";
import Logo from "@/components/Logo.tsx";

// Note, this is all happening in the browser since we are using an SPA

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return { greeting: "Hello, world!", year: new Date().getFullYear() };
}
// eslint-disable-next-line react-refresh/only-export-components
export async function action({
  request,
  params,
}: {
  request: Request;
  params: Record<string, string>;
}) {
  console.log("Running action", { request, params });
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log("Form data", updates);
  return { greeting: "You just ran an action!" };
}

const CabinBookingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [year, setYear] = useState(new Date().getFullYear());

  // @ts-expect-error - we know this is in the loader data
  const { year } = useLoaderData();

  return (
    <div className="flex flex-wrap justify-center p-4">
      <div className="flex-grow ">
        <div className="sticky top-8 xl:pr-4">
          <Logo />
          <h1 className="max-w-xl text-3xl font-extrabold text-red-900">
            Hei kollega! <br />
            Velg når du ønsker å bruke Miles-hytten
          </h1>
        </div>
      </div>
      <Form
        method="post"
        onSubmit={(e) => {
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
            }, 2000);
          }, 2000);
          e.preventDefault();
        }}
        className="max-w-xl"
      >
        <div className="pb-4 pt-4">
          <h2
            className={
              "sticky top-0 mb-4 border-b bg-gray-100 bg-opacity-90 pb-2 pt-2 text-2xl font-extrabold"
            }
          >
            Velg ferier i {year}
          </h2>
          <p className="text-miles-red-900">
            Her kan du kan velge så mange ferier du vil. Vi ønsker å ta ekstra
            hensyn til ansatte med barn i skolealder når vi gjennomfører
            trekkingen for vinter- og høstferie.
          </p>
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
          </div>
        </div>

        <div className="pb-4 pt-4">
          <h2
            className={
              "sticky top-0 border-b bg-gray-100 bg-opacity-90 pb-2 pt-2 text-2xl font-extrabold"
            }
          >
            Velg uker i {year}
          </h2>
          <div className={"flex flex-col gap-4 pt-6"}>
            <FormCalendar year={year} />
          </div>
        </div>
        <div className="sticky bottom-0 flex justify-center border-t bg-gray-100 bg-opacity-90 p-8 pt-4">
          <button
            className="btn btn-primary btn-lg rounded-full text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Sender inn..."
              : showSuccess
                ? "Sendt!"
                : "Send inn mine ønsker 🤞🏼"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CabinBookingPage;
