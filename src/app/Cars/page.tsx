"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCars, addCar, updateCar, deleteCar, Car } from "@/services/carsService";
import styles from "@/app/Home.module.css";
import CarsCard from "./CarsCard";

export default function Cars() {
  const queryClient = useQueryClient();

  const { data: cars, isLoading, error } = useQuery<Car[], Error>({
    queryKey: ["cars"],
    queryFn: fetchCars,
    staleTime: 300000,
  });

  const [formData, setFormData] = useState<Omit<Car, "_id">>({
    model: "",
    plate_number: "",
    color: "",
  });
  

  const addCarMutation = useMutation<Car, Error, Omit<Car, "_id">>({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: (data: { id: string; car: Car }) =>
      updateCar(data.id, data.car),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["cars"] });
      const previousCars = queryClient.getQueryData<Car[]>(["cars"]);

      queryClient.setQueryData<Car[]>(["cars"], (oldCars) =>
        oldCars
          ? oldCars.map((car) =>
            car._id === data.id ? { ...car, ...data.car } : car
          )
          : []
      );

      return { previousCars };
    },
    onError: (_error, _deletedUserId, context) => {
      queryClient.setQueryData(["cars"], context?.previousCars); 
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: (id: string) => deleteCar(id), 
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["cars"] });
      const previousCars = queryClient.getQueryData<Car[]>(["cars"]);
  
      queryClient.setQueryData<Car[]>(["cars"], (oldCars) =>
        oldCars ? oldCars.filter((car) => car._id !== id) : []
      );
  
      return { previousCars };
    },
    onError: (_error, _deletedUserId, context) => {
      queryClient.setQueryData(["cars"], context?.previousCars); 
    },
  });
  
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (car: Car) => {
    setEditingCarId(car._id!);
    setFormData({
      model: car.model,
      plate_number: car.plate_number,
      color: car.color,
    });
    setIsFormVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingCarId) {
      await updateCarMutation.mutate({ id: editingCarId, car: formData });
      setEditingCarId(null);
    } else {
      await addCarMutation.mutateAsync(formData);
    }

    setFormData({ model: "", plate_number: "", color: "" });
    setIsFormVisible(false);
  };

  const handleDelete = (id: string) => {
    deleteCarMutation.mutate(id);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setFormData({ model: "", plate_number: "", color: "" });
      setEditingCarId(null);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <button className={styles.button} onClick={toggleFormVisibility}>
        {isFormVisible ? "Close Form" : "+ Add Car"}
      </button>

      {isFormVisible && (
        <div className={styles.formModal}>
          <button className={styles.closeButton} onClick={toggleFormVisibility}>
            <strong>×</strong>
          </button>
          <h2>{editingCarId ? 'Edit Car' : 'Add Car'}</h2> {/* Condition for "Edit" or "Add" */}
          <form onSubmit={handleSubmit}>
            <input
              className={styles.inputArea}
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
            <input
              className={styles.inputArea}
              type="text"
              name="plate_number"
              placeholder="Plate Number"
              value={formData.plate_number}
              onChange={(e) => setFormData({ ...formData, plate_number: e.target.value })}
              required
            />
            <input
              className={styles.inputArea}
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              required
            />
            <button className={styles.button} type="submit">{editingCarId ? 'Update Car' : 'Add Car'}</button> {/* Change button text based on editingCarId */}
          </form>
        </div>
      )}

      <div className={styles.container}>
        {cars?.map((car) => (
          <CarsCard
            key={car._id}
            doc={car}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
