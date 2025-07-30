"use client";

import MostPopular from "../_components/MostPopular";
import BestSellers from "../_components/BestSellers";
import Banner from "../_components/Banner";
import Footer from "../_components/Footer";
import { useCart } from "./CartContext";
import { useState } from "react";

function HomePage() {
  return (
    <div className={``}>
      <section className="mb-20">
        <Banner />
      </section>
      <section className=" mb-10">
        <MostPopular />
      </section>

      {/* <section className="mb-10">
          <Feature />
        </section> */}
      {/* 
      <section className="mb-20">
        <BestSellers />
      </section> */}
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
