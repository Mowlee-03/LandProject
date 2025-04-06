import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Bath, BedDouble, Maximize, MapPin, Share2 } from 'lucide-react';
import { ONEPOST } from '../Store/Api';

export default function PropertyDetail() {
  const { postId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(ONEPOST(postId));
        setProperty(response.data.data);
      } catch (err) {
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [postId]);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setActiveImageIndex(index);
    setOpenImageDialog(true);
  };

  const navigateImage = (direction) => {
    if (!property?.image?.length) return;
    let newIndex = activeImageIndex + direction;
    newIndex = (newIndex + property.image.length) % property.image.length;
    setActiveImageIndex(newIndex);
    setSelectedImage(property.image[newIndex]);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/properties/${postId}`;
    const shareData = {
      title: property.title,
      text: property.description.substring(0, 100) + '...',
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
      alert('Failed to share. Link copied to clipboard instead.');
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!property) return <p className="text-[rgb(var(--foreground))] text-center">No property details available.</p>;

  const propertyType = property.isSold ? 'Sold' : 'Available';

  return (
    <div className="bg-[rgb(var(--background))] min-h-screen">
      <div className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] py-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">{property.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-[rgb(var(--card))] rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <div className="absolute top-4 left-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] text-sm font-medium px-3 py-1 rounded-full z-10 shadow-md">
              {propertyType}
            </div>
            <Carousel 
              showThumbs={true} 
              infiniteLoop={true} 
              showStatus={false}
              className="mb-6"
            >
              {property.image.map((img, index) => (
                <div 
                  key={index} 
                  className="aspect-video cursor-pointer"
                  onClick={() => handleImageClick(img, index)}
                >
                  <img 
                    src={img} 
                    alt={`Image ${index + 1}`} 
                    className="object-cover w-full h-full hover:opacity-90 transition-opacity" 
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="p-6 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[rgb(var(--card-foreground))] mb-2">{property.title}</h1>
                <div className="flex items-center text-[rgb(var(--muted-foreground))]">
                  <MapPin size={18} className="mr-2" />
                  <span className="text-lg">{property.location}, {property.district_name}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgb(var(--secondary)/0.8)] transition-colors"
                  title="Share property"
                >
                  <Share2 size={30} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-[rgb(var(--muted))] p-4 rounded-xl mb-6 flex flex-wrap items-center justify-between">
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                ₹{parseFloat(property.price).toLocaleString()}
              </h2>
              <div className="flex flex-wrap gap-6 mt-2 sm:mt-0">
                <div className="flex items-center">
                  <BedDouble size={18} className="mr-2" />
                  <span className="text-[rgb(var(--foreground))] font-medium">
                    {property.bedroom} <span className="text-[rgb(var(--muted-foreground))]">Beds</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath size={18} className="mr-2" />
                  <span className="text-[rgb(var(--foreground))] font-medium">
                    {property.bathroom} <span className="text-[rgb(var(--muted-foreground))]">Baths</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Maximize size={18} className="mr-2" />
                  <span className="text-[rgb(var(--foreground))] font-medium">
                    {property.area} <span className="text-[rgb(var(--muted-foreground))]">sqft</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-[rgb(var(--foreground))]">About This Property</h3>
              <div className="text-[rgb(var(--foreground))] leading-relaxed bg-[rgb(var(--card))] p-4 rounded-lg border border-[rgb(var(--border))]">
                {property.description}
              </div>
              <p className="mt-4 text-[rgb(var(--muted-foreground))]">
                Category: <span className="text-[rgb(var(--foreground))] capitalize">{property.category_name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {openImageDialog && (
        <ImageDialog
          image={selectedImage}
          index={activeImageIndex}
          total={property.image?.length || 0}
          onClose={() => setOpenImageDialog(false)}
          onNavigate={navigateImage}
        />
      )}
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-[rgb(var(--background))]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[rgb(var(--border))] border-t-[rgb(var(--foreground))] rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center text-[rgb(var(--foreground))] text-sm font-medium">Loading</div>
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center min-h-screen bg-[rgb(var(--background))]">
    <div className="bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] px-6 py-4 rounded-lg border border-[rgb(var(--border))] max-w-md">
      <div className="font-bold text-lg mb-2">Error</div>
      <div>{message}</div>
    </div>
  </div>
);

const ImageDialog = ({ image, index, total, onClose, onNavigate }) => (
  <div 
    className="fixed inset-0 z-50 bg-[rgb(var(--primary))] bg-opacity-90 flex items-center justify-center p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div className="relative max-w-5xl w-full">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[rgb(var(--primary-foreground))] hover:text-[rgb(var(--primary-foreground)/0.8)] bg-[rgb(var(--primary))] bg-opacity-50 p-2 rounded-full"
      >
        <XIcon size={20} />
      </button>
      <div className="relative">
        <img 
          src={image} 
          alt="Preview" 
          className="w-full h-auto max-h-[80vh] object-contain" 
        />
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[rgb(var(--primary))] bg-opacity-50 text-[rgb(var(--primary-foreground))] p-3 rounded-full hover:bg-opacity-75 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[rgb(var(--primary))] bg-opacity-50 text-[rgb(var(--primary-foreground))] p-3 rounded-full hover:bg-opacity-75 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      <div className="text-[rgb(var(--primary-foreground))] text-center mt-4 font-medium">
        <span className="bg-[rgb(var(--primary))] px-4 py-1 rounded-full">
          {index + 1} / {total}
        </span>
      </div>
    </div>
  </div>
);

const ChevronLeft = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const XIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);