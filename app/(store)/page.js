import Image from "next/image";
import hero1 from "@/public/hero1.png";
import MostPopular from "../_components/MostPopular";
import Feature from "../_components/Feature";
import BestSellers from "../_components/BestSellers";
import About from "../_components/About";
import Subscribe from "../_components/Subscribe";
import Footer from "../_components/Footer";
import Banner from "../_components/Banner";
import HomePage from "../_components/HomePage";

export default function Page() {
  return (
    <main>
      <HomePage />
      {/*
      <section className="mb-20">
        <Banner />
      </section>
      <section className=" mb-10">
        <MostPopular />
      </section>

     <section className="mb-10">
        <Feature />
      </section> 
      <section className="mb-20">
        <BestSellers />
      </section>
      <section>
        <Footer />
      </section>
      */}

      {/* 
      
      
      
      <section className="mb-20">
        <BestSellers />
      </section>
      <section className="mb-20">
        <About />
      </section>
      <section className="mb-30">
        <Subscribe />
      </section>
      <section>
        <Footer />
      </section>
      */}
    </main>
  );
}
