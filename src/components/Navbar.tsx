import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Box } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Games', path: '/games' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 pointer-events-none">
      <div className="flex items-center gap-8 px-6 py-3 rounded-full glossy border border-white/10 bg-black/70 backdrop-blur-xl pointer-events-auto shadow-sm">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-brand-white text-brand-black group-hover:scale-110 transition-transform">
            <Box size={18} />
          </div>
          <span className="font-bold tracking-tight text-brand-white">Overtime</span>
        </Link>
        
        <div className="h-4 w-[1px] bg-brand-grey/20" />
        
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:text-brand-white",
                location.pathname === item.path 
                  ? "bg-brand-white text-brand-black shadow-md" 
                  : "text-brand-grey hover:bg-brand-grey-light"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
