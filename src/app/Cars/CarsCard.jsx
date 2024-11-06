"use client";
import React from 'react'
import styles from "@/app/Home.module.css";

function CarsCard({doc,handleEdit, handleDelete }) {
  return (
    <div key={doc._id} className={styles.card}>
    <h2>{doc.model}</h2>
    <p><strong>Plate Number:</strong> {doc.plate_number}</p>
    <p><strong>Color:</strong> {doc.color}</p>
    <div className={styles.buttonsContainer}>
      <button className={styles.button} onClick={() => handleEdit(doc)}>🖋️</button>
      <button className={styles.button} onClick={() => handleDelete(doc._id)}>🗑️</button>
    </div>
  </div>
  )
}

export default CarsCard