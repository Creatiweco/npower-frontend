import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const flagIcon = i18n.language === 'tr' ? '/Assets/image/eng.svg' : '/Assets/image/tr.svg';
  const flagAlt = i18n.language === 'tr' ? 'English' : 'Türkçe';

  return (
    <div className={`navbar-section ${isSticky ? "navbar-sticky" : ""}`} style={{ background: "#E4F2F3" }}>
      <div className='navbar-top'>
        <div className='container'>
          <div className="row">
            <div className="col-6 navbar-contact">
              <a href="tel:+902166062800">
                <FontAwesomeIcon icon={faPhone} /> +90 216 606 28 00
              </a>
              <a className='mail' href="mailto:info@npowergenerator.com">
                <FontAwesomeIcon icon={faEnvelope} /> info@npowergenerator.com
              </a>
            </div>
            <div className="col-6 navbar-button">
              <a href="https://www.instagram.com/npowergenerator/" rel="noopener">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.linkedin.com/company/npower-generator/" rel="noopener">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <button onClick={toggleLanguage} style={{ background: 'none', border: 'none' }}>
                <img src={flagIcon} alt={flagAlt} style={{ width: '24px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='navbar-bottom'>
        <div className='container'>
          <div className="row align-items-end nav-grid">
            <div className="col-4">
              <Link to="/">
                <img src="/Assets/image/n-power_logo.svg" alt="Logo" />
              </Link>
            </div>
            <div className="col-8 nav-area">
              <button className="hamburger-button" onClick={toggleLanguage} style={{ background: 'none', border: 'none' }}>
                <img src={flagIcon} alt={flagAlt} style={{ width: '20px', marginRight: '10px' }} />
              </button>

              <button className="hamburger-button" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
              </button>

              <ul className={`npower-navbar ${isMenuOpen ? 'open' : ''}`}>
                <li>
                  <Link to="/about">{t('navbar.about')}</Link>
                </li>
                <li className="dropdown-link">
                  <Link to="/products">{t('navbar.products')}</Link>
                  <ul className='dropdown'>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/ses-izolasyonlu-konteynir.svg' alt='' /></div>
                      <Link to="/sound-proof-containers">{t('navbar.soundProof')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/voltaj.svg' alt='' /></div>
                      <Link to="/low-voltage-panels">{t('navbar.lowVoltage')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/voltaj.svg' alt='' /></div>
                      <Link to="/medium-voltage-panels">{t('navbar.mediumVoltage')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/kurulum.svg' alt='' /></div>
                      <Link to="/installation-works">{t('navbar.installation')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/sismik_titresim.svg' alt='' /></div>
                      <Link to="/seismic-vibration-pads">{t('navbar.vibrationPads')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/dıs_yakit.svg' alt='' /></div>
                      <Link to="/external-fuel-tanks">{t('navbar.externalFuel')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/generator_icon.svg' alt='' /></div>
                      <Link to="/fuel-tank-automation">{t('navbar.automation')}</Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-link">
                  <Link to="#" onClick={(e) => e.preventDefault()}>{t('navbar.generators')}</Link>
                  <ul className='dropdown'>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/generator_icon.svg' alt='' /></div>
                      <Link to="/diesel-generator-low-voltage">{t('navbar.diesel')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/generator_icon.svg' alt='' /></div>
                      <Link to="/diesel-generator-medium-voltage">{t('navbar.dieselMedium')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/generator_icon.svg' alt='' /></div>
                      <Link to="/gas-generator">{t('navbar.gas')}</Link>
                    </li>
                    <li className='dropdown-item'>
                      <div className='dropdown-icon'><img src='/Assets/image/icon/generator_icon.svg' alt='' /></div>
                      <Link to="/portable-generator">{t('navbar.portable')}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/catalog">{t('navbar.catalog')}</Link>
                </li>
                <li>
                  <Link to="/contact">{t('navbar.contact')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
