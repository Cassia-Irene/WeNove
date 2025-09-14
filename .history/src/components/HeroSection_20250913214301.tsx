"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function HeroSection() {
  const heroImages = [
    "/carrossel-1.jpeg",
    "/carrossel-2.jpg",
    "/carrossel-3.jpg",
    "/carrossel-4.jpg",
    "/carrossel-5.jpg",
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      
      {/* Swiper só com imagens */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        speed={1200}
        loop={true}
        slidesPerView={1}
        className="absolute inset-0 w-full h-full"
      >
        {heroImages.map((src, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />

            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/60" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Texto fixo no centro */}
      <div className="absolute z-20 px-6 sm:px-6 lg:px-8 max-w-8xl text-center -translate-y-10">
        <h1
          className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[90px] text-white mb-5 sm:mb-6 leading-tight text-balance"
          style={{ fontFamily: "Futura, sans-serif" }}
        >
          Renovar é mais do que vestir diferente.
            
          <span className="text-[#ffcc00]"> É pensar diferente.</span>
        </h1>

        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-dosis font-medium text-white mb-7 sm:mb-8 text-pretty max-w-4xl mx-auto">
          Conectamos pessoas, marcas e cooperativas para dar uma nova
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          vida às peças. Aqui, moda, propósito e consciência se encontram.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-6 lg:gap-10 justify-center items-center">
          <Button className="bg-[#8f3332] text-white hover:bg-[#8b3130] px-6 sm:px-8 lg:px-9 py-5 sm:py-5 lg:py-6 font-dosis text-base sm:text-lg font-medium w-full sm:w-auto">
            <Link href="/Cadastro">Como Funciona</Link>
          </Button>
          <Button className="bg-[#88a51d] text-white hover:bg-[#708943] px-6 sm:px-7 lg:px-9 py-5 sm:py-5 lg:py-6 font-dosis text-base sm:text-lg font-medium w-full sm:w-auto"
          
          onClick={() =>
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })
  }
          >
            
            <Link href="/Cadastro">Faça seu Cadastro</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
