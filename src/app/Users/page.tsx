"use client";

import { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "@/services/usersService";
import styles from "@/app/Home.module.css";
import UsersCard from "./UsersCard";

interface User {
  _id: string;
  agent_name: string;
  phone: string;
}

export default function Users() {
  const [documents, setDocuments] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    _id: '',
    agent_name: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response: User[] = await fetchUsers();
      setDocuments(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
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
      await updateUser(formData._id, formData);
      setIsEditing(false);
    } else {
      await addUser(formData);
    }
    setFormData({ _id: '', agent_name: '', phone: '' });
    await fetchData();
    setIsFormVisible(false);
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setDocuments(documents.filter(doc => doc._id !== id));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setFormData({ _id: '', agent_name: '', phone: '' });
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}><strong>Users</strong></h1>
      <div className={styles.addButton}>
        <button className={styles.button} onClick={toggleFormVisibility}>+ Add User</button>
      </div>
      <div className={styles.container}>
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div key={doc._id}>
              <UsersCard
                doc={doc}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      {isFormVisible && (
        <div className={styles.formModal}>
          <button className={styles.closeButton} onClick={toggleFormVisibility}><strong>×</strong></button>
          <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.inputArea}
              type="text"
              name="agent_name"
              placeholder="Agent Name"
              value={formData.agent_name}
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputArea}
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button className={styles.button} type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
          </form>
        </div>
      )}
    </div>
  );
}
