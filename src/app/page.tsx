import { Suspense } from "react";

import CategorySelection from "@/components/Category/CategorySelection";
import ProductSection from "@/components/Product/ProductSection";

export default async function Home() {
  return (
    <>
      <main className="mt-24 w-full">
        <h3 className="w-full font-bold  capitalize md:text-xl">
          Want more spesific ? Just click one of these !{" "}
        </h3>

        <CategorySelection />

        <ProductSection />
      </main>
    </>
  );
}
