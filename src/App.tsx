import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Plus, Equal, RotateCcw, Search, Filter, FlaskConical, Zap } from 'lucide-react';
import { WEAPONS, combineWeapons } from './data/weapons';
import { Weapon, WeaponCategory } from './types';

const TIER_COLORS = {
  Common: 'text-gray-400 border-gray-400/30 bg-gray-400/5',
  Rare: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  Epic: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  Legendary: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
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
      className={`${sizeClasses[size]} relative flex flex-col items-center justify-center p-2 rounded-xl border cursor-pointer transition-colors ${TIER_COLORS[weapon.tier]} group overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <img
        src={weapon.image}
        alt={weapon.name}
        className="w-full h-full object-contain mb-1 drop-shadow-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${weapon.id}/200/200`;
        }}
        referrerPolicy="no-referrer"
      />
      <span className="font-mono font-medium text-center truncate w-full">{weapon.name}</span>
      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-current opacity-50" />
    </motion.div>
  );
};

export default function App() {
  const [slot1, setSlot1] = useState<Weapon | null>(null);
  const [slot2, setSlot2] = useState<Weapon | null>(null);
  const [result, setResult] = useState<Weapon | null>(null);
  const [isCombining, setIsCombining] = useState(false);
  const [filter, setFilter] = useState<WeaponCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<{ id: string; w1: Weapon; w2: Weapon; result: Weapon }[]>([]);

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

    // Simulate lab delay
    setTimeout(() => {
      const combined = combineWeapons(slot1, slot2);
      setResult(combined);
      setHistory(prev => [{ id: Math.random().toString(36).substr(2, 9), w1: slot1, w2: slot2, result: combined }, ...prev].slice(0, 5));
      setIsCombining(false);
    }, 1500);
  };

  const handleReset = () => {
    setSlot1(null);
    setSlot2(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-100 font-sans selection:bg-orange-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-white/2 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <FlaskConical className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight font-mono">라이벌 무기 실험실</h1>
              <p className="text-xs text-gray-500 font-mono">RIVALS WEAPON COMBINATION LAB V1.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
              title="초기화"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Combination Bench */}
        <section className="relative">
          <div className="absolute inset-0 bg-orange-500/5 blur-3xl rounded-full -z-10" />
          
          <div className="flex flex-col items-center gap-12">
            <div className="flex items-center justify-center gap-4 md:gap-12">
              {/* Slot 1 */}
              <div 
                className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
                  slot1 ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSlot1(null)}
              >
                {slot1 ? (
                  <WeaponCard weapon={slot1} size="lg" />
                ) : (
                  <div className="text-gray-600 flex flex-col items-center gap-2">
                    <Plus className="w-8 h-8 opacity-20" />
                    <span className="text-[10px] uppercase tracking-widest font-mono">Slot A</span>
                  </div>
                )}
              </div>

              <div className="text-gray-700">
                <Plus className="w-8 h-8" />
              </div>

              {/* Slot 2 */}
              <div 
                className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
                  slot2 ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSlot2(null)}
              >
                {slot2 ? (
                  <WeaponCard weapon={slot2} size="lg" />
                ) : (
                  <div className="text-gray-600 flex flex-col items-center gap-2">
                    <Plus className="w-8 h-8 opacity-20" />
                    <span className="text-[10px] uppercase tracking-widest font-mono">Slot B</span>
                  </div>
                )}
              </div>

              <div className="text-gray-700">
                <Equal className="w-8 h-8" />
              </div>

              {/* Result Slot */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 border-white/10 bg-white/2 flex items-center justify-center relative overflow-hidden">
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
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-8 h-8 text-orange-500" />
                      </motion.div>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-orange-500">Processing...</span>
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
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        className="absolute inset-0 bg-orange-500/20 blur-xl -z-10 rounded-full"
                      />
                    </motion.div>
                  ) : (
                    <div className="text-gray-600 flex flex-col items-center gap-2">
                      <span className="text-2xl font-mono opacity-20">?</span>
                      <span className="text-[10px] uppercase tracking-widest font-mono">Output</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={handleCombine}
              disabled={!slot1 || !slot2 || isCombining}
              className={`px-12 py-4 rounded-full font-mono font-bold text-sm tracking-[0.2em] uppercase transition-all ${
                slot1 && slot2 && !isCombining
                  ? 'bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95'
                  : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isCombining ? '실험 중...' : '무기 조합하기'}
            </button>
          </div>
        </section>

        {/* Inventory / Selection */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {(['All', 'Primary', 'Secondary', 'Melee', 'Utility'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                    filter === cat
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {cat === 'All' ? '전체' : 
                   cat === 'Primary' ? '주무기' :
                   cat === 'Secondary' ? '보조무기' :
                   cat === 'Melee' ? '근접무기' : '유틸리티'}
                </button>
              ))}
            </div>

            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                placeholder="무기 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm w-full md:w-64 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono"
              />
            </div>
          </div>

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
            <div className="py-20 text-center text-gray-600 font-mono">
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </section>

        {/* Lab Log */}
        {history.length > 0 && (
          <section className="space-y-6 pt-12 border-t border-white/5">
            <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest">
              <FlaskConical className="w-4 h-4" />
              <span>실험 기록 (LAB LOG)</span>
            </div>
            <div className="space-y-3">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px]"
                >
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="truncate max-w-[60px]">{item.w1.name}</span>
                    <Plus className="w-3 h-3" />
                    <span className="truncate max-w-[60px]">{item.w2.name}</span>
                  </div>
                  <Equal className="w-3 h-3 text-gray-600" />
                  <div className={`flex items-center gap-2 ${TIER_COLORS[item.result.tier]}`}>
                    <img src={item.result.image} className="w-6 h-6 object-contain" alt="" />
                    <span className="font-bold">{item.result.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <Beaker className="w-8 h-8" />
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase">
            Designed for Rivals Weapon Simulation • 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
