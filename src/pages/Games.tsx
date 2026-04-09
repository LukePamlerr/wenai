import { motion } from 'motion/react';
import { ExternalLink, Users, Star, Loader2 } from 'lucide-react';
import GlossyButton from '../components/GlossyButton';
import { useState, useEffect } from 'react';

interface RobloxGameData {
  id: number;
  placeId: string;
  name: string;
  description: string;
  playing: number;
  visits: number;
  favoritedCount: number;
  rating: number;
  icon: string;
}

export default function Games() {
  const gameIds = ['77271769255760', '94651883623491', '82042148124223', '16027267658'];
  const [games, setGames] = useState<RobloxGameData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const results = await Promise.all(
          gameIds.map(id => fetch(`/api/roblox/game/${id}`).then(res => res.json()))
        );
        setGames(results);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-brand-grey-dark mb-6">Our Portfolio</h1>
          <p className="text-xl text-brand-grey max-w-2xl">
            Explore the experiences we've developed. Featuring real-time data from our latest hits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-full bg-brand-grey-light rounded-[2rem] border border-brand-grey/10 p-12 flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="animate-spin text-brand-grey mb-4" size={32} />
              <p className="text-brand-grey font-medium">Fetching live data...</p>
            </div>
          ) : games.map((game, index) => (
            <motion.div
              key={game.placeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-brand-grey-light rounded-[2rem] border-2 border-brand-grey-dark/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative flex flex-col"
            >
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3 py-1 rounded-full bg-brand-grey-dark text-brand-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Live Now
                </div>
              </div>
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={game.icon} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md text-xs font-bold text-brand-grey-dark flex items-center gap-1 shadow-sm">
                    <Users size={12} />
                    {game.playing.toLocaleString()}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md text-xs font-bold text-brand-grey-dark flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {game.rating || '4.8'}
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-grey mb-2 block">
                  Roblox / Experience
                </span>
                <h3 className="text-2xl font-bold text-brand-grey-dark mb-4">{game.name}</h3>
                <p className="text-brand-grey text-sm leading-relaxed mb-6 flex-1">
                  {game.description ? (game.description.length > 150 ? game.description.substring(0, 150) + '...' : game.description) : "An immersive experience built with Overtime's signature high-fidelity standards."}
                </p>
                <div className="flex gap-4">
                  <a href={`https://www.roblox.com/games/${game.placeId}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <GlossyButton className="w-full py-3 text-xs group">
                      Play on Roblox
                      <ExternalLink size={14} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </GlossyButton>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
