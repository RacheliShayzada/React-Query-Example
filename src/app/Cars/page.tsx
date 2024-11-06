"use client";

import { useEffect, useState } from "react";
import { fetchCars, addCar, updateCar, deleteCar } from "@/services/carsService";
import styles from "@/app/Home.module.css";
import CarsCard from "./CarsCard";

// הגדרת ממשק עבור מבנה פרטי הרכב
interface Car {
  _id: string;
  model: string;
  plate_number: string;
  color: string;
}

export default function Cars() {
  const [documents, setDocuments] = useState<Car[]>([]);
  const [formData, setFormData] = useState<Car>({
    _id: '',
    model: '',
    plate_number: '',
    color: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response: Car[] = await fetchCars();
      setDocuments(response);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      await updateCar(formData._id, formData);
      setIsEditing(false);
    } else {
      await addCar(formData);
    }
    setFormData({ _id: '', model: '', plate_number: '', color: '' });
    await fetchData();
    setIsFormVisible(false); // סגור את הטופס אחרי ההגשה
  };

  const handleEdit = (car: Car) => {
    setFormData(car);
    setIsEditing(true);
    setIsFormVisible(true); // פתח את הטופס לעריכה
  };

  const handleDelete = async (id: string) => {
    await deleteCar(id);
    setDocuments(documents.filter(doc => doc._id !== id)); // עדכן את הרשימה לאחר מחיקה
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setFormData({ _id: '', model: '', plate_number: '', color: '' }); // אפס את המידע בטופס כשסוגרים אותו
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}><strong>Cars</strong></h1>
      {/* כפתור לפתיחת הטופס */}
      <div className={styles.addButton}>
        <button className={styles.button} onClick={toggleFormVisibility}>+ Add Car</button>
      </div>
      <div className={styles.container}>
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div key={doc._id}>
              <CarsCard
                doc={doc}
                handleEdit={handleEdit}
                handleDelete={handleDelete} />
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      {/* טופס */}
      {isFormVisible && (
        <div className={styles.formModal}>
          <button className={styles.closeButton} onClick={toggleFormVisibility}><strong>×</strong></button>
          <h2>{isEditing ? 'Edit Car' : 'Add Car'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.inputArea}
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputArea}
              type="text"
              name="plate_number"
              placeholder="Plate Number"
              value={formData.plate_number}
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputArea}
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              required
            />
            <button className={styles.button} type="submit">{isEditing ? 'Update Car' : 'Add Car'}</button>
          </form>
        </div>
      )}
    </div>
  );
}