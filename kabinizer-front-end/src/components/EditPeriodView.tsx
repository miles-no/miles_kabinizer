import { DrawService } from "../../api/services/DrawService";
import { format } from "date-fns";
import { useForm, FieldApi } from "@tanstack/react-form";
import { v4 as uuid } from "uuid";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="text-red-400">
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
    </div>
  );
}

const EditPeriodView = (props: { draw: object }) => {
  const { draw } = props;

  const formatStupidDate = (date: string | undefined) => {
    if (!date) return "";

    return format(new Date(date), "yyyy-MM-dd");
  };

  const form = useForm({
    defaultValues: {
      draw: draw,
    },
    onSubmit: async ({ value }) => {
      value?.draw?.periods.forEach((period) => {
        period.drawId = draw.id;
        period.id = period.id || uuid();
      });

      try {
        await DrawService.putApiDraw(value.draw);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleUpdatePeriods = (periods) => {
    periods.pushValue({
      periodStart: "",
      periodEnd: "",
      title: "",
    });
  };

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
              name="draw.title"
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
              name="draw.end"
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
                    value={formatStupidDate(field.state.value)}
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
              name="draw.isSpecial"
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
          <form.Field name="draw.periods">
            {(periods) => {
              return (
                <div>
                  {periods?.state?.value?.map((_, i) => {
                    return (
                      <div
                        className="mt-8 flex flex-col justify-between gap-4"
                        key={i}
                      >
                        <form.Field
                          name={`draw.periods[${i}].periodStart`}
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
                          {(periods) => {
                            return (
                              <div className="flex flex-col justify-between gap-4">
                                <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
                                  Periode start?
                                </label>
                                <input
                                  className="w-56 rounded bg-white p-1 text-justify text-black"
                                  onChange={(e) =>
                                    periods.handleChange(e.target.value)
                                  }
                                  value={formatStupidDate(periods.state.value)}
                                  onBlur={periods.handleBlur}
                                  name={periods.name}
                                  type="date"
                                />
                                <FieldInfo field={periods} />
                              </div>
                            );
                          }}
                        </form.Field>

                        <form.Field
                          name={`draw.periods[${i}].periodEnd`}
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
                          {(periods) => {
                            return (
                              <div className="flex flex-col justify-between gap-4">
                                <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
                                  Periode slutt?
                                </label>
                                <input
                                  className="w-56 rounded bg-white p-1 text-justify text-black"
                                  onChange={(e) =>
                                    periods.handleChange(e.target.value)
                                  }
                                  value={formatStupidDate(periods.state.value)}
                                  onBlur={periods.handleBlur}
                                  name={periods.name}
                                  type="date"
                                />
                                <FieldInfo field={periods} />
                              </div>
                            );
                          }}
                        </form.Field>
                        <form.Field name={`draw.periods[${i}].title`}>
                          {(periods) => {
                            return (
                              <div className="flex flex-col justify-between gap-4">
                                <label className="whitespace-nowrap rounded-xl bg-[#354A71] p-1 text-center">
                                  Periode tittel?
                                </label>
                                <input
                                  className="w-56 rounded bg-white p-1 text-justify text-black"
                                  onChange={(e) =>
                                    periods.handleChange(e.target.value)
                                  }
                                  value={periods.state.value}
                                  onBlur={periods.handleBlur}
                                  name={periods.name}
                                />
                                <FieldInfo field={periods} />
                              </div>
                            );
                          }}
                        </form.Field>
                        <form.Field name={`draw.periods[${i}].drawId`}>
                          {(periods) => {
                            return (
                              <input
                                className="invisible"
                                value={periods.state.value || draw.id}
                                name={periods.name}
                                readOnly
                              />
                            );
                          }}
                        </form.Field>
                        <form.Field name={`draw.periods[${i}].id`}>
                          {(periods) => {
                            return (
                              <input
                                className="invisible"
                                value={periods.state.value}
                                name={periods.name}
                                readOnly
                              />
                            );
                          }}
                        </form.Field>
                        <div className="w-full rounded bg-[#354A71] ">
                          <hr />
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-8 rounded bg-[#354A71] p-1 text-center hover:bg-blue-700">
                    <button
                      onClick={() => handleUpdatePeriods(periods)}
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

export default EditPeriodView;
