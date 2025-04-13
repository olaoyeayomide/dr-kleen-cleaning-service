import React from "react";

const ContactTestimonials: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#FFFBF5] to-[#F5F5FF] overflow-hidden pt-16 pb-[12rem]">
      <div className="container max-w-screen-lg mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Section */}
          <div>
            <h2 className="font-bree text-4xl text-secondary font-bold mb-4">
              Contact us
            </h2>
            <p className="font-public mb-6 text-gray-500">
              In need of our services or have questions?
              <a
                href="/home"
                className="text-primary hover:text-secondary transition-colors"
              >
                Send us a message
              </a>
              and we will contact you within 1-2 business days.
            </p>
            <p className="mb-2 font-public">
              <strong className="text-secondary">Phone:</strong>
              <span className="text-primary">+2348189889475</span>
            </p>
            <p className="mb-6 font-public">
              <strong className="text-secondary">E-mail:</strong>
              <span className="text-primary">olawaleoni98@gmail.com</span>
            </p>
            <form action="#" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name*"
                  className="w-full p-3 font-public text-gray-700 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Phone number*"
                  className="w-full p-3 font-public text-gray-700 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <select className="w-full p-3 font-public text-gray-700 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Choose services</option>
              </select>
              <textarea
                placeholder="Message..."
                className="w-full p-3 font-public text-gray-700 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
              <button
                type="submit"
                className="bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd text-white px-6 py-3 rounded-md font-public font-semibold hover:opacity-90 transition-opacity"
              >
                Send
              </button>
            </form>
          </div>

          {/* Testimonials Section */}
          <div>
            <h2 className="font-bree text-4xl text-secondary font-bold mb-6">
              Testimonials
            </h2>
            <p className="mb-8 font-public text-gray-500">
              Each home is unique and we understand that. Our team is trained to
              take on majority of cleaning tasks.
            </p>
            <div className="flex flex-col gap-4 md:flex-row items-center">
              {/* Testimonial Card */}
              <div className="p-6 border border-gray-200 rounded-lg relative bg-white shadow-sm hover:shadow-md transition-shadow">
                <blockquote className="italic mb-4 font-public text-gray-600">
                  "As a web crawler expert, I help organizations adjust to the
                  expanding significance of internet promoting."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Farhan Rio"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-public font-bold text-secondary">
                      Farhan Rio
                    </p>
                    <p className="font-public text-primary">Agent Manager</p>
                  </div>
                </div>
              </div>
              {/* Testimonial Card */}
              <div className="p-6 border border-gray-200 rounded-lg relative bg-white shadow-sm hover:shadow-md transition-shadow">
                <blockquote className="italic mb-4 font-public text-gray-600">
                  "As a web crawler expert, I help organizations adjust to the
                  expanding significance of internet promoting."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Leofar Tom"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-public font-bold text-secondary">
                      Leofar Tom
                    </p>
                    <p className="font-public text-primary">
                      Founder of Ref Group
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTestimonials;
