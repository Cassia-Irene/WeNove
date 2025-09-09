"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSection() {
  const heroImages = [
    "/carrossel-1.jpeg",
    "/carrossel-2.jpg",
    "/carrossel-3.jpg",
    "/carrossel-4.jpg",
    "/carrossel-5.jpg",
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center px-6">
      {/* Swiper como fundo */}
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
        effect="slide" // lateral
        className="absolute inset-0 w-full h-full"
      >
        {heroImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay escuro */}
      <div
        className=""
        style={{ opacity: 0.6 }}
      ></div>

      {/* Conteúdo central */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
        <h1
          className="text-4xl md:text-7xl text-[#ffffff] mb-6 leading-tight"
          style={{ fontFamily: "Futura, sans-serif" }}
        >
          Renovar é mais do que vestir
          <br />
          diferente.
          <span className="text-[#ffcc00]"> É pensar diferente.</span>
        </h1>

        <p className="text-lg md:text-[25px] font-dosis text-[#ffffff] mb-8 max-w-2xl leading-relaxed">
          Conectamos pessoas, marcas e cooperativas para dar uma nova
          <br />
          vida às peças. Aqui, moda, propósito e consciência se encontram.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button className="bg-[#8f3332] text-[#ffffff] hover:bg-[#8b3130] px-8 py-5 font-dosis text-lg font-medium rounded-full transition">
            Como Funciona
          </Button>
          <Button className="bg-[#88a51d] text-[#ffffff] hover:bg-[#708943] px-7 py-5 font-dosis text-lg font-medium rounded-full transition">
            Faça seu Cadastro
          </Button>
        </div>
      </div>
    </section>
  );
}
