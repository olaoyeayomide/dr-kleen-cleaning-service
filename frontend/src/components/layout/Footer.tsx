import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-[12rem] px-6">
      <div className="container mx-auto max-w-screen-lg px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="https://i.ibb.co/LtcYFd9/Dr-Kleen-Logo2.png"
                alt="Dr-Kleen-Logo2"
                className="h-12 mr-2"
              />
              <div>
                <h3 className="font-bree text-xl font-bold">Dr.Kleen</h3>
                <p className="font-public text-sm text-gray-300">
                  Professional Cleaning Services
                </p>
              </div>
            </div>
            <p className="font-public text-sm text-gray-300">
              Providing exceptional cleaning services with attention to detail
              and customer satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bree text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bree text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  Deep Cleaning
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  Window Cleaning
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  Carpet Cleaning
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="font-public text-sm text-gray-300 hover:text-white transition"
                >
                  Office Cleaning
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bree text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                <span className="font-public text-sm text-gray-300">
                  123 Cleaning Street, City
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2 text-primary"></i>
                <span className="font-public text-sm text-gray-300">
                  +1 234 567 890
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-primary"></i>
                <span className="font-public text-sm text-gray-300">
                  info@drkleen.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-gray-300 pt-6 pb-10 text-sm text-gray-600 container max-w-screen-lg mx-auto">
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
              <p className="font-public text-sm text-gray-300">
                © {new Date().getFullYear()} Dr.Kleen. All rights reserved.
              </p>
            </div>

            {/* Follow Us */}
            <div className="flex text-white gap-4 text-xl">
              <a href="/social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/social">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/social">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
