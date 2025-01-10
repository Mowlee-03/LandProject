import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ChevronRight } from 'lucide-react'


const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Luxury Real Estate Trends in 2024',
    excerpt: 'Discover the latest trends shaping the luxury real estate market this year, from smart home integration to sustainable living solutions.',
    image: '/placeholder.svg?height=400&width=600',
    author: 'John Smith',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Luxury'
  },
  {
    id: 2,
    title: 'How to Stage Your Home for a Quick Sale',
    excerpt: 'Learn professional tips and tricks for staging your home to attract potential buyers and get the best possible price.',
    image: '/placeholder.svg?height=400&width=600',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    readTime: '4 min read',
    category: 'Tips'
  },
  {
    id: 3,
    title: 'Understanding Real Estate Investment Strategies',
    excerpt: 'A comprehensive guide to different real estate investment strategies and how to choose the right one for your goals.',
    image: '/placeholder.svg?height=400&width=600',
    author: 'Michael Brown',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Investment'
  }
]

const categories = ['All', 'Luxury', 'Tips', 'Investment', 'Market Analysis', 'Interior Design']

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Our Blog</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Stay updated with the latest insights, tips, and trends in real estate
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 overflow-x-auto"
        >
          <div className="flex gap-4 pb-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground hover:bg-accent'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                <button className="flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  Read More
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  )
}

