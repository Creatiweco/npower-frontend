import React, { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);

    return(
        <>
            {isVisible && (
                <button onClick={scrollToTop} className="backtotop"><FontAwesomeIcon icon={faAngleUp} /></button>
            )}
            <a className="whatsapp-icon" href="https://wa.me/900000000000" target="_blank" rel="noopener noreferrer">
                <img src="Assets/image/icon/whatsapp_icon.svg" alt="whatsapp"/>
            </a>
        </>
    );
};

export default BackToTop;