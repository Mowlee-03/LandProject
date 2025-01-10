import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function SuccessLoader() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <Check className="h-8 w-8 text-green-500" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-foreground">Welcome back!</h3>
        <p className="text-sm text-muted-foreground">
          Login Successfull
        </p>
      </motion.div>
    </div>
  )
}

