import { Mail, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TeamMember {
  username: string;
  nickname: string;
  role: string;
  description: string;
}

const teamConfig: TeamMember[] = [
  {
    username: "LegendOfPopcorn",
    nickname: "Legend",
    role: "Owner",
    description: "The owner and driving force behind Overtime, overseeing all operations and studio growth."
  },
  {
    username: "InfoHavoc",
    nickname: "Havoc",
    role: "Lead, Manager",
    description: "Lead manager coordinating studio projects and ensuring smooth operational workflows."
  },
  {
    username: "XavScripted",
    nickname: "Xav",
    role: "Lead Developer",
    description: "Lead developer specializing in complex systems and high-performance Luau scripting."
  }
];

interface RobloxUserData {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

export default function Team() {
  const [teamData, setTeamData] = useState<(TeamMember & { avatarUrl: string | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await fetch("/api/roblox/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usernames: teamConfig.map(m => m.username) })
        });
        
        if (!response.ok) {
          const text = await response.text();
          console.error('Team API Error Response:', text);
          throw new Error(`Failed to fetch team data: ${response.status}`);
        }
        
        const robloxUsers: RobloxUserData[] = await response.json();
        
        const mergedData = teamConfig.map(member => {
          const robloxUser = robloxUsers.find(u => u.username.toLowerCase() === member.username.toLowerCase());
          return {
            ...member,
            avatarUrl: robloxUser?.avatarUrl || `https://picsum.photos/seed/${member.username}/400/400`
          };
        });
        
        setTeamData(mergedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load team members.");
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-brand-white mb-6">The Minds Behind Overtime</h1>
          <p className="text-xl text-brand-grey max-w-2xl mx-auto">
            We are an elite collective of artists, scripters, and designers united by a passion for creating the best experiences on Roblox.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="animate-spin text-brand-grey mb-4" size={48} />
            <p className="text-brand-grey font-medium">Loading team members...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24 text-red-500">
            <p className="text-xl font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
            {teamData.map((member, index) => (
              <div
                key={member.username}
                className="group"
              >
                <div className="relative mb-8">
                  <div className="aspect-square rounded-[3rem] overflow-hidden glossy border border-brand-grey/10 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 bg-brand-grey-light">
                    {member.avatarUrl && (
                      <img 
                        src={member.avatarUrl} 
                        alt={member.username} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-brand-white mb-1">{member.username}</h3>
                  <p className="text-brand-grey font-medium mb-2 italic">"{member.nickname}"</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-grey mb-4">{member.role}</p>
                  <p className="text-brand-grey leading-relaxed max-w-xs mx-auto">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="p-12 rounded-[3rem] bg-brand-grey-light/50 border border-brand-grey/10">
            <h3 className="text-3xl font-bold text-brand-white mb-6">Our Philosophy</h3>
            <p className="text-brand-grey leading-relaxed text-lg">
              At Overtime, we don't just build games; we craft digital worlds. Our team focuses on pushing the technical boundaries of the Roblox engine, from custom lighting systems to complex backend architectures. Every project is a testament to our commitment to quality, performance, and player immersion.
            </p>
          </div>

          <div className="p-12 rounded-[3rem] bg-brand-white text-brand-black">
            <h3 className="text-3xl font-bold mb-6">Expertise</h3>
            <ul className="space-y-4 text-brand-white/80 text-lg">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-white" />
                Advanced Luau Scripting
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-white" />
                High-Fidelity 3D Modeling
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-white" />
                Immersive Environment Design
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-white" />
                Custom UI/UX Frameworks
              </li>
            </ul>
          </div>
        </div>

        <div className="p-12 rounded-[3rem] bg-brand-grey-light border border-brand-grey/10 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-brand-white mb-6">Want to join the collective?</h2>
            <p className="text-brand-grey mb-10 max-w-xl mx-auto">
              We're always looking for the top 1% of Roblox talent. If you're a master of your craft and want to work on industry-leading projects, we want to hear from you.
            </p>
            <Link to="/apply">
              <button className="px-8 py-3 rounded-full bg-brand-white text-brand-black font-bold flex items-center gap-2 mx-auto hover:bg-brand-grey transition-colors">
                <Mail size={18} />
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
