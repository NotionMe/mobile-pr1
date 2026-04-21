import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GARDEN_PLANTS, Plant } from '../data/plants';

interface PlantsState {
  plants: Plant[];
  sessionOnly: boolean;
  addPlant: (plant: Plant) => void;
  deletePlant: (plantId: string) => void;
  setSessionOnly: (sessionOnly: boolean) => void;
}

export const usePlantsStore = create<PlantsState>()(
  persist(
    (set) => ({
      plants: GARDEN_PLANTS,
      sessionOnly: false,
      addPlant: (plant) => set((state) => ({ plants: [plant, ...state.plants] })),
      deletePlant: (plantId) => set((state) => ({
        plants: state.plants.filter((plant) => plant.id !== plantId)
      })),
      setSessionOnly: (sessionOnly) => set({ sessionOnly }),
    }),
    {
      name: 'plants-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        if (state.sessionOnly) {
          return { sessionOnly: state.sessionOnly };
        }
        return {
          plants: state.plants,
          sessionOnly: state.sessionOnly,
        };
      },
    }
  )
);
