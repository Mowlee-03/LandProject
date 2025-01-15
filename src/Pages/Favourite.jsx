import { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Loader } from '../components/ui/Loader'
import PropertyCard from '../components/PropertyCard'


export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate fetching favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setFavorites([
          {
            id: 1,
            title: 'Modern Villa',
            location: 'Beverly Hills, CA',
            price: 2500000,
            image: '/placeholder.svg?height=400&width=600',
            beds: 4,
            baths: 3,
            sqft: 3200,
            type: 'For Sale'
          },
          // Add more properties as needed
        ])
      } catch (error) {
        console.error('Failed to fetch favorites:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleRemoveFavorite = async (id) => {
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setFavorites(prev => prev.filter(fav => fav.id !== id))
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  }

  return (
  
      
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
        ) : favorites.length === 0 ? (
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
              {favorites.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
  )
}

