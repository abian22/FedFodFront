import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./LanguageButton.scss"

function LanguageButton() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="language-button">
      <button onClick={() => setIsOpen(!isOpen)}>
        {i18n.language === 'en' ? 'English' : 'Español'}
      </button>
      {isOpen && (
        <ul className="language-menu">
          <li>
            <button onClick={() => changeLanguage('en')}>English</button>
          </li>
          <li>
            <button onClick={() => changeLanguage('es')}>Español</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LanguageButton;
