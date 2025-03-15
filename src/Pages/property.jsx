import { useContext, useState, useEffect, useCallback } from 'react'
import { Search, SlidersHorizontal, X, Heart } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { UserContext } from '../Store/Provider/Userprovider'
import { Loader } from '../components/ui/Loader'
import axios from 'axios'
import { ALLPOST, DISTRICT_0F_POST, GETFAVOURITE, POSTCATEGORY } from '../Store/Api'

const priceRanges = [
  { min: 0, max: 100000, label: 'Under $100,000' },
  { min: 100000, max: 300000, label: '$100,000 - $300,000' },
  { min: 300000, max: 500000, label: '$300,000 - $500,000' },
  { min: 500000, max: 1000000, label: '$500,000 - $1,000,000' },
  { min: 1000000, max: null, label: 'Over $1,000,000' }
]

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const { user } = useContext(UserContext)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [districts, setDistricts] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        let postCategory = await axios.get(POSTCATEGORY)
        let dataofcategory = postCategory.data.data
        const categoryNames = dataofcategory.map((data) => data.name)
        setCategories(categoryNames);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories()
  }, [])

  useEffect(() => {
    const getDistricts = async () => {
      try {
        let postDistrict = await axios.get(DISTRICT_0F_POST)
        let dataofdistrict = postDistrict.data.data
        let districtNames = dataofdistrict.map((data) => data.name)
        setDistricts(districtNames);
      } catch (error) {
        console.log(error);
      }
    }
    getDistricts()
  }, [])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await axios.get(ALLPOST)
        setProperties(response.data.data)
      } catch (err) {
        console.error('Error fetching properties:', err)
        setError('Failed to load properties. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Extract to a separate function so we can call it when needed
  const fetchUserFavorites = useCallback(async () => {
    if (!user) return;
    
    try {
      const userfavdata = await axios.get(GETFAVOURITE(user.id))
      // Extract just the postIds into an array
      setUserFavorites(userfavdata.data.map(fav => fav.postId))
    } catch (err) {
      console.error('Error fetching favorites:', err)
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      fetchUserFavorites().finally(() => setIsLoading(false))
    }
  }, [user, fetchUserFavorites])

  // Function to handle favorite updates - can be passed down to PropertyCard
  const handleFavoriteUpdate = () => {
    if (user) {
      fetchUserFavorites()
    }
  }

  // Map favorites to properties
  const propertiesWithFavorites = properties.map(property => ({
    ...property,
    isFavorite: userFavorites.includes(property.id)
  }))

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    district: '',
    priceRange: '',
    sortBy: 'newest'
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      district: '',
      priceRange: '',
      sortBy: 'newest'
    })
  }

  const filteredProperties = (user ? propertiesWithFavorites : properties)
    .filter(property => {
      if (filters.search && !property.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.category && property.category_name !== filters.category) {
        return false
      }
      if (filters.district && property.district_name !== filters.district) {
        return false
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number)
        if (max && (property.price < min || property.price > max)) {
          return false
        }
        if (!max && property.price < min) {
          return false
        }
      }
      return true
    })
    .sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      if (filters.sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }
      if (filters.sortBy === 'priceHigh') {
        return b.price - a.price
      }
      if (filters.sortBy === 'priceLow') {
        return a.price - b.price
      }
      return 0
    })

  const Sidebar = () => (
    <div className="flex flex-col gap-6 p-4">
      {/* Search - Only visible on desktop */}
      <div className="hidden md:block">
        <h3 className="mb-4 font-semibold text-foreground">Search Location</h3>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search location..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Show Filters Button - Only visible on mobile */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:hidden"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filter sections - Conditionally rendered on mobile */}
      <div className={`space-y-6 md:block ${showFilters ? 'block' : 'hidden md:block'}`}>
        {/* Categories */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">Category</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => handleFilterChange('category', category)}
                  className="h-4 w-4 rounded-full border-primary text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range.label} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === `${range.min}-${range.max}`}
                  onChange={() => handleFilterChange('priceRange', `${range.min}-${range.max}`)}
                  className="h-4 w-4 rounded-full border-primary text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Districts */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">District</h3>
          <div className="space-y-2">
            {districts.map(district => (
              <label key={district} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="district"
                  checked={filters.district === district}
                  onChange={() => handleFilterChange('district', district)}
                  className="h-4 w-4 rounded-full border-primary text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">{district}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="mt-4 w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Properties</h1>

          {/* Mobile Search - Only visible on mobile */}
          <div className="relative md:hidden">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search location..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="priceLow">Price: Low to High</option>
            </select>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="rounded-md border border-input bg-background p-2 text-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden w-64 shrink-0 rounded-lg border border-border bg-card md:block">
            <Sidebar />
          </div>

          {/* Mobile Filter Sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
              <div className="fixed inset-y-0 right-0 w-full border-l border-border bg-background p-6 shadow-lg sm:max-w-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="rounded-full p-1 hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Sidebar />
              </div>
            </div>
          )}

          {/* Property Grid */}
          <div className="flex-1 h-screen overflow-auto overflow-x-hidden">
            {isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader size="large" />
              </div>
            ) : error ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <p className="text-lg text-destructive">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Try Again
                </button>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="mt-8 text-center text-muted-foreground">
                No properties found matching your criteria.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onFavoriteUpdate={handleFavoriteUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}