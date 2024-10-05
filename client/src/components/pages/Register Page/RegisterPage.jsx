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
      [name]: value
    });
  };


  return (
    <div className={styles.containerForm}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style = {{color: "black"}}/>
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style = {{color: "black"}} />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required style = {{color: "black"}} />
          
          <label htmlFor="companyName">Company Name</label>
          <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required style = {{color: "black"}} />
          
          <div style = {{display: "flex", justifyContent: "space-between"}}>
            <button onClick = {() => {navigate("/")}}>Back</button>
            <button type="submit">Sign up</button>
          </div>
        </form>
    </div>
  );
}

export default RegisterPage;
