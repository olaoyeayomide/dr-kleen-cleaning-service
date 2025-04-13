import React from "react";

const ServiceCard: React.FC<{
  image: string;
  title: string;
  description: string;
}> = ({ image, title, description }) => {
  return (
    <div className="group relative w-full lg:w-[25%] h-[25rem] md:h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition duration-300">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bree font-bold text-xl mb-1">{title}</h3>
            <p className="font-public text-sm text-gray-200">{description}</p>
          </div>
          <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transform transition duration-300 group-hover:rotate-90">
            <span className="text-xl">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      image: "https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg",
      title: "Deep Cleaning",
      description: "Professional deep cleaning services",
    },
    {
      image: "https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg",
      title: "Window Cleaning",
      description: "Crystal clear windows",
    },
    {
      image: "https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg",
      title: "Carpet Cleaning",
      description: "Deep carpet care",
    },
    {
      image: "https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg",
      title: "Kitchen Cleaning",
      description: "Sanitize your kitchen",
    },
    {
      image: "https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg",
      title: "Bathroom Cleaning",
      description: "Sparkling bathrooms",
    },
    {
      image: "https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg",
      title: "Office Cleaning",
      description: "Professional office maintenance",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 flex justify-center items-center overflow-hidden">
      <div className="container mx-auto max-w-screen-lg px-4">
        <div className="text-center mb-16">
          <p className="font-public text-xs md:text-sm tracking-widest text-primary mb-3">
            OUR BEST SERVICES
          </p>
          <h2 className="font-bree text-secondary mb-4 text-3xl sm:text-2xl md:text-4xl lg:text-4xl font-bold tracking-tight leading-none">
            Our Regular <span className="text-primary">Services</span> For{" "}
            <br />
            Our Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-rows-2 gap-6">
          {/* Upper Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <ServiceCard {...services[0]} />
            <ServiceCard {...services[1]} />
            <ServiceCard {...services[2]} />
          </div>

          {/* Lower Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <ServiceCard {...services[3]} />
            <ServiceCard {...services[4]} />
            <ServiceCard {...services[5]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
