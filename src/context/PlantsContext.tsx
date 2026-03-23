import React, { createContext, useState, useContext, ReactNode } from "react";
import { GARDEN_PLANTS, Plant } from "../data/plants";

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
  const [plants, setPlants] = useState<Plant[]>(GARDEN_PLANTS);

  const addPlant = (plant: Plant) => {
    setPlants((prevPlants) => [plant, ...prevPlants]);
  };

  const deletePlant = (plantId: string) => {
    setPlants((prevPlants) =>
      prevPlants.filter((plant) => plant.id !== plantId)
    );
  };

  return (
    <PlantsContext.Provider value={{ plants, addPlant, deletePlant }}>
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => useContext(PlantsContext);
