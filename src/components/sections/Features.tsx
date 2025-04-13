import React from "react";

const Features: React.FC = () => {
  return (
    <section className="relative w-fit h-auto md:min-w-max md:min-h-20 flex-wrap md:flex-nowrap justify-between gap-10 items-center p-4 flex justify-self-center py-4 -mt-4 bg-white border border-gray-200 rounded-lg shadow-lg shadow-blue-500/50">
      <div className="mx-auto px-4">
        <div className="flex flex-col gap-8 sm:gap-0 md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Support 24/7 */}
          <div className="flex flex-col md:flex-row items-start gap-3 text-left">
            <img
              className="w-10 h-10"
              src="https://i.ibb.co/Q3g30yVJ/24-hours.png"
              alt="24/7 Support"
            />
            <div>
              <h2 className="text-base md:text-lg font-bold">Support 24/7</h2>
              <p className="text-xs md:text-sm">
                Monday - Friday (9:00a.m.-5:00p.m.)
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-10 border-l border-gray-300"></div>

          {/* Payment Secure */}
          <div className="flex flex-col md:flex-row items-start gap-3 text-left">
            <img
              className="w-10 h-10"
              src="https://i.ibb.co/6RyB9hzk/credit-card.png"
              alt="Payment Secure"
            />
            <div>
              <h2 className="text-base md:text-lg font-bold">Payment Secure</h2>
              <p className="text-xs md:text-sm">
                Free Contact with Cleaner Man
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-10 border-l border-gray-300"></div>

          {/* Top Cleaning Services */}
          <div className="flex flex-col md:flex-row items-start gap-3 text-left">
            <img
              className="w-10 h-10"
              src="https://i.ibb.co/Q3T28CBz/nettoyage-de-vitres.png"
              alt="Cleaning Services"
            />
            <div>
              <h2 className="text-base md:text-lg font-bold">
                Top Cleaning Services
              </h2>
              <p className="text-xs md:text-sm">Contact us 24 Hours a day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
