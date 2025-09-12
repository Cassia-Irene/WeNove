"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[90px] text-white mb-4 sm:mb-6 leading-tight text-balance"
          style={{ fontFamily: "Futura, sans-serif" }}
        >
          Renovar é mais do que vestir
          <br className="hidden sm:block" />
          diferente.
          <span className="text-[#ffcc00]"> É pensar diferente.</span>
        </h1>

        <p className="text-am md:text-3xl font-dosis font-medium text-white mb-8">
          Conectamos pessoas, marcas e cooperativas para dar uma nova
          <br />
          vida às peças. Aqui, moda, propósito e consciência se encontram.
        </p>

        <div className="flex flex-col sm:flex-row gap-10 justify-center">
          <Button className="bg-[#8f3332] text-white hover:bg-[#8b3130] px-9 py-6 font-dosis text-lg font-medium">
            Como Funciona
          </Button>
          <Button className="bg-[#88a51d] text-white hover:bg-[#708943] px-7 py-6 font-dosis text-lg font-medium">
            Faça seu Cadastro
          </Button>
        </div>
      </div>
    </section>
  );
}
