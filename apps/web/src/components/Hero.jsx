import React from 'react';

function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/dfpj9filc/image/upload/v1792021518/IMG_0905_ipnup2.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
    </section>
  );
}

export default Hero;
