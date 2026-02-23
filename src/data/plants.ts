export interface Plant {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  status: 'Здорова' | 'Потребує води' | 'Хворіє';
  age: number;
}

export const GARDEN_PLANTS: Plant[] = Array.from({ length: 25 }).map((_, i) => ({
  id: `plant-${i + 1}`,
  name: `Рослина ${i + 1}`,
  type: i % 3 === 0 ? 'Дерево' : i % 2 === 0 ? 'Кущ' : 'Квітка',
  imageUrl: `https://picsum.photos/seed/garden${i + 1}/200/200`,
  status: i % 5 === 0 ? 'Потребує води' : i % 7 === 0 ? 'Хворіє' : 'Здорова',
  age: Math.floor(Math.random() * 100) + 1,
}));
