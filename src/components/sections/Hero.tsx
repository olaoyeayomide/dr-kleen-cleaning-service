import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bubble Elements */}
        <div
          className="bubble"
          style={{ width: "60px", height: "60px", top: "20%", left: "10%" }}
        ></div>
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "25%", left: "40%" }}
        ></div>
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "40%", left: "25%" }}
        ></div>
        <div
          className="bubble"
          style={{ width: "50px", height: "50px", top: "60%", left: "50%" }}
        ></div>
        <div
          className="bubble"
          style={{ width: "100px", height: "100px", top: "30%", left: "90%" }}
        ></div>
        <div
          className="bubble"
          style={{ width: "40px", height: "40px", top: "60%", left: "85%" }}
        ></div>

        {/* Soap Icon */}
        <div className="absolute top-24 left-20 flex items-center justify-center">
          <img
            src="https://i.ibb.co/dJMz9r8Q/sponge-1.png"
            alt="Soap Icon"
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="container mx-auto max-w-screen-lg px-4 flex flex-col md:flex-row md:gap-16 items-center">
        {/* Left Content */}
        <div className="max-w-xl mb-10 md:mb-0 relative z-10">
          <h1 className="font-bree mb-4 xl:leading-[3.5rem] text-[2rem] font-extrabold tracking-tight text-secondary sm:text-5xl md:text-4xl xl:text-[3.25rem]">
            Experience the
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-primary relative inline-block">
              <span className="relative text-white">Ultimate</span>
            </span>
            Deep Cleaning with Dr.Kleen
          </h1>

          <p className="font-public mb-4 font-normal text-gray-500 text-base sm:text-lg md:text-xl lg:text-sm">
            At DrKleen, we offer comprehensive cleaning solutions tailored to
            your needs, from residential deep cleans to commercial sanitation.
            Discover our eco-friendly products and services that ensure a
            spotless environment for your home or business.
          </p>

          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd flex items-center justify-center shadow-lg">
              <i className="fas fa-play text-white"></i>
            </button>
            <button className="bg-gradient-to-r from-whiteGradientStart via-whiteGradientMid to-whiteGradientEnd text-secondary font-bold w-auto h-auto py-2 px-6 rounded-full ring ring-secondary flex items-center focus:shadow-lg focus:shadow-[#007bff]/50 active:shadow-lg active:shadow-[#007bff]/50">
              About us
              <i className="fas fa-arrow-right ml-2"></i>
            </button>

            {/* Arrow Icon */}
            <div className="flex items-center place-self-start mb-6 w-24">
              <img
                src="https://i.ibb.co/Fk199VXF/swirly-arrow-4.png"
                className="w-16"
                alt="Arrow"
              />
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="md:w-1/2 relative">
          <div className="z-10 relative mx-auto rounded-full from-yellow-300 to-yellow-800 overflow-hidden before:absolute before:h-[340px] before:w-[340px] before:rounded-full before:bg-gradient-to-b h-auto w-auto sm:before:h-[300px] sm:before:w-[300px] md:h-[400px] md:w-[400px] md:before:h-[380px] md:before:w-[380px] 2xl:h-[550px] 2xl:w-[550px] 2xl:before:h-[530px] 2xl:before:w-[530px]">
            <img
              src="https://i.ibb.co/ydGsRzk/cheerful-ethnic-housewife-has-braids-poses-with-mop-detergent-bottle-happy-clean.png"
              alt="Cleaning Professional"
              className="absolute z-0 bottom-0 right-0 h-full w-full object-cover"
            />

            {/* Small circle with person image */}
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden">
                <img
                  src="/api/placeholder/80/80"
                  alt="Customer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
