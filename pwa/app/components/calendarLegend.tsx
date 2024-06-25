export function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className="border-2 border-primary rounded-full w-4 h-4 border-dashed" />
        <p className="text-primary font-bold">Ledig</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full w-4 h-4 bg-accent" />
        <p className="text-accent font-bold">Valgt</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full w-4 h-4 bg-primary" />
        <p className="text-primary font-bold">Tildelt</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full w-4 h-4 bg-gray-400" />
        <p className="text-gray-400 font-bold">Opptatt</p>
      </div>
    </div>
  );
}
