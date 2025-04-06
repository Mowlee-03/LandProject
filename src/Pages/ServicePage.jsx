// src/components/ServiceComponent.js
import React from 'react';
import { 
  Home, 
  MapPin, 
  DollarSign, 
  Shield, 
  Users, 
  Star,
  Building2,
  PhoneCall
} from 'lucide-react';

const ServiceComponent = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Property Listings",
      description: "Explore our extensive database of premium properties across multiple locations with detailed information and high-quality images.",
      features: [
        "Residential Properties",
        "Commercial Spaces",
        "Luxury Estates",
        "Investment Opportunities"
      ]
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: "Location Analysis",
      description: "Get comprehensive market analysis and location insights to make informed real estate decisions.",
      features: [
        "Neighborhood Reports",
        "Market Trends",
        "Price Analysis",
        "Future Development Plans"
      ]
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
      title: "Financial Services",
      description: "Complete financial solutions including mortgage assistance and investment planning.",
      features: [
        "Mortgage Consulting",
        "Investment Options",
        "Loan Processing",
        "Financial Planning"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Legal Support",
      description: "Expert legal assistance throughout your real estate journey.",
      features: [
        "Contract Review",
        "Title Services",
        "Documentation",
        "Legal Consultation"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          filter: 'blur(8px)',
          WebkitFilter: 'blur(8px)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Service Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Premium Real Estate Services
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Discover comprehensive real estate solutions tailored to your needs with our expert team
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    className="flex items-center text-gray-700 text-sm"
                  >
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default ServiceComponent;