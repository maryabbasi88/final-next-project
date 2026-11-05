"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="مثلاً: پاستا، مرغ، سالاد..."
        className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 shadow-sm"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition shadow-sm"
      >
        جستجو
      </button>
    </form>
  );
}

export default SearchBar;
