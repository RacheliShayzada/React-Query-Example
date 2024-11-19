"use client";

import axios from "axios";

export interface Car {
  _id?: string;
  model: string;
  plate_number: string;
  color: string;
}

export const fetchCars = async (): Promise<Car[]> => {
  console.log(222,"Fetching");
  const response = await axios.get<Car[]>("/api/cars");
  return response.data;
};

export const addCar = async (car: Omit<Car, "_id">): Promise<Car> => {
  const response = await axios.post<Car>("/api/cars", car);
  return response.data;
};

export const updateCar = async (id: string, car: Omit<Car, "_id">): Promise<Car> => {
  try {
    const response = await axios.patch(`/api/cars/${id}`, car);
    return response.data;
  } catch (error) {
    alert('Error updating car:'+error);
    throw error;
  }
};


export const deleteCar = async (id: string): Promise<void> => {
  await axios.delete(`/api/cars/${id}`);
};
