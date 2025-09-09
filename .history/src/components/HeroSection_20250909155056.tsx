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
    <section className="relative w-full h-screen">
      {/* Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        speed={1200}
        loop={true}
        slidesPerView={1}
        className="w-full h-full"
      >
        {heroImages.map((src, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full h-full"
          >
            {/* Imagem de fundo */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
            
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Conteúdo central */}
           <div className="absolute inset-0 flex items-center justify-center">
            
            <div className="relative z-10 max-w-4xl px-4">
            <h1
                className="text-4xl md:text-7xl text-white mb-6 leading-tight"
                style={{ fontFamily: "Futura, sans-serif" }}
            >
                Renovar é mais do que vestir
                <br />
                diferente.
                <span className="text-[#ffcc00]"> É pensar diferente.</span>
            </h1>

            <p className="text-lg md:text-2xl text-white mb-8 leading-relaxed">
                Conectamos pessoas, marcas e cooperativas para dar uma nova
                <br />
                vida às peças. Aqui, moda, propósito e consciência se encontram.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="bg-[#8f3332] text-white hover:bg-[#8b3130] px-8 py-5 rounded-full font-dosis">
                Como Funciona
                </Button>
                <Button className="bg-[#88a51d] text-white hover:bg-[#708943] px-7 py-5 rounded-full font-dosis">
                Faça seu Cadastro
                </Button>
            </div>
            </div>
        </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
