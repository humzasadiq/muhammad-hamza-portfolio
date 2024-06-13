import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { MdOutlineFileDownload } from "react-icons/md";

function Header() {
  useEffect(() => {
    const header = document.querySelector('.header-content');
    const headerHeight = header.offsetHeight;
    const sticky = header.offsetTop;

    const handleScroll = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
        document.body.style.paddingTop = `${headerHeight}px`; // Avoid content jump
      } else {
        header.classList.remove('sticky');
        document.body.style.paddingTop = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="header-content">
        <h1><span>cogito, ergo sum.</span></h1>
      </div>
      <p>by Muhammad Hamza</p>
      <nav>
        <ul>
          <li><span><Link to="/">Home</Link></span></li>
          <li><span><Link to="/art">Art</Link></span></li>
          <li><span><Link to="/about">About</Link></span></li>
          <li><span><a href="https://drive.google.com/file/d/12_N4ZUKBikzJuPX8F7aWjugqNK3UsVIj/view" target='_blank'>Résumé <MdOutlineFileDownload /></a></span></li>
          <li><span><Link to="/contact">Contact</Link></span></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
