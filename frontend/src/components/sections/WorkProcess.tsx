import React from "react";

const WorkProcess: React.FC = () => {
  return (
    <section className="bg-center h-fit py-16 overflow-hidden">
      <div className="container mx-auto max-w-screen-lg px-4 items-center">
        <div className="text-center mb-10">
          <h1 className="font-public text-primary text-xs md:text-sm tracking-widest">
            OUR WORKING PROCESS
          </h1>
          <h2 className="font-bree text-secondary mb-4 text-3xl sm:text-2xl md:text-4xl lg:text-4xl font-bold tracking-tight leading-none">
            WORK PROCESS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="max-w-full relative p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="absolute bottom-0 right-0 bg-blue-100 rounded-tl-full place-self-end w-20 h-20 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#0068d8]">01</span>
            </div>
            <h5 className="font-public text-secondary mb-4 text-xl font-bold tracking-tight">
              Book Online Form
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Dolor sit amet hac convallis cras facilisis. Platea nec sollicit
              nostra ipsum dui ullamcorper magnus.
            </p>
          </div>

          {/* Card 2 */}
          <div className="max-w-full relative pt-6 pr-6 pb-6 pl-20 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="absolute bottom-0 left-0 bg-blue-100 rounded-tr-full place-self-end w-20 h-20 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#0068d8]">02</span>
            </div>
            <h5 className="font-public text-secondary mb-4 text-xl font-bold tracking-tight">
              Get Confirmation
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Dolor sit amet hac convallis cras facilisis. Platea nec sollicit
              nostra ipsum dui ullamcorper magnus.
            </p>
          </div>

          {/* Card 3 */}
          <div className="max-w-full relative p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="absolute top-0 right-0 bg-blue-100 rounded-bl-full place-self-end w-20 h-20 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#0068d8]">03</span>
            </div>
            <h5 className="font-public text-secondary mb-4 text-xl font-bold tracking-tight">
              Estimate Budget
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Dolor sit amet hac convallis cras facilisis. Platea nec sollicit
              nostra ipsum dui ullamcorper magnus.
            </p>
          </div>

          {/* Card 4 */}
          <div className="max-w-full relative pt-6 pr-6 pb-6 pl-20 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="absolute top-0 left-0 bg-blue-100 rounded-br-full place-self-end w-20 h-20 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#0068d8]">04</span>
            </div>
            <h5 className="font-public text-secondary mb-4 text-xl font-bold tracking-tight">
              Hire Our Agent!
            </h5>
            <p className="text-sm text-gray-700">
              Dolor sit amet hac convallis cras facilisis. Platea nec sollicit
              nostra ipsum dui ullamcorper magnus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
