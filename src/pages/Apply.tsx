import { motion } from 'motion/react';
import { Send, Code, Layout, Sparkles, User, Link as LinkIcon } from 'lucide-react';
import GlossyButton from '../components/GlossyButton';
import { useState, FormEvent } from 'react';

export default function Apply() {
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
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-brand-grey-dark mb-6">Join the Collective</h1>
          <p className="text-xl text-brand-grey max-w-2xl mx-auto">
            We're looking for the top 1% of Roblox talent. Show us what you've built and let's create the future of play together.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 md:p-12 rounded-[3rem] bg-brand-grey-light border border-brand-grey/10 shadow-2xl relative overflow-hidden"
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
              <h3 className="text-3xl font-bold text-brand-grey-dark mb-4">Application Received!</h3>
              <p className="text-brand-grey mb-8">Our team will review your portfolio and get in touch if there's a match.</p>
              <GlossyButton onClick={() => setFormState('idle')}>Submit Another Application</GlossyButton>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-grey flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-grey flex items-center gap-2">
                    <Sparkles size={14} /> Roblox Username
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="RobloxPlayer123" 
                    className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-grey">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-grey flex items-center gap-2">
                    <Code size={14} /> Primary Specialization
                  </label>
                  <select 
                    required
                    defaultValue=""
                    className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select specialization</option>
                    <option value="scripting">Advanced Scripting</option>
                    <option value="modeling">3D Modeling / Assets</option>
                    <option value="environment">Environment Design</option>
                    <option value="ui">UI/UX Design</option>
                    <option value="animation">Animation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-grey flex items-center gap-2">
                  <LinkIcon size={14} /> Portfolio / Talent Hub Link
                </label>
                <input 
                  required
                  type="url" 
                  placeholder="https://roblox.com/users/..." 
                  className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-grey flex items-center gap-2">
                  <Layout size={14} /> Why do you want to join Overtime?
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us about your experience and what you can bring to the team..." 
                  className="w-full px-6 py-4 rounded-2xl bg-brand-white border border-brand-grey/20 focus:border-brand-grey-dark/40 focus:bg-brand-grey-light transition-all outline-none resize-none"
                />
              </div>

              <GlossyButton 
                type="submit" 
                className="w-full py-4 text-lg"
                disabled={formState === 'sending'}
              >
                {formState === 'sending' ? 'Submitting...' : 'Submit Application'}
              </GlossyButton>
            </form>
          )}
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-grey-light/50 rounded-full blur-[100px] -z-0 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
