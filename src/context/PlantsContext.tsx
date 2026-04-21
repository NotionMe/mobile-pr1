import React, { createContext, useContext, ReactNode } from "react";
import { Plant } from "../data/plants";
import { usePlantsStore } from "../stores/usePlantsStore";

interface PlantsContextType {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
  deletePlant: (plantId: string) => void;
}

const PlantsContext = createContext<PlantsContextType>({
  plants: [],
  addPlant: () => {},
  deletePlant: () => {},
});

export const PlantsProvider = ({ children }: { children: ReactNode }) => {
  const plants = usePlantsStore((state) => state.plants);
  const addPlant = usePlantsStore((state) => state.addPlant);
  const deletePlant = usePlantsStore((state) => state.deletePlant);

  return (
    <PlantsContext.Provider value={{ plants, addPlant, deletePlant }}>
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => useContext(PlantsContext);
