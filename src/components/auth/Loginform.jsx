import { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, AlertCircle,SmilePlus, } from 'lucide-react'
import axios from 'axios'
import { AUTH, LOGINUSER } from '../../Store/Api'
import { UserContext } from '../../Store/Provider/Userprovider'
import { SuccessLoader } from '../ui/Successloader'

export default function LoginForm({onClose, onToggleView }) {
  const {login}=useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [apiMessage, setApiMessage] = useState({ type: '', message: '' })
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset previous message
    setApiMessage({ type: '', message: '' })

    try {
      const response=await axios.post(LOGINUSER,formData)
      console.log(response);
      if (!response.ok) {
        setApiMessage({type:"error",message:response.data.message})
      }
      setApiMessage({type:"success",message:response.data.message})
      const authResponse=await axios.get(AUTH)
      console.log(authResponse);
      
      if (authResponse.data.message ==="Authenticated") {
        login(response.data.token)
        setIsSuccess(true)
        setTimeout(() => {
          onClose()
        }, 1000)
      }
      
    } catch (error) {
      setApiMessage({type:"error",message:error.response.data.message})
    }
  }
  if (isSuccess) {
    return <SuccessLoader/>
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Please sign in to your account
        </p>
      </div>

      {/* API Message */}
      <AnimatePresence>
        {apiMessage.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-md p-3 ${
              apiMessage.type === 'error' 
                ? 'bg-destructive/10 text-destructive' 
                : 'bg-green-500/10 text-green-500'
            }`}
          >
            <div className="flex items-center gap-2">
              {apiMessage.type === 'error' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <SmilePlus className="h-4 w-4" />
              )}
              <p className="text-sm">{apiMessage.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a
            href="#"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Sign in
        </motion.button>
      </form>

      {/* Toggle View */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <button
          onClick={onToggleView}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}

