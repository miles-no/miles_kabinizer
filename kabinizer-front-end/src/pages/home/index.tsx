import Button from "../../components/Button";

export default function Home() {
  return (
    <div className="md:container md:mx-auto">
      <Welcome />
      <Location />
      <Activeties />
      <ImportantInformation />
    </div>
  );
}

const Welcome = () => {
  return (
    <section className="w-full py-6 lg:py-16">
      <div className="flex flex-col-reverse gap-4 px-4 md:px-6 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-4 space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Velkommen til Tjørhomfjellet
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I Miles Stavanger/Haugesund har vi tilgang til en flott firmahytte
            på Tjørhomfjellet i Sirdal, kun 1,5 time fra Stavanger. Her kan du
            ta med familie og venner og nyte alle årstider 😀
          </p>
          <div className="w-64">
            <Button
              className="self-center md:self-start"
              size="large"
              href="/select-periods"
            >
              Velg ønsket periode
            </Button>
          </div>
        </div>
        <div className="w-full lg:flex-1">
          <img src="/hytta1.jpeg" />
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-16">
      <div className="px-4 md:px-6">
        <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl">
          Lokasjon
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Odden 7D, 4443 Tjørhom
            </p>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Kjør inn til Tjørhom fjellet og ta første vei til høyre. Følg
              veien helt til endes. (du passerer stolheisen på venstre side)
              Hytten ligger på nederste rad, merket med Miles skilt utenfor
              døren. Du kan parkere langs veien hvor det er ledig.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3440.86712535045!2d6.839459895956754!3d58.91163451629089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m5!1s0x463a3549dd29f795%3A0xad7aeb21b80a9259!2sStavanger!3m2!1d58.9699756!2d5.7331074!4m3!3m2!1d58.912833299999996!2d6.8445833!5e0!3m2!1sen!2sno!4v1705840641650!5m2!1sen!2sno"
                className="w-full"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Activeties = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-16">
      <div className=" px-4 md:px-6">
        <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl">
          Aktiviteter
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Vinter aktiviteter
            </h3>
            <ul className="list-inside list-disc text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <li>Alpinanlegg med stolheis, tallerkenheis og tautrekk</li>
              <li>Langrennsløyper</li>
              <li>Opplyst akebakke</li>
              <li>Restaurant/bar</li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Sommer, vår, høst
            </h3>
            <ul className="list-inside list-disc text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <li>Vannpark</li>
              <li>Klatrepark</li>
              <li>Sommerheis</li>
              <li>Downhill sykling med stolheis</li>
              <li>Mountain carts</li>
              <li>Restaurant/bar</li>
              <li>Badeplass</li>
              <li>Minigolf</li>
              <li>Fjellgolf</li>
              <li>
                Kano til bruk for beboere på Tjørhomfjellet (ta med egne
                redningsvester) Gjelder gule kanoer (grønne er utleie). Husk å
                legge kano tilbake opp ned med årene under. Det ligger en ved
                stranda ved stolheisen og to stk ved klatreparken.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImportantInformation = () => {
  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-16">
      <div className=" px-4 md:px-6">
        <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl">
          Viktig informasjon
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Regler
            </h3>
            <ul className="list-inside list-disc text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <li>
                Firbente venner får lov til å bli med på hytta, men de får ikke
                være i sofa/senger!
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Hva du må ta med
            </h3>
            <ul className="list-inside list-disc text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <li>Sengetøy</li>
              <li>Håndklær</li>
              <li>Kjøkkenhåndklær</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
