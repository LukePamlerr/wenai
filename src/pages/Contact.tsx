import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, Briefcase, ShoppingBag, Zap } from 'lucide-react';
import GlossyButton from '../components/GlossyButton';
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-brand-grey-dark mb-6">Partner With Overtime</h1>
          <p className="text-xl text-brand-grey max-w-2xl mx-auto">
            Whether you're looking to build, scale, or exit your Roblox experience, we're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex gap-6 items-start group">
              <div className="p-4 rounded-2xl bg-brand-grey-light text-brand-grey-dark group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-grey-dark mb-2">What We Do</h3>
                <p className="text-brand-grey leading-relaxed">
                  We specialize in partnerships, LiveOps management, full-cycle game development, and strategic acquisitions. We grow and scale top-tier Roblox experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="p-4 rounded-2xl bg-brand-grey-light text-brand-grey-dark group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-grey-dark mb-2">Hire Us</h3>
                <p className="text-brand-grey leading-relaxed">
                  Looking for elite talent for your next project? We provide full-service development, system architecture, and LiveOps management for top-tier experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="p-4 rounded-2xl bg-brand-grey-light text-brand-grey-dark group-hover:scale-110 transition-transform">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-grey-dark mb-2">Game Acquisitions</h3>
                <p className="text-brand-grey leading-relaxed">
                  We buy and scale existing Roblox games. If you're looking for an exit or want to see your creation reach its full potential through our LiveOps expertise, let's talk.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group pt-6 border-t border-brand-grey/10">
              <div className="p-4 rounded-2xl bg-brand-grey-dark text-brand-white group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-grey-dark mb-2">Direct Contact</h3>
                <a href="mailto:contact@overtime.org" className="text-brand-grey-dark font-bold hover:text-brand-grey transition-colors text-lg">contact@overtime.org</a>
                <div className="mt-2 flex gap-4">
                  <a href="#" className="text-brand-grey hover:text-brand-grey-dark transition-colors flex items-center gap-1 text-sm">
                    <MessageSquare size={14} />
                    Discord Community
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3rem] bg-brand-grey-light border border-brand-grey/10 shadow-2xl relative overflow-hidden"
          >
            {formState === 'sent' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-24"
              >
                <div className="w-20 h-20 rounded-full bg-green-900/30 text-green-400 flex items-center justify-center mb-8">
                  <Send size={32} />
                </div>
                <h3 className="text-3xl font-bold text-brand-grey-dark mb-4">Message Sent!</h3>
                <p className="text-brand-grey mb-8">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <GlossyButton onClick={() => setFormState('idle')}>Send Another Message</GlossyButton>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Subject</label>
                  <select 
                    required
                    defaultValue=""
                    className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="liveops">LiveOps Services</option>
                    <option value="acquisition">Game Acquisition</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-brand-grey-light/50 border border-brand-grey/10 text-sm text-brand-grey">
                  Looking to join the team? <Link to="/apply" className="text-brand-grey-dark font-bold hover:underline">Apply here</Link> instead.
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tell us about your project..." 
                    className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none resize-none"
                  />
                </div>

                <GlossyButton 
                  type="submit" 
                  className="w-full py-4 text-lg"
                  disabled={formState === 'sending'}
                >
                  {formState === 'sending' ? 'Sending...' : 'Send Message'}
                </GlossyButton>
              </form>
            )}
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-grey-light/50 rounded-full blur-[100px] -z-0 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
