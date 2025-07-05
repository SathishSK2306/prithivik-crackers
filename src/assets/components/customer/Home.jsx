import { Link } from "react-router-dom";
// import FeaturedProducts from "./FeaturedProducts";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="hero bg-[#06141B] text-[#CCDDCF] p-12 rounded-lg mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Prithivik Crackers
        </h1>
        <p className="text-xl mb-6">
          Premium quality crackers for all occasions
        </p>
        <Link
          to="/products"
          className="bg-[#259745] hover:bg-[#1e7e3a] text-white px-6 py-3 rounded-lg inline-block"
        >
          Shop Now
        </Link>
      </section>

      {/* <FeaturedProducts /> */}

      <section className="about-preview my-12">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="mb-6">
          Family-owned business since 1985, crafting the finest crackers in
          Tamil Nadu.
        </p>
        <Link to="/about" className="text-[#259745] hover:underline">
          Learn more about us →
        </Link>
      </section>
    </div>
  );
}
