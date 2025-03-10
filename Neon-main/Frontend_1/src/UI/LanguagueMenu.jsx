import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const LanguagueMenu = ({ isOpen }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'French', 'Arabic'];

  const handleSelect = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg text-black">
          <ul className="flex flex-col text-left m-2 text-base"  style={{ fontFamily: "BrownRegular" }}>
            {languages.map((language) => (
              <li
                key={language}
                className="py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => handleSelect(language)}
              >
                {language}
                {selectedLanguage === language && <FaCheck className="text-grey-500" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguagueMenu;