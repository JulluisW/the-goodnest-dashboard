import React from "react";

type Props = {
  minPrice: number;
  maxPrice: number | undefined;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number | undefined) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

export default function AdvancedFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <div className="bg-white p-4 rounded shadow grid gap-4 md:grid-cols-2 mt-4">
      <input
        type="text"
        placeholder="🔍 Search by name or description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value="">🍹 All Categories</option>
        <option value="juice">Juice</option>
        <option value="smoothie">Smoothie</option>
        <option value="tea">Tea</option>
      </select>

      <div className="flex gap-4 col-span-full">
        <input
          type="number"
          placeholder="💰 Min Price"
          value={minPrice}
          onChange={(e) => onMinChange(Number(e.target.value))}
          className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="number"
          placeholder="💰 Max Price"
          value={maxPrice ?? ""}
          onChange={(e) =>
            onMaxChange(e.target.value ? Number(e.target.value) : undefined)
          }
          className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
    </div>
  );
}
