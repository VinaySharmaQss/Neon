import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`flex justify-between ${styles.foot}`}>
      <p className='ml-16' >Copyright © Neom Sindalah. All Rights Reserved.</p>
      <ul className="flex gap-4 flex-row mr-16 ">
        <li>Terms of use</li>
        <li>Privacy</li>
        <li className='mr-16'>Cookie</li>
      </ul>
    </footer>
  );
};

export default Footer;