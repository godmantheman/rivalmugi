export type WeaponCategory = 'Primary' | 'Secondary' | 'Melee' | 'Utility';

export type WeaponTier = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Weapon {
  id: string;
  name: string;
  category: WeaponCategory;
  tier: WeaponTier;
  image: string;
}

export interface Combination {
  ingredients: [string, string];
  result: string;
}
