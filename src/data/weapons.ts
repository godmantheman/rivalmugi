import { Weapon, WeaponCategory, WeaponTier } from '../types';

export const WEAPONS: Weapon[] = [
  // MELEE
  { id: 'glass_shard', name: '유리 파편', category: 'Melee', tier: 'Legendary', image: 'Glass_Shard.webp' },
  { id: 'maul', name: '몰', category: 'Melee', tier: 'Epic', image: 'Maul_29.webp' },
  { id: 'trowel', name: '트로웰', category: 'Melee', tier: 'Epic', image: 'Trowel_29.webp' },
  { id: 'scythe', name: '낫', category: 'Melee', tier: 'Epic', image: 'Scythe.webp' },
  { id: 'katana', name: '카타나', category: 'Melee', tier: 'Epic', image: 'Katana.webp' },
  { id: 'chainsaw', name: '전기톱', category: 'Melee', tier: 'Rare', image: 'Chainsaw.webp' },
  { id: 'battle_axe', name: '전투 도끼', category: 'Melee', tier: 'Rare', image: 'Battle_Axe.webp' },
  { id: 'sledgehammer', name: '슬레지해머', category: 'Melee', tier: 'Rare', image: 'Sledgehammer.webp' },
  { id: 'bat', name: '야구 배트', category: 'Melee', tier: 'Common', image: 'Bat.webp' },
  { id: 'knife', name: '나이프', category: 'Melee', tier: 'Common', image: 'Knife.webp' },
  { id: 'machete', name: '마체테', category: 'Melee', tier: 'Common', image: 'Machete.webp' },

  // PRIMARY
  { id: 'distortion', name: '디스토션', category: 'Primary', tier: 'Legendary', image: 'Distortion_29.webp' },
  { id: 'scepter', name: '셉터', category: 'Primary', tier: 'Legendary', image: 'Scepter_29.webp' },
  { id: 'permafrost', name: '퍼마프로스트', category: 'Primary', tier: 'Legendary', image: 'Permafrost_29.webp' },
  { id: 'grenade_launcher', name: '유탄 발사기', category: 'Primary', tier: 'Epic', image: 'Grenade_Launcher_29.webp' },
  { id: 'flamethrower', name: '화염방사기', category: 'Primary', tier: 'Epic', image: 'Flamethrower_29.webp' },
  { id: 'energy_rifle', name: '에너지 라이플', category: 'Primary', tier: 'Epic', image: 'Energy_Rifle_29.webp' },
  { id: 'paintball_gun', name: '페인트볼 건', category: 'Primary', tier: 'Epic', image: 'Paintball_Gun_29.webp' },
  { id: 'minigun', name: '미니건', category: 'Primary', tier: 'Epic', image: 'Minigun_29.webp' },
  { id: 'assault_rifle', name: '돌격 소총', category: 'Primary', tier: 'Rare', image: 'Assault_Rifle.webp' },
  { id: 'shotgun', name: '샷건', category: 'Primary', tier: 'Rare', image: 'Shotgun.webp' },
  { id: 'rpg', name: '알피지', category: 'Primary', tier: 'Rare', image: 'RPG.webp' },
  { id: 'sniper', name: '스나이퍼 라이플', category: 'Primary', tier: 'Epic', image: 'Sniper.webp' },
  { id: 'crossbow', name: '석궁', category: 'Primary', tier: 'Common', image: 'Crossbow.webp' },
  { id: 'bow', name: '활', category: 'Primary', tier: 'Common', image: 'Bow.webp' },

  // SECONDARY
  { id: 'warper', name: '워퍼', category: 'Secondary', tier: 'Legendary', image: 'Warper_29.webp' },
  { id: 'glass_cannon', name: '글래스 캐논', category: 'Secondary', tier: 'Legendary', image: 'Glass_Cannon_29.webp' },
  { id: 'slingshot', name: '새총', category: 'Secondary', tier: 'Epic', image: 'Slingshot_29.webp' },
  { id: 'energy_pistols', name: '에너지 피스톨', category: 'Secondary', tier: 'Epic', image: 'Energy_Pistols_29.webp' },
  { id: 'exogun', name: '엑소건', category: 'Secondary', tier: 'Epic', image: 'Exogun_29.webp' },
  { id: 'pistol', name: '권총', category: 'Secondary', tier: 'Rare', image: 'Pistol.webp' },
  { id: 'revolver', name: '리볼버', category: 'Secondary', tier: 'Rare', image: 'Revolver.webp' },
  { id: 'double_barrel', name: '더블 배럴', category: 'Secondary', tier: 'Common', image: 'Double_Barrel.webp' },
  { id: 'flare_gun', name: '플레어 건', category: 'Secondary', tier: 'Common', image: 'Flare_Gun.webp' },
  { id: 'submachine_gun', name: '기관단총', category: 'Secondary', tier: 'Rare', image: 'SMG.webp' },

  // UTILITY
  { id: 'medkit', name: '구급 상자', category: 'Utility', tier: 'Rare', image: 'Medkit.webp' },
  { id: 'shield', name: '방패', category: 'Utility', tier: 'Rare', image: 'Shield.webp' },
  { id: 'grenade', name: '수류탄', category: 'Utility', tier: 'Common', image: 'Grenade.webp' },
  { id: 'molotov', name: '화염병', category: 'Utility', tier: 'Common', image: 'Molotov.webp' },
  { id: 'c4', name: '씨포', category: 'Utility', tier: 'Epic', image: 'C4.webp' },
  { id: 'smoke_grenade', name: '연막탄', category: 'Utility', tier: 'Common', image: 'Smoke_Grenade.webp' },
  { id: 'flashbang', name: '섬광탄', category: 'Utility', tier: 'Common', image: 'Flashbang.webp' },
  { id: 'dice', name: '주사위', category: 'Utility', tier: 'Rare', image: 'Dice.webp' },
  { id: 'potion', name: '포션', category: 'Utility', tier: 'Rare', image: 'Potion.webp' },
  { id: 'horn', name: '뿔피리', category: 'Utility', tier: 'Rare', image: 'Horn.webp' },
];

export const HIDDEN_COMBINATIONS: Record<string, string> = {
  'knife+scythe': 'glass_shard',
  'scythe+knife': 'glass_shard',
  'battle_axe+chainsaw': 'maul',
  'chainsaw+battle_axe': 'maul',
  'knife+katana': 'trowel',
  'katana+knife': 'trowel',
};

export const combineWeapons = (w1: Weapon, w2: Weapon): Weapon => {
  // Check hidden combinations first
  const key = `${w1.id}+${w2.id}`;
  if (HIDDEN_COMBINATIONS[key]) {
    return WEAPONS.find(w => w.id === HIDDEN_COMBINATIONS[key])!;
  }

  // If different categories, return random utility
  if (w1.category !== w2.category) {
    const utilities = WEAPONS.filter(w => w.category === 'Utility');
    return utilities[Math.floor(Math.random() * utilities.length)];
  }

  // Same category logic
  const category = w1.category;
  const tierOrder: WeaponTier[] = ['Common', 'Rare', 'Epic', 'Legendary'];
  const t1Idx = tierOrder.indexOf(w1.tier);
  const t2Idx = tierOrder.indexOf(w2.tier);
  
  // Target tier is max of both + 1 (capped at Legendary)
  let targetTierIdx = Math.max(t1Idx, t2Idx);
  if (t1Idx === t2Idx && targetTierIdx < 3) {
    targetTierIdx++;
  }
  
  const targetTier = tierOrder[targetTierIdx];
  const possibleResults = WEAPONS.filter(w => w.category === category && w.tier === targetTier);
  
  if (possibleResults.length > 0) {
    return possibleResults[Math.floor(Math.random() * possibleResults.length)];
  }

  // Fallback to same category random
  const allInCategory = WEAPONS.filter(w => w.category === category);
  return allInCategory[Math.floor(Math.random() * allInCategory.length)];
};
