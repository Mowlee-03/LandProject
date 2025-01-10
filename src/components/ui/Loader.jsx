import { motion } from 'framer-motion'

export function Loader({ className = "", size = "default" }) {
  const sizes = {
    small: "h-3 w-3",
    default: "h-4 w-4",
    large: "h-5 w-5"
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <motion.div
        className={`rounded-full bg-primary ${sizes[size]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={`rounded-full bg-primary ${sizes[size]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      <motion.div
        className={`rounded-full bg-primary ${sizes[size]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />
    </div>
  )
}

