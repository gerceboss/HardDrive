import React, { useState } from 'react';
import Loginstyle from '../styles/LoginPage.module.css';
import { Title } from './Title';
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createUser } from '../services/user';
import { DesktopNavbar } from './DesktopNavbar';


export const LoginPage = () => {
  return (
    <div>
      <div className={Loginstyle.title}>
        <Title />
      </div>
      <Login />
      <div className={Loginstyle.title}>
        <DesktopNavbar />
      </div>
    </div>
  );
};

function Login() {
  const [formType, setFormType] = useState('login');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerWallet_Address, setRegisterWallet_Address] = useState('');


  const handleFormSubmit = async() => {
    await(createUser(registerName,registerEmail,registerWallet_Address));
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
                <div className={Loginstyle.conn_button}>
                  <ConnectButton />

                </div>
              </form>
            ) : (
              <form className={Loginstyle.form_group} onSubmit={handleFormSubmit}>
                <div className={Loginstyle.form_group}>
                  <input type="text" name="name" placeholder="Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                </div>
                <div className={Loginstyle.form_group}>
                  <input type="email" name="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                </div>
                <div className={Loginstyle.form_group}>
                  <input type="string" name="wallet_address" placeholder="Wallet address" value={registerWallet_Address} onChange={(e) => setRegisterWallet_Address(e.target.value)} required />
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
