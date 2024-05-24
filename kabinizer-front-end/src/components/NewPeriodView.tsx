import { CreateDrawDto } from "../../api";
import { DrawService } from "../../api/services/DrawService";
import { createFormFactory, FieldApi } from "@tanstack/react-form";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="text-red-400">
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
    </div>
  );
}

const NewPeriodView = () => {
  const formFactory = createFormFactory<CreateDrawDto>({
    deadlineEnd: "",
    title: "",
    isSpecial: false,
    drawPeriods: [{ start: "", end: "", title: "" }],
  });

  const form = formFactory.useForm({
    onSubmit: async (values) => {
      console.log("asdf", values);
      try {
        await DrawService.postApiDraw(values.value);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-10 rounded bg-gray-300 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col justify-between gap-4">
            <label className=" rounded-xl bg-[#354A71] p-1 text-center">
              Trekning tittel
            </label>
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A title is required" : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    'No "error" allowed in title name'
                  );
                },
              }}
              children={(field) => (
                <>
                  <input
                    className="w-56 rounded bg-white p-1 text-justify text-black"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    name={field.name}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>

          <div className="flex flex-col justify-between gap-4">
            <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
              Frist
            </label>
            <form.Field
              name="deadlineEnd"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A deadline is required" : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    'No "error" allowed in title name'
                  );
                },
              }}
              children={(field) => (
                <>
                  <input
                    className="w-56 rounded bg-white p-1 text-justify text-black"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    name={field.name}
                    type="date"
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
              Er det en spesiell trekning?
            </label>
            <form.Field
              name="isSpecial"
              children={(field) => (
                <>
                  <input
                    className="w-56 rounded bg-white p-1 text-justify text-black"
                    onChange={(e) => field.handleChange(e.target.checked)}
                    onBlur={field.handleBlur}
                    name={field.name}
                    type="checkbox"
                    checked={field.state.value}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div className="w-full rounded bg-[#354A71]">
            <hr />
          </div>
          <form.Field name="drawPeriods">
            {(drawPeriods) => {
              return (
                <div>
                  {drawPeriods?.state?.value?.map((_, i) => {
                    return (
                      <div
                        className="mt-8 flex flex-col justify-between gap-4"
                        key={i}
                      >
                        <form.Field
                          name={`drawPeriods[${i}].start`}
                          validators={{
                            onChange: ({ value }) =>
                              !value ? "A start date is required" : undefined,
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: async ({ value }) => {
                              await new Promise((resolve) =>
                                setTimeout(resolve, 1000),
                              );
                              return (
                                value.includes("error") &&
                                'No "error" allowed in title name'
                              );
                            },
                          }}
                        >
                          {(drawPeriods) => {
                            return (
                              <div className="flex flex-col justify-between gap-4">
                                <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
                                  Periode fra?
                                </label>
                                <input
                                  className="w-56 rounded bg-white p-1 text-justify text-black"
                                  onChange={(e) =>
                                    drawPeriods.handleChange(e.target.value)
                                  }
                                  value={drawPeriods.state.value}
                                  onBlur={drawPeriods.handleBlur}
                                  name={drawPeriods.name}
                                  type="date"
                                />
                                <FieldInfo field={drawPeriods} />
                              </div>
                            );
                          }}
                        </form.Field>
                        <form.Field
                          name={`drawPeriods[${i}].end`}
                          validators={{
                            onChange: ({ value }) =>
                              !value ? "An enddate is required" : undefined,
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: async ({ value }) => {
                              await new Promise((resolve) =>
                                setTimeout(resolve, 1000),
                              );
                              return (
                                value.includes("error") &&
                                'No "error" allowed in title name'
                              );
                            },
                          }}
                        >
                          {(drawPeriods) => {
                            return (
                              <div className="flex flex-col justify-between gap-4">
                                <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
                                  Periode til?
                                </label>
                                <input
                                  className="w-56 rounded bg-white p-1 text-justify text-black"
                                  onChange={(e) =>
                                    drawPeriods.handleChange(e.target.value)
                                  }
                                  value={drawPeriods.state.value}
                                  onBlur={drawPeriods.handleBlur}
                                  name={drawPeriods.name}
                                  type="date"
                                />
                                <FieldInfo field={drawPeriods} />
                              </div>
                            );
                          }}
                        </form.Field>
                        <form.Field name={`drawPeriods[${i}].title`}>
                          {(drawPeriods) => {
                            return (
                              <div className="flex flex-col justify-between gap-4">
                                <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
                                  Periode tittel?
                                </label>
                                <input
                                  className="w-56 rounded bg-white p-1 text-justify text-black"
                                  onChange={(e) =>
                                    drawPeriods.handleChange(e.target.value)
                                  }
                                  value={drawPeriods.state.value}
                                  onBlur={drawPeriods.handleBlur}
                                  name={drawPeriods.name}
                                />
                                <FieldInfo field={drawPeriods} />
                              </div>
                            );
                          }}
                        </form.Field>
                        <div className="w-full rounded bg-[#354A71]">
                          <hr />
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-8 rounded bg-[#354A71] p-1 text-center hover:bg-blue-700">
                    <button
                      onClick={() =>
                        drawPeriods.pushValue({ start: "", end: "", title: "" })
                      }
                      type="button"
                    >
                      Legg til periode
                    </button>
                  </div>
                </div>
              );
            }}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="mt-8 flex gap-8">
                <div className="w-20 rounded bg-[#354A71] p-1 text-center hover:bg-blue-700">
                  <button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "..." : "Send inn"}
                  </button>
                </div>
                <div className="w-20 rounded bg-[#354A71] p-1 text-center hover:bg-blue-700">
                  <button type="reset" onClick={() => form.reset()}>
                    Slett
                  </button>
                </div>
              </div>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default NewPeriodView;
