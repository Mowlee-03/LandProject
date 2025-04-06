import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const ServicesSwiper = () => {
  // Real estate services data
  const services = [
    {
      id: 1,
      title: "Property Management",
      tagline: "Comprehensive management solutions for property owners",
      description: "We handle every aspect of property management so you don't have to, from tenant screening to maintenance.",
      features: ["24/7 maintenance support", "Tenant screening", "Rent collection", "Property inspections"],
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    },
    {
      id: 2,
      title: "Buying Assistance",
      tagline: "Find your dream home with expert guidance",
      description: "Our buying specialists help you navigate the market to find and secure the perfect property for your needs.",
      features: ["Property search", "Negotiation support", "Financing assistance", "Closing coordination"],
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
    },
    {
      id: 3,
      title: "Selling Services",
      tagline: "Maximize your property's value and sale speed",
      description: "Our proven marketing strategies and network of buyers help you sell your property quickly and at the best price.",
      features: ["Professional photography", "Virtual tours", "Targeted marketing", "Negotiation expertise"],
      image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg"
    },
    {
      id: 4,
      title: "Investment Consulting",
      tagline: "Turn properties into profitable investments",
      description: "Our experts analyze market trends and opportunities to help you make informed real estate investment decisions.",
      features: ["Market analysis", "ROI calculations", "Portfolio diversification", "Risk assessment"],
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg"
    }
  ];

  return (
    <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-12">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        className="w-full rounded-xl overflow-hidden shadow-md"
      >
        {services.map(service => (
          <SwiperSlide key={service.id}>
            <div className="relative w-full h-[90vh]  lg:h-[600px]">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 text-white">
                  <div className="max-w-3xl">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{service.title}</h2>
                    <p className="text-sm sm:text-base md:text-lg text-blue-300 mb-2 sm:mb-4 font-medium">{service.tagline}</p>
                    
                    <p className="text-xs sm:text-sm md:text-base mb-4 hidden sm:block">{service.description}</p>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs sm:text-sm text-gray-200">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <Link to='/services' className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
                        Learn More
                      </Link>
                      <Link to='/contact' className="border border-white hover:bg-white/20 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServicesSwiper;