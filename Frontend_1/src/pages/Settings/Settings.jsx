import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styles from './Settings.module.css'
import { useSelector } from 'react-redux'

const Settings = () => {
  const userName = useSelector((state) => state.user?.user?.name) 
                ?? JSON.parse(localStorage.getItem("user"))?.name 
                ?? "Guest";
     const [settings, setSettings] = useState({
    accountInfo: false,
    shareWithOperators: false,
    manageData: false,
    passwordSecurity: false,
    notifications: {
      emails: true,
      newsletters: false,
      personalized: true,
    },
    language: "English",
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const [enabled, setEnabled] = useState({
    emails: true,
    newsletters: true,
    personalized: true,
  });

  const toggleSwitch = (key) => {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleNotification = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleLanguageChange = (lang) => {
    setSettings((prev) => ({
      ...prev,
      language: lang,
    }));
  };
  return (
    <>
      <Navbar />
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>Good morning {userName}!</h1>
          <p className={styles.subtitle}>
            You can change the settings for your personal data and other
            information.
          </p>

          {/* Personal and Account Information */}
          <div className={styles.settingsContainer}>
            {/* Personal and Account Information */}
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingTitle}>
                  Personal and Account Information
                </p>
                <p className={styles.settingDescription}>
                  Would you like to share your personal information with us to
                  know you better?
                </p>
              </div>
              <div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.accountInfo}
                    onChange={() => toggleSetting("accountInfo")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            {/* Consent for Sharing Information */}
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingTitle}>
                  Consent for sharing information with operators
                </p>
                <p className={styles.settingDescription}>
                  Would you like to share your personal information with the
                  operator to serve you better?
                </p>
              </div>
              <div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.shareWithOperators}
                    onChange={() => toggleSetting("shareWithOperators")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            {/* Receive Notifications */}
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingTitle}>Receive Notifications</p>
                <p className={styles.settingDescription}>
                  Would you like to receive notifications about upcoming events
                  and updates?
                </p>
              </div>
              <div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.receiveNotifications}
                    onChange={() => toggleSetting("receiveNotifications")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            {/* Enable Location Services */}
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingTitle}>Enable Location Services</p>
                <p className={styles.settingDescription}>
                  Would you like to enable location services to get better
                  recommendations?
                </p>
              </div>
              <div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.enableLocation}
                    onChange={() => toggleSetting("enableLocation")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="w-fit">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-gray-600 mb-2">
              Which type of notifications would you like to receive?
            </p>
            <div className="flex space-x-4">
              {Object.entries(enabled).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSwitch(key)}
                    className={`relative w-9 h-5 flex items-center rounded-full transition duration-300 ease-in-out ${value ? "bg-[#FF385C]" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute left-0.5 w-4 h-4 bg-white rounded-full transform transition ${value ? "translate-x-2" : "translate-x-0"}`}
                    />
                  </button>
                  <span className="text-sm text-gray-800 capitalize">
                    {key.replace("personalized", "Personalized notifications")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className={styles.settingCol}>
            <div>
              <p className={styles.settingTitle}>Language</p>
              <p className={styles.settingDescription}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                diam nonumy eirmod?
              </p>
            </div>
            <div className={styles.languageOptions}>
              {["English", "French", "Arabic"].map((lang) => (
                <label key={lang} className={styles.languageOption}>
                  <input
                    type="radio"
                    name="language"
                    checked={settings.language === lang}
                    onChange={() => handleLanguageChange(lang)}
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Settings