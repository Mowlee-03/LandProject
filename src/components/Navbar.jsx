import { useState, useEffect, useRef ,useContext} from 'react'
import { Moon, Sun, Heart, LogOut, User, ChevronDown } from 'lucide-react'
import { useTheme } from './theme-provider'
import AuthModal from './auth/Authmodal'
import { UserContext } from '../Store/Provider/Userprovider'
import LogoutModal from './auth/LogoutModal'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { openAuthmodal } from '../Store/slices/authSlice'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const dropdownRef = useRef(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const anywhereopenAuthmodal=useSelector((data)=>{return data.auth.authmodal})
  
  
  useEffect(() => {
    if (anywhereopenAuthmodal) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [anywhereopenAuthmodal]);

  useEffect(() => {
    if (!showAuthModal) {
      dispatch(openAuthmodal(false));
    }
  }, [showAuthModal, dispatch]);
  const { user, logout } = useContext(UserContext)


  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = async () => {
    // Simulate some delay for the loading animation
    await new Promise(resolve => setTimeout(resolve, 1000))
    logout()
    setShowLogoutModal(false)
  }

  function favorite(params) {
    navigate("/favorites")
}
  return (
    <>
       <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-8">
            {/* Brand Logo */}
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">RealEstate</span>
            </a>

            {/* Navigation Links */}
            <div className="hidden md:flex md:gap-6">
              <Link to="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="/properties" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Properties
              </Link>
              <Link to="/blog" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Blog
              </Link>
              <Link to="/services" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Services
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-foreground hover:bg-muted"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-foreground hover:bg-muted"
                >
                  <User className="h-5 w-5" />
                  <span>{user.username || user.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-border bg-background shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-1">
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Signed in as <span className="font-medium text-foreground">{user.email}</span>
                      </div>
                      <div className="h-px bg-border" />
                      <button
                      onClick={favorite}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        <Heart  className="h-4 w-4" />
                        Favorites
                      </button>
                      <div className="h-px bg-border" />
                      <button
                        onClick={handleLogoutClick}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-muted"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}

