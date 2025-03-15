// Modified PropertyCard.jsx
import { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Bath, BedDouble, Maximize } from 'lucide-react'
import axios from 'axios';
import { ADDFAVOURITE, REMOVEFAVOURITE } from '../Store/Api';
import { UserContext } from '../Store/Provider/Userprovider';
import { useDispatch } from 'react-redux';
import { openAuthmodal } from '../Store/slices/authSlice';

export default function PropertyCard({ property, onRemoveFavorite, isInFavoritesPage }) {
  const { user } = useContext(UserContext)
  const dispatch = useDispatch()
  // Local state to track favorite status
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);

  // Initialize local state from property
  useEffect(() => {
    setIsFavorite(property.isFavorite || false);
  }, [property.isFavorite]);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      dispatch(openAuthmodal(true))
      return
    }

    try {
      if (isFavorite || onRemoveFavorite) {
        // Call the remove favorite API with userId and property.id
        await axios.delete(REMOVEFAVOURITE, { data: { userId: user.id, postId: property.id } })
        // Update local state
        setIsFavorite(false);
        // If this is in the favorites page, call the onRemoveFavorite callback
        if (onRemoveFavorite) {
          onRemoveFavorite(property.id);
        }
      } else {
        // Call the add favorite API with userId and property.id
        await axios.post(ADDFAVOURITE, { userId: user.id, postId: property.id })
        // Update local state
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      // Optional: Show user-friendly error message
    }
  };
 
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={property.image[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
        {property.type}
      </div>
      
      {/* Only show heart button if not in favorites page */}
      {!isInFavoritesPage && (
        <button
          onClick={handleFavoriteClick}
          className="absolute right-4 top-16 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-foreground'
            }`}
          />
        </button>
      )}
      
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-card-foreground">
          {property.title}
        </h3>
        <p className="mb-2 text-sm text-muted-foreground">
          {property.location}
        </p>
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            <span>{property.bedroom} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathroom} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.area} sqft</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-card-foreground">
            ${property.price.toLocaleString()}
          </span>
          {isInFavoritesPage ? (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveFavorite(property.id);
              }}
              className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </button>
          ) : (
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              View Details
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}