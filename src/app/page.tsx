import React from 'react';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the User & Car Management System!</h1>
      
      <p className={styles.description}>
        This project is a full-stack application built using <strong>Next.js</strong>. It manages users and cars with data stored in <strong>MongoDB Atlas</strong> and deployed on <strong>Vercel</strong>.
      </p>
      
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h3>User Management</h3>
          <p>Efficiently manage user data with easy-to-use forms and dynamic updates.</p>
        </div>

        <div className={styles.featureCard}>
          <h3>Car Management</h3>
          <p>Track car details, update information, and perform CRUD operations on vehicles.</p>
        </div>
        
        <div className={styles.featureCard}>
          <h3>Real-time Database Integration</h3>
          <p>Seamless connection to MongoDB Atlas for live data management.</p>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Powered by <strong>Next.js</strong>, <strong>MongoDB Atlas</strong>, and <strong>Vercel</strong>.</p>
      </div>
    </div>
  );
}
