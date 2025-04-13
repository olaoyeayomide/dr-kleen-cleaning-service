import React from "react";

const GetEstimate: React.FC = () => {
  return (
    <section className="relative z-0 text-left flex items-center justify-center h-0">
      <div className="absolute z-10 h-64 w-3/5 place-items-center bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd border border-gray-200 rounded-lg shadow-lg shadow-blue-500/50 grid items-end">
        <svg
          className="absolute w-fit opacity-50 bg-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e3bb49"
            fillOpacity="1"
            d="M0,256L80,218.7C160,181,320,107,480,101.3C640,96,800,160,960,154.7C1120,149,1280,75,1360,37.3L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>

        <svg
          className="absolute w-fit opacity-60 bg-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e3bb49"
            fillOpacity="1"
            d="M0,0L30,0C60,0,120,0,180,26.7C240,53,300,107,360,122.7C420,139,480,117,540,96C600,75,660,53,720,69.3C780,85,840,139,900,181.3C960,224,1020,256,1080,250.7C1140,245,1200,203,1260,165.3C1320,128,1380,96,1410,80L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>

        <div className="absolute grid grid-cols-2 gap-8 place-items-center">
          <div className="px-8">
            <p className="font-bree text-3xl font-bold text-white z-20">
              Get Our Services, It's Affordable Save Time & Save Money.
            </p>
            <button
              type="button"
              className="font-public text-white border-solid border-2 border-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd hover:bg-gradient-to-br text-sm px-5 py-2.5 me-2 mb-2"
            >
              Booking Now
            </button>
          </div>
        </div>
      </div>
      <img
        className="absolute right-[12%] z-30 h-[300px] object-cover -mt-10"
        src="https://i.ibb.co/ydGsRzk/cheerful-ethnic-housewife-has-braids-poses-with-mop-detergent-bottle-happy-clean.png"
        alt="cheerful-ethnic-housewife-has-braids-poses-with-mop-detergent-bottle-happy-clean"
      />
    </section>
  );
};

export default GetEstimate;
