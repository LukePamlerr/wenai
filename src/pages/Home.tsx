import { ArrowRight, Code, Layout, Sparkles, Loader2, Users } from 'lucide-react';
import GlossyButton from '../components/GlossyButton';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const gameIds = ['77271769255760', '94651883623491', '82042148124223', '16027267658'];
  
  // For the home page, we'll fetch all and aggregate
  const [stats, setStats] = useState({ playing: 0, visits: 0, loading: true });

  useEffect(() => {
    async function fetchAllStats() {
      try {
        const results = await Promise.all(
          gameIds.map(id => fetch(`/api/roblox/game/${id}`).then(res => res.json()))
        );
        
        const totalPlaying = results.reduce((acc, curr) => acc + (curr.playing || 0), 0);
        const totalVisits = results.reduce((acc, curr) => acc + (curr.visits || 0), 0);
        
        setStats({ playing: totalPlaying, visits: totalVisits, loading: false });
      } catch (error) {
        console.error("Error fetching aggregate stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    }

    fetchAllStats();
    const interval = setInterval(fetchAllStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
        <div className="max-w-4xl z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-grey-light border border-brand-grey/10 text-brand-grey text-sm font-medium mb-8">
            <Sparkles size={14} className="text-brand-white" />
            <span>Redefining Roblox Development</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-brand-white mb-8 leading-[0.9]">
            We build the <span className="text-brand-grey">future</span> of immersive play.
          </h1>
          
          <p className="text-xl text-brand-grey mb-12 max-w-2xl mx-auto leading-relaxed">
            Overtime is a premier Roblox Studio collective. We specialize in high-fidelity environments, complex systems, and unforgettable gameplay.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/games">
              <GlossyButton className="group">
                Explore Games
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </GlossyButton>
            </Link>
            <Link to="/contact" className="text-brand-white font-semibold hover:text-brand-grey transition-colors">
              Start a Project
            </Link>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-grey-light rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-grey-light rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-brand-grey-light/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-brand-grey-light border border-brand-grey/10 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-white text-brand-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-white mb-4">Environment Design</h3>
              <p className="text-brand-grey leading-relaxed">
                From hyper-realistic cities to fantastical realms, we push the limits of Roblox lighting and terrain.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-brand-grey-light border border-brand-grey/10 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-white text-brand-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-white mb-4">Advanced Scripting</h3>
              <p className="text-brand-grey leading-relaxed">
                Custom engines, complex UI systems, and optimized backend logic built for performance and scale.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-brand-grey-light border border-brand-grey/10 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-white text-brand-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-white mb-4">Game Direction</h3>
              <p className="text-brand-grey leading-relaxed">
                We don't just build; we craft experiences. Full-cycle game production from concept to monetization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.loading ? (
              <div className="col-span-full h-48 bg-brand-grey-light/30 rounded-[2.5rem] flex items-center justify-center">
                <Loader2 className="animate-spin text-brand-grey" size={32} />
              </div>
            ) : (
              <>
                <div className="p-12 rounded-[2.5rem] bg-brand-grey-light border border-brand-grey/10 shadow-sm flex flex-col items-center justify-center text-center group hover:shadow-xl transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-green-900/30 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users size={32} />
                  </div>
                  <div className="text-5xl font-bold text-brand-white mb-2">
                    {stats.playing.toLocaleString()}
                  </div>
                  <div className="text-brand-grey font-bold uppercase tracking-widest text-sm">Live Players</div>
                  <div className="mt-4 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-tighter">Real-time Data</div>
                </div>

                <div className="p-12 rounded-[2.5rem] bg-brand-grey-light border border-brand-grey/10 shadow-sm flex flex-col items-center justify-center text-center group hover:shadow-xl transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-blue-900/30 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles size={32} />
                  </div>
                  <div className="text-5xl font-bold text-brand-white mb-2">
                    {stats.visits.toLocaleString()}
                  </div>
                  <div className="text-brand-grey font-bold uppercase tracking-widest text-sm">Total Visits</div>
                  <div className="mt-4 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-tighter">Cumulative Impact</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
