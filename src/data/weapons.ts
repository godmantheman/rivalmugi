import { Weapon, WeaponCategory, WeaponTier } from '../types';

export const WEAPONS: Weapon[] = [
  // MELEE
  { id: 'glass_shard', name: '유리 파편', category: 'Melee', tier: 'Legendary', image: 'Glass_Shard_29.webp' },
  { id: 'maul', name: '몰', category: 'Melee', tier: 'Epic', image: 'Maul_29.webp' },
  { id: 'trowel', name: '트로웰', category: 'Melee', tier: 'Epic', image: 'Trowelicon.webp' },
  { id: 'scythe', name: '낫', category: 'Melee', tier: 'Epic', image: 'Scythe_icon.webp' },
  { id: 'katana', name: '카타나', category: 'Melee', tier: 'Epic', image: 'Katana_29.webp' },
  { id: 'chainsaw', name: '전기톱', category: 'Melee', tier: 'Rare', image: 'Chainsawicon.webp' },
  { id: 'battle_axe', name: '전투 도끼', category: 'Melee', tier: 'Rare', image: 'Battle_Axe_29.webp' },
  { id: 'knife', name: '나이프', category: 'Melee', tier: 'Common', image: 'Knife_29.webp' },
  { id: 'fists', name: '주먹', category: 'Melee', tier: 'Common', image: 'Fists_29.webp' },
  { id: 'daggers', name: '단검', category: 'Melee', tier: 'Rare', image: 'Daggersicon.webp' },
  { id: 'gunblade', name: '건블레이드', category: 'Melee', tier: 'Epic', image: 'Gunbladeicon.webp' },

  // PRIMARY
  { id: 'distortion', name: '디스토션', category: 'Primary', tier: 'Legendary', image: 'Distortion_29.webp' },
  { id: 'scepter', name: '셉터', category: 'Primary', tier: 'Legendary', image: 'Scepter_29.webp' },
  { id: 'permafrost', name: '퍼마프로스트', category: 'Primary', tier: 'Legendary', image: 'Permafrosticon.webp' },
  { id: 'grenade_launcher', name: '유탄 발사기', category: 'Primary', tier: 'Epic', image: 'Grenade_Launcher_29.webp' },
  { id: 'flamethrower', name: '화염방사기', category: 'Primary', tier: 'Epic', image: 'Flamethrower_29.webp' },
  { id: 'energy_rifle', name: '에너지 라이플', category: 'Primary', tier: 'Epic', image: 'Energy_Rifle_29.webp' },
  { id: 'paintball_gun', name: '페인트볼 건', category: 'Primary', tier: 'Epic', image: 'Paintball_Gun_29.webp' },
  { id: 'minigun', name: '미니건', category: 'Primary', tier: 'Epic', image: 'Minigunicon.webp' },
  { id: 'assault_rifle', name: '돌격 소총', category: 'Primary', tier: 'Rare', image: 'Assault-rifle-icon.webp' },
  { id: 'shotgun', name: '샷건', category: 'Primary', tier: 'Rare', image: 'Shotgun_29.webp' },
  { id: 'rpg', name: '알피지', category: 'Primary', tier: 'Rare', image: 'RPG_29.webp' },
  { id: 'crossbow', name: '석궁', category: 'Primary', tier: 'Common', image: 'Crossbow_29.webp' },
  { id: 'bow', name: '활', category: 'Primary', tier: 'Common', image: 'Bowicon.webp' },
  { id: 'burst_rifle', name: '버스트 라이플', category: 'Primary', tier: 'Rare', image: 'Bursticon.webp' },
  { id: 'freezeray', name: '냉동 광선', category: 'Primary', tier: 'Epic', image: 'Freezeray.webp' },
  { id: 'uzi', name: '우지', category: 'Primary', tier: 'Rare', image: 'Uzi.webp' },

  // SECONDARY
  { id: 'warper', name: '워퍼', category: 'Secondary', tier: 'Legendary', image: 'Warper_29.webp' },
  { id: 'glass_cannon', name: '글래스 캐논', category: 'Secondary', tier: 'Legendary', image: 'Glass_Cannon_29.webp' },
  { id: 'slingshot', name: '새총', category: 'Secondary', tier: 'Epic', image: 'Slingshot_29.webp' },
  { id: 'energy_pistols', name: '에너지 피스톨', category: 'Secondary', tier: 'Epic', image: 'Energy_Pistols_29.webp' },
  { id: 'exogun', name: '엑소건', category: 'Secondary', tier: 'Epic', image: 'Exogunicon.webp' },
  { id: 'revolver', name: '리볼버', category: 'Secondary', tier: 'Rare', image: 'Revolver_29.webp' },
  { id: 'flare_gun', name: '플레어 건', category: 'Secondary', tier: 'Common', image: 'Flare_Gun_29.webp' },
  { id: 'handgun', name: '핸드건', category: 'Secondary', tier: 'Common', image: 'Handgun_29.webp' },
  { id: 'shorty', name: '쇼티', category: 'Secondary', tier: 'Rare', image: 'Shorty_29.webp' },

  // UTILITY
  { id: 'medkit', name: '구급 상자', category: 'Utility', tier: 'Rare', image: 'Medkit.webp' },
  { id: 'shield', name: '방패', category: 'Utility', tier: 'Rare', image: 'Riot_Shield_29.webp' },
  { id: 'grenade', name: '수류탄', category: 'Utility', tier: 'Common', image: 'Grenade_29.webp' },
  { id: 'molotov', name: '화염병', category: 'Utility', tier: 'Common', image: 'Molotov_29.webp' },
  { id: 'smoke_grenade', name: '연막탄', category: 'Utility', tier: 'Common', image: 'Smoke_Grenade_29.webp' },
  { id: 'flashbang', name: '섬광탄', category: 'Utility', tier: 'Common', image: 'Flashbang_29.webp' },
  { id: 'dice', name: '주사위', category: 'Utility', tier: 'Rare', image: 'RNG_Dice.webp' },
  { id: 'elixir', name: '엘릭서', category: 'Utility', tier: 'Legendary', image: 'Elixir_29.webp' },
  { id: 'jump_pad', name: '점프 패드', category: 'Utility', tier: 'Rare', image: 'Jump_Pad.webp' },
  { id: 'snatchel', name: '스내첼', category: 'Utility', tier: 'Epic', image: 'Snatchel_29.webp' },
  { id: 'spray', name: '스프레이', category: 'Utility', tier: 'Common', image: 'Spray_29.webp' },
  { id: 'subspace_tripmine', name: '서브스페이스 트립마인', category: 'Utility', tier: 'Epic', image: 'Subspace_Tripmine_29.webp' },
  { id: 'horn', name: '뿔피리', category: 'Utility', tier: 'Rare', image: 'Warhone_29.webp' },
  { id: 'warpstone', name: '워프스톤', category: 'Utility', tier: 'Legendary', image: 'Warpstone_29.webp' },
];

export const HIDDEN_COMBINATIONS: Record<string, string> = {
  'knife+scythe': 'glass_shard',
  'scythe+knife': 'glass_shard',
  'battle_axe+chainsaw': 'maul',
  'chainsaw+battle_axe': 'maul',
  'knife+katana': 'trowel',
  'katana+knife': 'trowel',
  'katana+daggers': 'gunblade',
  'daggers+katana': 'gunblade',
  'katana+katana': 'distortion',
  'fists+fists': 'maul',
  'bow+crossbow': 'scepter',
  'crossbow+bow': 'scepter',
  'handgun+revolver': 'glass_cannon',
  'revolver+handgun': 'glass_cannon',
  'medkit+shield': 'elixir',
  'shield+medkit': 'elixir',
  'smoke_grenade+flashbang': 'subspace_tripmine',
  'flashbang+smoke_grenade': 'subspace_tripmine',
};

export const RECIPES: { w1: string; w2: string; result: string; isHidden?: boolean }[] = [
  // Hidden (from above)
  { w1: 'knife', w2: 'scythe', result: 'glass_shard', isHidden: true },
  { w1: 'battle_axe', w2: 'chainsaw', result: 'maul', isHidden: true },
  { w1: 'knife', w2: 'katana', result: 'trowel', isHidden: true },
  { w1: 'katana', w2: 'daggers', result: 'gunblade', isHidden: true },
  { w1: 'katana', w2: 'katana', result: 'distortion', isHidden: true },
  { w1: 'fists', w2: 'fists', result: 'maul', isHidden: true },
  { w1: 'bow', w2: 'crossbow', result: 'scepter', isHidden: true },
  { w1: 'handgun', w2: 'revolver', result: 'glass_cannon', isHidden: true },
  { w1: 'medkit', w2: 'shield', result: 'elixir', isHidden: true },
  { w1: 'smoke_grenade', w2: 'flashbang', result: 'subspace_tripmine', isHidden: true },

  // Normal Melee
  { w1: 'fists', w2: 'knife', result: 'daggers' },
  { w1: 'knife', w2: 'knife', result: 'chainsaw' },
  { w1: 'chainsaw', w2: 'knife', result: 'battle_axe' },
  { w1: 'chainsaw', w2: 'battle_axe', result: 'katana' },
  { w1: 'katana', w2: 'chainsaw', result: 'scythe' },
  { w1: 'katana', w2: 'scythe', result: 'maul' },
  { w1: 'fists', w2: 'fists', result: 'maul' },
  
  // Normal Primary
  { w1: 'bow', w2: 'bow', result: 'crossbow' },
  { w1: 'crossbow', w2: 'crossbow', result: 'assault_rifle' },
  { w1: 'assault_rifle', w2: 'shotgun', result: 'burst_rifle' },
  { w1: 'shotgun', w2: 'shotgun', result: 'uzi' },
  { w1: 'uzi', w2: 'assault_rifle', result: 'minigun' },
  { w1: 'minigun', w2: 'rpg', result: 'grenade_launcher' },
  { w1: 'grenade_launcher', w2: 'flamethrower', result: 'energy_rifle' },
  { w1: 'energy_rifle', w2: 'paintball_gun', result: 'freezeray' },
  { w1: 'freezeray', w2: 'minigun', result: 'permafrost' },
  
  // Normal Secondary
  { w1: 'flare_gun', w2: 'handgun', result: 'revolver' },
  { w1: 'handgun', w2: 'handgun', result: 'shorty' },
  { w1: 'shorty', w2: 'revolver', result: 'slingshot' },
  { w1: 'slingshot', w2: 'slingshot', result: 'energy_pistols' },
  { w1: 'energy_pistols', w2: 'energy_pistols', result: 'exogun' },
  { w1: 'exogun', w2: 'slingshot', result: 'warper' },

  // Normal Utility
  { w1: 'grenade', w2: 'molotov', result: 'smoke_grenade' },
  { w1: 'smoke_grenade', w2: 'smoke_grenade', result: 'flashbang' },
  { w1: 'flashbang', w2: 'flashbang', result: 'spray' },
  { w1: 'medkit', w2: 'medkit', result: 'dice' },
  { w1: 'dice', w2: 'dice', result: 'elixir' },
  { w1: 'elixir', w2: 'elixir', result: 'horn' },
  { w1: 'horn', w2: 'horn', result: 'snatchel' },
  { w1: 'snatchel', w2: 'snatchel', result: 'jump_pad' },
  { w1: 'jump_pad', w2: 'jump_pad', result: 'warpstone' },
];

export const combineWeapons = (w1: Weapon, w2: Weapon): Weapon => {
  const key1 = `${w1.id}+${w2.id}`;
  const key2 = `${w2.id}+${w1.id}`;

  // 1. Check Hidden
  const hiddenId = HIDDEN_COMBINATIONS[key1] || HIDDEN_COMBINATIONS[key2];
  if (hiddenId) {
    const found = WEAPONS.find(w => w.id === hiddenId);
    if (found) return found;
  }

  // 2. Check Defined Recipes
  const recipe = RECIPES.find(r => (r.w1 === w1.id && r.w2 === w2.id) || (r.w1 === w2.id && r.w2 === w1.id));
  if (recipe) {
    const found = WEAPONS.find(w => w.id === recipe.result);
    if (found) return found;
  }

  // 3. Category logic (Fallback)
  if (w1.category !== w2.category) {
    const utilities = WEAPONS.filter(w => w.category === 'Utility');
    return utilities[Math.floor(Math.random() * utilities.length)];
  }

  const category = w1.category;
  const tierOrder: WeaponTier[] = ['Common', 'Rare', 'Epic', 'Legendary'];
  const t1Idx = tierOrder.indexOf(w1.tier);
  const t2Idx = tierOrder.indexOf(w2.tier);
  
  let targetTierIdx = Math.max(t1Idx, t2Idx);
  if (t1Idx === t2Idx && targetTierIdx < 3) {
    targetTierIdx++;
  }
  
  const targetTier = tierOrder[targetTierIdx];
  const possibleResults = WEAPONS.filter(w => w.category === category && w.tier === targetTier);
  
  if (possibleResults.length > 0) {
    return possibleResults[Math.floor(Math.random() * possibleResults.length)];
  }

  const allInCategory = WEAPONS.filter(w => w.category === category);
  return allInCategory[Math.floor(Math.random() * allInCategory.length)];
};
