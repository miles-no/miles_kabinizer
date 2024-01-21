export default function Gallery() {
  return (
    <div>
      <main className="grid grid-cols-1 grid-rows-[masonry] gap-4 p-6 md:grid-cols-2 xl:grid-cols-2">
        <img
          alt="Hytte utendørs"
          className="h-full w-full transform object-cover transition-transform duration-200 group-hover:scale-105"
          src="/hytta1.jpeg"
        />
        <img
          alt="Hytt utendørs nærbilde"
          className="h-full w-full transform object-cover transition-transform duration-200 group-hover:scale-105"
          src="/hytta2.jpeg"
        />
        <img
          alt="Hytte utendørs side"
          className="h-full w-full transform object-cover transition-transform duration-200 group-hover:scale-105"
          src="/hytta3.jpeg"
        />
        <img
          alt="Hytte innendørs stue"
          className="h-full w-full transform object-cover transition-transform duration-200 group-hover:scale-105"
          src="/hytta4.jpeg"
        />
        <img
          alt="Hytte innendørs soverom"
          className="h-full w-full transform object-cover transition-transform duration-200 group-hover:scale-105"
          src="/hytta5.jpeg"
        />
      </main>
    </div>
  );
}
