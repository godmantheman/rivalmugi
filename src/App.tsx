import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Plus, ArrowRight, RotateCcw, Search, FlaskConical, Zap } from 'lucide-react';
import { WEAPONS, combineWeapons, RECIPES } from './data/weapons';
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
  const base = (import.meta as any).env?.BASE_URL || './';
  const separator = base.endsWith('/') ? '' : '/';
  return `${base}${separator}${cleanImg}`;
};

const WeaponCard: React.FC<{ weapon: Weapon; onClick?: () => void; size?: 'sm' | 'md' | 'lg' }> = ({ weapon, onClick, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-[10px]',
    md: 'w-24 h-24 text-xs',
    lg: 'w-32 h-32 text-sm',
  };

  const [imgSrc, setImgSrc] = useState(getImagePath(weapon.image));
  const [retryCount, setRetryCount] = useState(0);

  // Reset image when weapon changes
  useEffect(() => {
    setImgSrc(getImagePath(weapon.image));
    setRetryCount(0);
  }, [weapon.id, weapon.image]);

  const handleImageError = () => {
    const baseName = weapon.image.replace(/\.[^/.]+$/, ""); // remove extension
    const ext = ".webp";
    
    if (retryCount === 0) {
      // Try adding _29
      setImgSrc(getImagePath(`${baseName}_29${ext}`));
      setRetryCount(1);
    } else if (retryCount === 1) {
      // Try adding icon
      setImgSrc(getImagePath(`${baseName}icon${ext}`));
      setRetryCount(2);
    } else if (retryCount === 2) {
      // Try lowercase
      setImgSrc(getImagePath(`${baseName.toLowerCase()}${ext}`));
      setRetryCount(3);
    } else {
      // Fallback to placeholder
      setImgSrc(`https://picsum.photos/seed/${weapon.id}/200/200`);
    }
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
        src={imgSrc}
        alt={weapon.name}
        className="w-full h-full object-contain mb-1 drop-shadow-lg"
        onError={handleImageError}
        referrerPolicy="no-referrer"
      />
      <span className="font-mono font-medium text-center truncate w-full">{weapon.name}</span>
    </motion.div>
  );
};

const WeaponIcon: React.FC<{ weapon: Weapon; size?: number }> = ({ weapon, size = 32 }) => {
  const [imgSrc, setImgSrc] = useState(getImagePath(weapon.image));
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setImgSrc(getImagePath(weapon.image));
    setRetryCount(0);
  }, [weapon.id, weapon.image]);

  const handleImageError = () => {
    const baseName = weapon.image.replace(/\.[^/.]+$/, "");
    const ext = ".webp";
    if (retryCount === 0) { setImgSrc(getImagePath(`${baseName}_29${ext}`)); setRetryCount(1); }
    else if (retryCount === 1) { setImgSrc(getImagePath(`${baseName}icon${ext}`)); setRetryCount(2); }
    else if (retryCount === 2) { setImgSrc(getImagePath(`${baseName.toLowerCase()}${ext}`)); setRetryCount(3); }
    else { setImgSrc(`https://picsum.photos/seed/${weapon.id}/200/200`); }
  };

  return (
    <img 
      src={imgSrc} 
      className="object-contain" 
      style={{ width: size, height: size }} 
      alt="" 
      onError={handleImageError}
      referrerPolicy="no-referrer"
    />
  );
};

const HARD_MODE_BASE = ['fists', 'knife', 'bow', 'flare_gun', 'handgun', 'grenade', 'molotov'];

function LabApp() {
  const [slot1, setSlot1] = useState<Weapon | null>(null);
  const [slot2, setSlot2] = useState<Weapon | null>(null);
  const [result, setResult] = useState<Weapon | null>(null);
  const [isCombining, setIsCombining] = useState(false);
  const [filter, setFilter] = useState<WeaponCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<{ id: string; w1: Weapon; w2: Weapon; result: Weapon }[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [isHardMode, setIsHardMode] = useState(() => {
    const saved = localStorage.getItem('is_hard_mode');
    return saved === 'true';
  });
  const [discovered, setDiscovered] = useState<string[]>(() => {
    const saved = localStorage.getItem('discovered_weapons');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('discovered_weapons', JSON.stringify(discovered));
  }, [discovered]);

  useEffect(() => {
    localStorage.setItem('is_hard_mode', String(isHardMode));
  }, [isHardMode]);

  const THEME = useMemo(() => isHardMode ? {
    bg: 'bg-[#1A0B2E]',
    machineBorder: 'border-[#6B21A8]',
    machineBg: 'bg-[#2D1B4B]',
    accent: '#A855F7',
    accentSecondary: '#D8B4FE',
    titleBg: 'bg-[#7E22CE]',
    slotBg: 'bg-[#3B2B5B]',
    slotBorder: 'border-[#5B4B8B]',
    textAccent: 'text-[#D8B4FE]',
    inventoryBg: 'bg-[#2D1B4B]/50',
  } : {
    bg: 'bg-[#87CEEB]',
    machineBorder: 'border-[#3D5A8A]',
    machineBg: 'bg-[#E8F1F8]',
    accent: '#4ADE80',
    accentSecondary: '#3D5A8A',
    titleBg: 'bg-[#5B84C4]',
    slotBg: 'bg-[#D8E4EE]',
    slotBorder: 'border-[#BDC9D8]',
    textAccent: 'text-[#3D5A8A]',
    inventoryBg: 'bg-white/30',
  }, [isHardMode]);

  const filteredWeapons = useMemo(() => {
    return WEAPONS.filter((w) => {
      // In Hard Mode, only show base weapons or discovered weapons
      if (isHardMode && !HARD_MODE_BASE.includes(w.id) && !discovered.includes(w.id)) {
        return false;
      }
      const matchesFilter = filter === 'All' || w.category === filter;
      const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search, isHardMode, discovered]);

  const handleReset = () => {
    setSlot1(null);
    setSlot2(null);
    setResult(null);
  };

  const handleCombine = () => {
    if (!slot1 || !slot2) return;
    setIsCombining(true);
    setResult(null);

    setTimeout(() => {
      try {
        const combined = combineWeapons(slot1, slot2);
        setResult(combined);
        setHistory(prev => [{ id: Math.random().toString(36).substr(2, 9), w1: slot1, w2: slot2, result: combined }, ...prev].slice(0, 5));
        
        if (!discovered.includes(combined.id)) {
          setDiscovered(prev => [...prev, combined.id]);
        }
      } catch (err) {
        console.error("Combination Error:", err);
      } finally {
        setIsCombining(false);
      }
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${THEME.bg} flex flex-col items-center py-12 px-4 selection:bg-purple-500/30 transition-colors duration-700`}>
      {/* Title Bar */}
      <div className="relative mb-8 flex flex-col items-center gap-4">
        <div className={`${THEME.titleBg} border-4 ${THEME.machineBorder} rounded-xl px-12 py-3 flex items-center gap-4 shadow-lg transition-colors duration-700`}>
          <Settings className="w-8 h-8 text-white/80 animate-spin-slow" />
          <h1 className="text-3xl font-black text-white tracking-widest drop-shadow-md">무기 퓨즈머신</h1>
          <Settings className="w-8 h-8 text-white/80 animate-spin-slow-reverse" />
        </div>
        
        <button
          onClick={() => {
            setIsHardMode(!isHardMode);
            handleReset();
          }}
          className={`px-6 py-2 rounded-full font-black text-xs tracking-widest uppercase transition-all border-2 ${
            isHardMode 
              ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
              : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
          }`}
        >
          {isHardMode ? '💀 HARD MODE ACTIVE' : '⭐ NORMAL MODE'}
        </button>
      </div>

      {/* Main Machine Container */}
      <div className={`w-full max-w-5xl ${THEME.machineBg} border-[12px] ${THEME.machineBorder} rounded-[40px] p-12 shadow-2xl relative overflow-hidden transition-colors duration-700`}>
        {/* Rivets */}
        <div className={`absolute top-4 left-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 ${THEME.machineBorder}`} />
        <div className={`absolute top-4 right-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 ${THEME.machineBorder}`} />
        <div className={`absolute bottom-4 left-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 ${THEME.machineBorder}`} />
        <div className={`absolute bottom-4 right-4 w-4 h-4 bg-[#A0B8D0] rounded-full border-2 ${THEME.machineBorder}`} />

        <div className="flex flex-col items-center gap-12">
          <div className={`${THEME.textAccent} font-bold text-sm tracking-widest uppercase`}>○ 조합 슬롯 ○</div>

          <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
            {/* Slot 1 */}
            <div 
              className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 ${THEME.slotBorder} ${THEME.slotBg} flex flex-col items-center justify-center transition-all shadow-inner relative cursor-pointer hover:border-white/30 ${
                slot1 ? 'border-white/50' : ''
              }`}
              onClick={() => setSlot1(null)}
            >
              <div className="absolute top-2 left-2 w-2 h-2 bg-white/10 rounded-full" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/10 rounded-full" />
              {slot1 ? (
                <WeaponCard weapon={slot1} size="lg" />
              ) : (
                <div className={`${THEME.textAccent} opacity-40 flex flex-col items-center gap-2`}>
                  <Plus className="w-10 h-10" />
                  <span className="text-[10px] font-bold">무기 1 드래그</span>
                </div>
              )}
            </div>

            <div className={`flex flex-col items-center gap-1 ${THEME.textAccent} opacity-30`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              <Plus className="w-6 h-6" />
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>

            {/* Slot 2 */}
            <div 
              className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 ${THEME.slotBorder} ${THEME.slotBg} flex flex-col items-center justify-center transition-all shadow-inner relative cursor-pointer hover:border-white/30 ${
                slot2 ? 'border-white/50' : ''
              }`}
              onClick={() => setSlot2(null)}
            >
              <div className="absolute top-2 left-2 w-2 h-2 bg-white/10 rounded-full" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/10 rounded-full" />
              {slot2 ? (
                <WeaponCard weapon={slot2} size="lg" />
              ) : (
                <div className={`${THEME.textAccent} opacity-40 flex flex-col items-center gap-2`}>
                  <Plus className="w-10 h-10" />
                  <span className="text-[10px] font-bold">무기 2 드래그</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${THEME.slotBorder} border-2 border-white/20`} />
              <div className={`flex items-center ${THEME.textAccent} opacity-30`}>
                <ArrowRight className="w-8 h-8" />
              </div>
              <span className={`text-[10px] font-black ${THEME.textAccent} opacity-40 tracking-tighter`}>FUSE</span>
            </div>

            {/* Result Slot */}
            <div className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl border-4 ${THEME.machineBorder} bg-[#1A1D23] flex items-center justify-center relative overflow-hidden shadow-2xl`}>
              {/* Accent Lines */}
              <div className={`absolute left-4 top-4 bottom-4 w-[2px] opacity-30`} style={{ backgroundColor: THEME.accent }} />
              <div className={`absolute right-4 top-4 bottom-4 w-[2px] opacity-30`} style={{ backgroundColor: THEME.accent }} />
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
                      <Zap className="w-12 h-12" style={{ color: THEME.accent }} />
                    </motion.div>
                    <span className="text-[10px] font-bold animate-pulse" style={{ color: THEME.accent }}>FUSING...</span>
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
                      className="absolute inset-0 blur-2xl -z-10 rounded-full opacity-20"
                      style={{ backgroundColor: THEME.accent }}
                    />
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-5xl font-black opacity-20" style={{ color: THEME.accent }}>?</span>
                    <span className="text-[10px] font-bold opacity-40 text-center px-4" style={{ color: THEME.accent }}>조합 결과 대기중...</span>
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
                  className="w-8 h-full shadow-[0_0_10px_currentColor]" 
                  style={{ backgroundColor: THEME.accent, color: THEME.accent }}
                />
              </div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME.accent }} />
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
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME.accent }} />
              <div className="w-16 h-2 bg-[#1A1D23] rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: isCombining ? [-32, 32] : 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-8 h-full shadow-[0_0_10px_currentColor]" 
                  style={{ backgroundColor: THEME.accent, color: THEME.accent }}
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
                    ? isHardMode ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#3D5A8A] text-white border-[#3D5A8A]'
                    : isHardMode ? 'bg-purple-900/40 text-purple-300 border-purple-700/30 hover:bg-purple-800/50' : 'bg-white/50 text-[#3D5A8A] border-[#3D5A8A]/20 hover:bg-white'
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
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isHardMode ? 'text-purple-400/50' : 'text-[#3D5A8A]/50'}`} />
            <input
              type="text"
              placeholder="무기 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${isHardMode ? 'bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400/30' : 'bg-white/80 border-[#3D5A8A]/20 text-[#3D5A8A]'} border-2 rounded-full pl-10 pr-4 py-2 text-sm w-full md:w-64 focus:outline-none transition-all font-bold`}
            />
          </div>
        </div>

        <div className={`${THEME.inventoryBg} backdrop-blur-sm rounded-[32px] p-8 border-4 ${isHardMode ? 'border-purple-500/20' : 'border-[#3D5A8A]/10'} transition-colors duration-700`}>
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
            <div className={`py-20 text-center font-bold ${isHardMode ? 'text-purple-400/30' : 'text-[#3D5A8A]/50'}`}>
              <p>{isHardMode ? '해금된 무기가 없습니다. 조합을 통해 무기를 찾아보세요!' : '검색 결과가 없습니다.'}</p>
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
                  <WeaponIcon weapon={item.result} size={32} />
                  <span className="font-black text-sm">{item.result.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <footer className="mt-12 text-[#3D5A8A]/50 text-[10px] font-bold tracking-widest uppercase">
        RIVALS WEAPON FUSE MACHINE • 2026
      </footer>

      {/* Hint Button (Fixed Bottom Left) */}
      <button
        onClick={() => setShowRecipes(true)}
        className="fixed bottom-8 left-8 w-14 h-14 bg-[#3D5A8A] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(61,90,138,0.5)] hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <FlaskConical className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-12 left-0 bg-[#2D343E] px-3 py-1 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 text-white">
          조합법 도감 (HINT)
        </div>
      </button>

      {/* Recipes Modal */}
      <AnimatePresence>
        {showRecipes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowRecipes(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#2D343E] w-full max-w-2xl max-h-[80vh] rounded-[2.5rem] p-8 overflow-hidden flex flex-col border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#4ADE80]/10 rounded-xl border border-[#4ADE80]/20">
                    <FlaskConical className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight uppercase text-white">무기 조합 도감</h2>
                </div>
                <button 
                  onClick={() => setShowRecipes(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-white"
                >
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 gap-4">
                  {RECIPES.map((recipe, idx) => {
                    const w1 = WEAPONS.find(w => w.id === recipe.w1);
                    const w2 = WEAPONS.find(w => w.id === recipe.w2);
                    const res = WEAPONS.find(w => w.id === recipe.result);
                    
                    if (!w1 || !w2 || !res) return null;

                    // In Hard Mode, only show recipes where both ingredients are unlocked
                    if (isHardMode && (!HARD_MODE_BASE.includes(w1.id) && !discovered.includes(w1.id) || !HARD_MODE_BASE.includes(w2.id) && !discovered.includes(w2.id))) {
                      return null;
                    }

                    const isDiscovered = !recipe.isHidden || discovered.includes(res.id);

                    return (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          recipe.isHidden 
                            ? isDiscovered ? 'bg-[#3D5A8A]/10 border-[#3D5A8A]/30' : 'bg-black/40 border-white/5 opacity-50'
                            : 'bg-white/5 border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <WeaponIcon weapon={w1} size={28} />
                            <Plus className="w-3 h-3 text-[#3D5A8A]" />
                            <WeaponIcon weapon={w2} size={28} />
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#3D5A8A]" />
                          <div className="flex items-center gap-3">
                            {isDiscovered ? (
                              <>
                                <WeaponIcon weapon={res} size={36} />
                                <div className="flex flex-col">
                                  <span className={`text-xs font-black ${TIER_COLORS[res.tier].split(' ')[0]}`}>
                                    {res.name}
                                  </span>
                                  <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
                                    {recipe.isHidden ? 'Hidden Recipe' : 'Normal Recipe'}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-black/40 rounded-lg flex items-center justify-center border border-white/5">
                                  <span className="text-lg font-black text-white/10">?</span>
                                </div>
                                <span className="text-xs font-black text-white/20">미발견 히든 조합</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {recipe.isHidden && isDiscovered && (
                          <div className="px-3 py-1 bg-[#4ADE80]/10 rounded-full border border-[#4ADE80]/20">
                            <span className="text-[8px] font-black text-[#4ADE80] uppercase tracking-widest">Discovered!</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(61,90,138,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(61,90,138,0.5); }
      `}} />
    </div>
  );
}

export default function App() {
  return <LabApp />;
}
