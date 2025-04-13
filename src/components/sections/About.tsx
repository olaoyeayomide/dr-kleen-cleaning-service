import React from "react";

const About: React.FC = () => {
  return (
    <section className="py-16 bg-bubble-bg bg-left bg-cover">
      <div className="container max-w-screen-lg mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center relative z-10">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative inline-block">
              <img
                src="https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg"
                alt="Cleaning Staff"
                className="rounded-2xl shadow-xl object-cover w-full md:h-1/2 aspect-square mx-auto"
              />
              {/* Experience Badge */}
              <div className="absolute right-0 top-1/4 translate-y-[-50%] bg-white rounded-none p-3 w-fit h-fit flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full border-l-4 border-t-4 border-yellow-400"></div>
                <div className="bg-white p-2 w-full h-full flex flex-col items-center justify-center">
                  <div className="flex items-baseline">
                    <span className="text-secondary text-3xl font-bold">
                      12
                    </span>
                    <span className="text-primary text-lg font-bold">+</span>
                  </div>
                  <span className="text-sm text-gray-800 font-extrabold">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 md:pl-12 relative z-10">
            <h2 className="font-bree text-2xl md:text-3xl font-bold text-secondary mb-4">
              Why will you choose
              <span className="font-normal break-words">our services?</span>
            </h2>
            <p className="mb-4 text-base text-pretty text-start font-normal text-gray-500">
              Here at DrKleen we focus on providing exceptional cleaning
              services with attention to detail and customer satisfaction.
            </p>
            <ul className="mb-6 max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <p className="text-sm text-start">
                  The housekeepers we hired are professionals who take pride in
                  doing excellent work and exceeding expectations.
                </p>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <p className="text-sm text-start">
                  We carefully screen all of our cleaners to ensure high-quality
                  service.
                </p>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <p className="text-sm text-start">
                  Providing reliable and professional cleaning services.
                </p>
              </li>
            </ul>

            <div className="flex gap-4">
              <button className="inline-flex justify-center items-center font-medium text-center text-white rounded-full bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd hover:bg-gradient-to-br text-sm px-6 py-2 ring ring-white">
                Get started
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
              <button className="px-6 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-secondary">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
