"use client";

import React, { useState } from "react";

type IngredientName =
  | "beet"
  | "apple"
  | "pineapple"
  | "cucumber"
  | "jicama"
  | "spinach"
  | "lemon"
  | "ginger"
  | "celery"
  | "orange"
  | "carrot"
  | "mint";

type Recipe = Partial<Record<IngredientName, number>>;

type VariantName =
  | "beet_the_day"
  | "leafin_good"
  | "cele_reset"
  | "vita_sea_mint";

const beet_the_day: Recipe = {
  beet: 350,
  apple: 300,
  pineapple: 350,
  cucumber: 350,
  jicama: 250,
};

const leafin_good: Recipe = {
  cucumber: 400,
  apple: 350,
  pineapple: 350,
  spinach: 150,
  lemon: 50,
  ginger: 15,
};

const cele_reset: Recipe = {
  celery: 1300,
};

const vita_sea_mint: Recipe = {
  orange: 1000,
  pineapple: 350,
  carrot: 300,
  cucumber: 250,
  mint: 15,
};

const recipes: Record<string, Recipe> = {
  beet_the_day,
  leafin_good,
  cele_reset,
  vita_sea_mint,
};

export default function ShoppingList() {
  const [shopping_list_output, set_shopping_list_output] = useState<any>(null);

  function calculateShoppingList(
    orders: Partial<Record<VariantName, number>>
  ): Partial<Record<IngredientName, number>> {
    const shoppingList: Partial<Record<IngredientName, number>> = {};
    for (const [variant, orderedMl] of Object.entries(orders)) {
      if (!orderedMl) continue;
      const recipe = recipes[variant as VariantName];
      if (!recipe) continue;
      const multiplier = orderedMl / 1000;
      for (const [ingredient, qtyPerBatch] of Object.entries(recipe) as [
        IngredientName,
        number
      ][]) {
        shoppingList[ingredient] =
          (shoppingList[ingredient] || 0) + qtyPerBatch * multiplier;
      }
    }

    return shoppingList;
  }

  async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(formData.entries());

      //   console.log("Form Values:", values);
      console.log(calculateShoppingList(values));

      set_shopping_list_output(calculateShoppingList(values));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <form onSubmit={onSubmitForm}>
        <div className="grid grid-cols-8 gap-10">
          {[
            { name: "beet_the_day", label: "Beet The Day" },
            { name: "leafin_good", label: "Leafin' Good" },
            { name: "cele_reset", label: "Celereset" },
            { name: "vita_sea_mint", label: "Vita-Sea-Mint" },
          ].map((juice) => (
            <div key={juice.name} className="flex flex-col col-span-4">
              <label htmlFor={juice.name}>{juice.label}</label>
              {/* <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center border rounded-sm overflow-hidden col-span-1">
                  <input
                    type="number"
                    name={juice.name}
                    min="0"
                    className="flex-1 p-2"
                    placeholder="0"
                  />
                  <span className="bg-gray-100 text-gray-700 px-2">
                    x 250ml
                  </span>
                </div>
                <div className="flex items-center border rounded-sm overflow-hidden col-span-1">
                  <input
                    type="number"
                    name={juice.name}
                    min="0"
                    className="flex-1 p-2"
                    placeholder="0"
                  />
                  <span className="bg-gray-100 text-gray-700 px-2">
                    x 500ml
                  </span>
                </div>
              </div> */}

              <div className="flex items-center border rounded-sm overflow-hidden">
                <input
                  type="number"
                  name={juice.name}
                  min="0"
                  className="flex-1 p-2"
                  placeholder="0"
                />
                <span className="bg-gray-100 text-gray-700 px-2">ml</span>
              </div>
            </div>
          ))}
          <div className="col-span-2">
            <button
              type="submit"
              className="border rounded-xl bg-green-500 text-white px-[2.5em] py-[0.6em]"
            >
              Calculate
            </button>
          </div>
        </div>
      </form>

      {shopping_list_output && (
        <div>
          <h3>Shopping List:</h3>
          <div className="capitalize">
            {Object.entries(shopping_list_output).map((list: any[]) => {
              return (
                <p key={list[0]}>
                  {list[0]} - {list[1]} gram
                </p>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
