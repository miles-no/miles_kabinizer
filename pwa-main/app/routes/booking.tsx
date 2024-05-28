import Logo from "~/components/Logo";
import { Form, useLoaderData } from "@remix-run/react";
import { StyledCheckBoxWithLabel } from "~/components/StyledCheckBoxWithLabel";
import { FormCalendar } from "~/components/FormCalendar";
import { useState } from "react";

export async function loader() {
  return { year: new Date().getFullYear() };
}

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

  const { year } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-wrap justify-center p-4 xl:flex-nowrap">
      <div className="max-w-xl flex-grow">
        <div className="sticky top-8 xl:pr-8">
          <Logo />
          <div className="pb-6">
            <h1 className="max-w-xl text-3xl font-extrabold text-primary">
              Hei kollega!
            </h1>
            <p className="max-w-xl text-3xl font-extrabold text-primary">
              Her kan du bli med på hyttetrekking
            </p>
          </div>
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
        className="max-w-xl flex-grow"
      >
        <h2 className="max-w-xl text-2xl font-extrabold text-accent pb-4">
          Rettferdig hyttero for alle
        </h2>
        <p className="font-semibold text-primary">
          For at alle skal få gleden av hytten vår i Sirdal gjennomfører vi 6
          trekkinger i løpet av året.
          <br />
          <br />
          Se oversikt over trekninger for året som kommer her 👇
        </p>
        <div className="pb-4 pt-4">
          <h2
            className={
              "sticky top-0 mb-4 border-b bg-white pb-2 pt-2 text-2xl font-extrabold"
            }
          >
            Velg ferier i {year}
          </h2>
          <p>
            Her kan du kan velge så mange ferier du vil. Vi ønsker å ta ekstra
            hensyn til ansatte med barn i skolealder når vi gjennomfører
            trekkingen for vinter- og høstferie.
          </p>
          <div className={"flex flex-col gap-4 pt-6"}>
            <StyledCheckBoxWithLabel title="Vinterferien" name="vinterferie" />
            <StyledCheckBoxWithLabel
              title="Påskeferien - Første halvdel"
              name="påskeferie-første"
            />
            <StyledCheckBoxWithLabel
              disabled={true}
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
              "sticky top-0 border-b pb-2 pt-2 text-2xl bg-white font-extrabold"
            }
          >
            Velg uker i {year}
          </h2>
          <div className={"flex flex-col gap-4 pt-6"}>
            <FormCalendar year={year} />
          </div>
        </div>
        <div className="sticky bottom-0 flex justify-center p-8 pt-4">
          <button
            className="btn btn-lg rounded-full btn-accent text-white"
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
