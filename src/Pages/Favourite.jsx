import { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Loader } from '../components/ui/Loader'
import PropertyCard from '../components/PropertyCard'
import { UserContext } from '../Store/Provider/Userprovider'
import axios from 'axios'
import { GETFAVOURITE, REMOVEFAVOURITE } from '../Store/Api'

// Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, propertyTitle }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
        <h3 className="mb-4 text-xl font-semibold">Remove Favorite</h3>
        <p className="mb-6">
          Are you sure you want to remove <span className="font-medium">{propertyTitle}</span> from your favorites?
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(GETFAVOURITE(user.id));
        setFavorites(response.data || []);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user && user.id) {
      fetchFavorites();
    } else {
      setIsLoading(false);
      setFavorites([]);
    }
  }, [user]);

  const openRemoveModal = (propertyId, propertyTitle) => {
    setSelectedProperty({ id: propertyId, title: propertyTitle });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProperty(null);
  };

  const handleRemoveFavorite = async (id) => {
    // If modal is open, close it first
    if (modalOpen) {
      closeModal();
    }
    
    try {
      await axios.delete(REMOVEFAVOURITE, { 
        data: { userId: user.id, postId: id } 
      });
      setFavorites(prev => prev.filter(fav => fav.postId !== id));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const confirmRemove = () => {
    if (selectedProperty) {
      handleRemoveFavorite(selectedProperty.id);
    }
  };

  return (
    <>
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your favorite properties
          </p>
        </div>
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader size="large" />
          </div>
        ) : !favorites || favorites.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No favorites yet
            </h2>
            <p className="mb-4 text-muted-foreground">
              Start adding properties to your favorites list
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Home className="h-4 w-4" />
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {favorites.map(favorite => (
                <PropertyCard
                  key={favorite.id}
                  property={{
                    ...favorite.post,
                    id: favorite.postId,
                    isFavorite: true
                  }}
                  onRemoveFavorite={(id) => openRemoveModal(id, favorite.post.title)}
                  isInFavoritesPage={true}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmRemove}
        propertyTitle={selectedProperty?.title || "this property"}
      />
    </>
  );
}