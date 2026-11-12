import SearchBar from "@/components/searchBar";

export default function HomePage() {
  return (
    <section 
      className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 text-center overflow-hidden"
      style={{ 
        backgroundImage: `url('/images/b1.webp')`,
      }}
    >
      <div className="absolute inset-0  dark:bg-black/40 transition-colors duration-500" />

      <div className="relative z-10 w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold   dark:text-white mb-4 drop-shadow-sm">
          چه غذایی دوست داری بپزی؟
        </h1>
        
        <p className="text-lg text-orange-500 dark:text-gray-300 mb-8 font-medium">
          ...نام غذا یا مواد اولیه را جستجو کن
        </p>

        <div className="w-full flex justify-center">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
