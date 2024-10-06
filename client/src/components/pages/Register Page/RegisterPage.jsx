import styles from './RegisterPage.module.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage({ formData, setFormData }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.containerForm}>
      <h2 className={styles.heading}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">Full Name</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="companyName">Company Name</label>
        <input
          className={styles.input}
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={() => navigate('/')}>Back</button>
          <button className={styles.button} type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
