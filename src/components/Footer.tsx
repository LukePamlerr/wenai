import { Box, Github, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-grey-light border-t border-brand-grey/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="p-1.5 rounded-lg bg-brand-white text-brand-black">
              <Box size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-brand-white">Overtime</span>
          </Link>
          <p className="text-brand-grey max-w-sm leading-relaxed">
            Pushing the boundaries of Roblox Studio. We build immersive, high-fidelity experiences that redefine what's possible on the platform.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-brand-white mb-6">Quick Links</h4>
          <ul className="space-y-4 text-brand-grey">
            <li><Link to="/" className="hover:text-brand-white transition-colors">Home</Link></li>
            <li><Link to="/games" className="hover:text-brand-white transition-colors">Games</Link></li>
            <li><Link to="/team" className="hover:text-brand-white transition-colors">Our Team</Link></li>
            <li><Link to="/contact" className="hover:text-brand-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-brand-white mb-6">Socials</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-brand-grey-light border border-brand-grey/10 text-brand-grey hover:text-brand-white hover:scale-110 transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-brand-grey-light border border-brand-grey/10 text-brand-grey hover:text-brand-white hover:scale-110 transition-all">
              <Youtube size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-brand-grey-light border border-brand-grey/10 text-brand-grey hover:text-brand-white hover:scale-110 transition-all">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-grey/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-grey">
        <p>© 2026 Overtime Studio. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-white">Privacy Policy</a>
          <a href="#" className="hover:text-brand-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
