import React, { useState } from 'react';
import Loginstyle from '../styles/LoginPage.module.css';
import { Title } from './Title';
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const LoginPage = () => {
  return (
    <div>
      <div className={Loginstyle.title}>
        <Title />
      </div>
      <Login />
    </div>
  );
};

function Login() {
  const [formType, setFormType] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', wallet_address: ''});

  const handleLoginChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formType === 'login') {
      console.log('Login Data:', loginData);
      // Add your login logic here
    } else {
      console.log('Register Data:', registerData);
      
    }
  };

  return (
    <div className={Loginstyle.container}>
      <div className={Loginstyle.table_container}>
        <div className={Loginstyle.button_row}>
          <div className={Loginstyle.button_cell}>
            <div className={Loginstyle.toggle_buttons}>
              <button className={formType === 'login' ? Loginstyle.active_button : ''} onClick={() => setFormType('login')}>Login</button>
              <button className={formType === 'register' ? Loginstyle.active_button : ''} onClick={() => setFormType('register')}>Register</button>
            </div>
          </div>
        </div>
        <div className={Loginstyle.form_row}>
          <div className={Loginstyle.form_cell}>
            {formType === 'login' ? (
              <form className={Loginstyle.form_group} onSubmit={handleFormSubmit}>
                {/* <div className={Loginstyle.form_group}>
                  <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                </div>
                <div className={Loginstyle.form_group}>
                  <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                </div>
                <div className={Loginstyle.form_group}>
                  <input type="submit" value="Login" />
                </div> */}
                <div className={Loginstyle.conn_button}>
                  <ConnectButton />
                </div>
              </form>
            ) : (
              <form className={Loginstyle.form_group} onSubmit={handleFormSubmit}>
                <div className={Loginstyle.form_group}>
                  <input type="text" name="name" placeholder="Name" value={registerData.name} onChange={handleRegisterChange} required />
                </div>
                <div className={Loginstyle.form_group}>
                  <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} required />
                </div>
                <div className={Loginstyle.form_group}>
                  <input type="string" name="wallet_address" placeholder="Wallet address" value={registerData.wallet_address} onChange={handleRegisterChange} required />
                </div>
                <div className={Loginstyle.form_group}>
                  <input type="submit" value="Register" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
