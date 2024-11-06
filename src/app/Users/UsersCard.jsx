"use client";
import React from 'react'
import styles from "@/app/Home.module.css";

function UsersCard({doc,handleEdit, handleDelete }) {
  return (
    <div key={doc._id} className={styles.card}>
    <h2>{doc.agent_name}</h2>
    <p><strong>Phone Number:</strong> {doc.phone}</p>
    <div className={styles.buttonsContainer}>
      <button className={styles.button} onClick={() => handleEdit(doc)}>🖋️</button>
      <button className={styles.button} onClick={() => handleDelete(doc._id)}>🗑️</button>
    </div>
  </div>
  )
}

export default UsersCard