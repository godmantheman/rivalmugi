import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Plus, ArrowRight, RotateCcw, Search, FlaskConical, Zap } from 'lucide-react';
import { WEAPONS, combineWeapons } from './data/weapons';
import { Weapon, WeaponCategory } from './types';

const TIER_COLORS = {
  Common: 'text-gray-400 border-gray-400/30 bg-gray-400/5',
  Rare: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  Epic: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  Legendary: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
};

// Resolve image path correctly for GitHub Pages
const getImagePath = (img: string) => {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  // Remove leading slash if present to ensure relative path
  const cleanImg = img.startsWith('/') ? img.slice(1) : img;
  // Use import.meta.env.BASE_URL which is './' or the repo path
  const base = import.meta.env.BASE_URL || './';
  const separator = base.endsWith('/') ? '' : '/';
  return `${base}${separator}${cleanImg}`;
};

const WeaponCard: React.FC<{ weapon: Weapon; onClick?: () => void; size?: 'sm' | 'md' | 'lg' }> = ({ weapon, onClick, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-[10px]',
    md: 'w-24 h-24 text-xs',
    lg: 'w-32 h-32 text-sm',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${sizeClasses[size]} relative flex flex-col items-center justify-center p-2 rounded-xl border cursor-pointer transition-colors ${TIER_COLORS[weapon.tier]} group overflow-hidden bg-white/5`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <img
        src={getImagePath(weapon.image)}
        alt={weapon.name}
        className="w-full h-full object-contain mb-1 drop-shadow-lg"
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${weapon.id}/200/200`;
        }}
        referrerPolicy="no-referrer"
      />
      <span className="font-mono font-medium text-center truncate w-full">{weapon.name}</span>
    </motion.div>
  );
};

function LabApp() {
  const [slot1, setSlot1] = useState<Weapon | null>(null);
  const [slot2, setSlot2] = useState<Weapon | null>(null);
  const [result, setResult] = useState<Weapon | null>(null);
  const [isCombining, setIsCombining] = useState(false);
  const [filter, setFilter] = useState<WeaponCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<{ id: string; w1: Weapon; w2: Weapon; result: Weapon }[]>([]);

  useEffect(() => {
    console.log("App mounted successfully");
  }, []);

  const filteredWeapons = useMemo(() => {
    return WEAPONS.filter((w) => {
      const matchesFilter = filter === 'All' || w.category === filter;
      const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const handleCombine = () => {
    if (!slot1 || !slot2) return;
    setIsCombining(true);
    setResult(null);

    setTimeout(() => {
      try {
        const combined = combineWeapons(slot1, slot2);
        setResult(combined);
        setHistory(prev => [{ id: Math.random().toString(36).substr(2, 9), w1: slot1, w2: slot2, result: combined }, ...prev].slice(0, 5));
      } catch (err) {
        console.error("Combination Error:", err);
      } finally {
        setIsCombining(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#87CEEB] flex flex-col items-center py-12 px-4 selection:bg-blue-500/30">
      {/* Title Bar */}
      <div className="relative mb-8">
        <div className="bg-[#5B84C4] border-4 border-[#3D5A8A] rounded-xl px-12 py-3 flex items-center gap-4 shadow-lg">
          <Settings className="w-8 h-8 text-white/80 animate-spin-slow" />
          <h1 className="text-3xl font-black text-white tracking-widest drop-shadow-md">무기 퓨즈머신</h1>
          <Settings className="w-8 h-8 text-white/80 animate-spin-slow-reverse" />
        </div>
      </div>

      {/* Main Machine Container */}
      <div className="w-full max-w-5xl bg-[#E8F1F8] border-[12px] border-[#3D5A8A] rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
        {/* Rivets */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 border-[#3D5A8A]" />
        <div className="absolute top-4 right-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 border-[#3D5A8A]" />
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 border-[#3D5A8A]" />
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 border-[#3D5A8A]" />

        <div className="flex flex-col items-center gap-12">
          <div className="text-[#3D5A8A] font-bold text-sm tracking-widest uppercase">○ 조합 슬롯 ○</div>

          <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
            {/* Slot 1 */}
            <div 
              className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 border-[#BDC9D8] bg-[#D8E4EE] flex flex-col items-center justify-center transition-all shadow-inner relative cursor-pointer hover:border-[#3D5A8A]/30 ${
                slot1 ? 'border-[#3D5A8A]/50' : ''
              }`}
              onClick={() => setSlot1(null)}
            >
              <div className="absolute top-2 left-2 w-2 h-2 bg-[#A0B8D0] rounded-full" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#A0B8D0] rounded-full" />
              {slot1 ? (
                <WeaponCard weapon={slot1} size="lg" />
              ) : (
                <div className="text-[#3D5A8A]/40 flex flex-col items-center gap-2">
                  <Plus className="w-10 h-10" />
                  <span className="text-[10px] font-bold">무기 1 드래그</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-1 text-[#3D5A8A]/30">
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              <Plus className="w-6 h-6" />
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>

            {/* Slot 2 */}
            <div 
              className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 border-[#BDC9D8] bg-[#D8E4EE] flex flex-col items-center justify-center transition-all shadow-inner relative cursor-pointer hover:border-[#3D5A8A]/30 ${
                slot2 ? 'border-[#3D5A8A]/50' : ''
              }`}
              onClick={() => setSlot2(null)}
            >
              <div className="absolute top-2 left-2 w-2 h-2 bg-[#A0B8D0] rounded-full" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#A0B8D0] rounded-full" />
              {slot2 ? (
                <WeaponCard weapon={slot2} size="lg" />
              ) : (
                <div className="text-[#3D5A8A]/40 flex flex-col items-center gap-2">
                  <Plus className="w-10 h-10" />
                  <span className="text-[10px] font-bold">무기 2 드래그</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#BDC9D8] border-2 border-[#3D5A8A]/20" />
              <div className="flex items-center text-[#BDC9D8]">
                <ArrowRight className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black text-[#3D5A8A]/40 tracking-tighter">FUSE</span>
            </div>

            {/* Result Slot */}
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 border-[#3D5A8A] bg-[#1A1D23] flex items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Green Lines */}
              <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-[#4ADE80]/30" />
              <div className="absolute right-4 top-4 bottom-4 w-[2px] bg-[#4ADE80]/30" />
              <div className="absolute top-2 left-2 w-2 h-2 bg-white/10 rounded-full" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/10 rounded-full" />

              <AnimatePresence mode="wait">
                {isCombining ? (
                  <motion.div
                    key="combining"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Zap className="w-12 h-12 text-[#4ADE80]" />
                    </motion.div>
                    <span className="text-[10px] font-bold text-[#4ADE80] animate-pulse">FUSING...</span>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="relative z-10"
                  >
                    <WeaponCard weapon={result} size="lg" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-[#4ADE80]/20 blur-2xl -z-10 rounded-full"
                    />
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-5xl font-black text-[#4ADE80]/20">?</span>
                    <span className="text-[10px] font-bold text-[#4ADE80]/40 text-center px-4">조합 결과 대기중...</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-[#2D343E] rounded-2xl p-6 flex items-center gap-8 shadow-xl border-b-4 border-black/40">
            <div className="flex items-center gap-1">
              <div className="w-16 h-2 bg-[#1A1D23] rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: isCombining ? [0, 64] : 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-8 h-full bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]" 
                />
              </div>
              <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
            </div>

            <button
              onClick={handleCombine}
              disabled={!slot1 || !slot2 || isCombining}
              className={`w-20 h-20 rounded-full border-4 border-black/20 flex items-center justify-center transition-all relative group ${
                slot1 && slot2 && !isCombining
                  ? 'bg-[#3D5A8A] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(61,90,138,0.5)]'
                  : 'bg-[#1A1D23] cursor-not-allowed opacity-50'
              }`}
            >
              <div className="absolute inset-1 rounded-full border-2 border-white/5" />
              <span className="text-[10px] font-black text-white text-center leading-tight uppercase tracking-tighter">
                {isCombining ? '실험 중' : '조합\n시작'}
              </span>
            </button>

            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
              <div className="w-16 h-2 bg-[#1A1D23] rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: isCombining ? [-32, 32] : 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-8 h-full bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="w-full max-w-5xl mt-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {(['All', 'Primary', 'Secondary', 'Melee', 'Utility'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                  filter === cat
                    ? 'bg-[#3D5A8A] text-white border-[#3D5A8A]'
                    : 'bg-white/50 text-[#3D5A8A] border-[#3D5A8A]/20 hover:bg-white'
                }`}
              >
                {cat === 'All' ? '전체' : 
                 cat === 'Primary' ? '주무기' :
                 cat === 'Secondary' ? '보조무기' :
                 cat === 'Melee' ? '근접무기' : '유틸리티'}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3D5A8A]/50" />
            <input
              type="text"
              placeholder="무기 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/80 border-2 border-[#3D5A8A]/20 rounded-full pl-10 pr-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:border-[#3D5A8A] transition-all font-bold text-[#3D5A8A]"
            />
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-[32px] p-8 border-4 border-[#3D5A8A]/10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filteredWeapons.map((weapon) => (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                onClick={() => {
                  if (!slot1) setSlot1(weapon);
                  else if (!slot2) setSlot2(weapon);
                  setResult(null);
                }}
              />
            ))}
          </div>
          
          {filteredWeapons.length === 0 && (
            <div className="py-20 text-center text-[#3D5A8A]/50 font-bold">
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lab Log */}
      {history.length > 0 && (
        <div className="w-full max-w-5xl mt-12 bg-[#2D343E] rounded-[32px] p-8 border-4 border-black/20 shadow-xl">
          <div className="flex items-center gap-2 text-white/50 font-bold text-xs uppercase tracking-widest mb-6">
            <FlaskConical className="w-4 h-4" />
            <span>실험 기록 (LAB LOG)</span>
          </div>
          <div className="space-y-3">
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 bg-black/20 rounded-2xl border border-white/5"
              >
                <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                  <span className="truncate max-w-[80px]">{item.w1.name}</span>
                  <Plus className="w-3 h-3" />
                  <span className="truncate max-w-[80px]">{item.w2.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20" />
                <div className={`flex items-center gap-2 ${TIER_COLORS[item.result.tier]}`}>
                  <img src={getImagePath(item.result.image)} className="w-8 h-8 object-contain" alt="" />
                  <span className="font-black text-sm">{item.result.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <footer className="mt-12 text-[#3D5A8A]/50 text-[10px] font-bold tracking-widest uppercase">
        RIVALS WEAPON FUSE MACHINE • 2024
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 8s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

export default function App() {
  return <LabApp />;
}
