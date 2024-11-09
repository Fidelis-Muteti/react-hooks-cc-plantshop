import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleDeletePlant(id) {
    setPlants(plants.filter((plant) => plant.id !== id));
  }

  function handleUpdatePrice(updatedPlant) {
    setPlants(
      plants.map((plant) => (plant.id === updatedPlant.id ? updatedPlant : plant))
    );
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearchChange={setSearchTerm}/>
      <PlantList   plants={displayedPlants}
        onDeletePlant={handleDeletePlant}
        onUpdatePrice={handleUpdatePrice}/>
    </main>
  );
}

export default PlantPage;
