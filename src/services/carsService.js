// services/carsService.js
import http from './http';

export const fetchCars = async () => {
  try {
    const response = await http.get('/api/cars');
    return response.data;
  } catch (error) {
    alert('Error fetching cars:', error);
  }
};

export const addCar = async (car) => {
  try {
    // כאן אין צורך לשלוח את ה-ID
    const { _id, ...carData } = car; // מסננים את ה-ID
    const response = await http.post('/api/cars', carData);
    return response.data;
  } catch (error) {
    alert('Error adding car:', error);
  }
};

export const updateCar = async (id, car) => {
  try {
    const { _id, ...carData } = car;
    const response = await http.patch(`/api/cars/${id}`, carData);
    return response.data;
  } catch (error) {
    alert('Error updating car:', error);
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await http.delete(`/api/cars/${id}`);
    return response.data;
  } catch (error) {
    alert('Error deleting car:', error);
  }
};
