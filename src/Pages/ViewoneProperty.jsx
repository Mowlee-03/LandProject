import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Bath, BedDouble, Maximize } from 'lucide-react';
import { ONEPOST } from '../Store/Api';

export default function PropertyDetail() {
  const { postId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!property) return <p>No property details available.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      <Carousel showThumbs={true} infiniteLoop={true} className="mb-6">
        {property.image.map((img, index) => (
          <div key={index} className="aspect-video">
            <img src={img} alt={`Image ${index + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </Carousel>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 border rounded-md bg-card">
          <p className="mb-2 text-muted-foreground capitalize">Location: {property.location}, {property.district_name}</p>
          <p className="mb-2 capitalize">Category: {property.category_name}</p>
         
          <p className="mb-2">Price: ₹{property.price}</p>
          <p className="mb-2">Status: {property.isSold ? 'Sold' : 'Available'}</p>
        </div>

        <div className="p-4 border rounded-md bg-card">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BedDouble className="h-5 w-5" />
              <span>{property.bedroom} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-5 w-5" />
              <span>{property.bathroom} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-5 w-5" />
              <span>{property.area} sqft</span>
            </div>            
          </div>
          <p className="mb-2">Description: {property.description}</p>
        </div>
      </div>
    </div>
  );
}
