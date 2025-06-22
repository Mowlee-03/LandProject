import { useEffect, useState } from "react";
import LOGO2 from '../Assets/Landlogo1.png'
import LOGO1 from '../Assets/Landlogo2.png'

const Logo = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Set initial value
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={isDark ? LOGO1 : LOGO2}
      alt="Logo"
      className="h-14  w-auto transition-all duration-300 bg-blend-color-burn"
    />
  );
};

export default Logo;
