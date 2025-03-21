import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import DieselGenerator from "./Pages/DieselGenerator.js";
import GasGenerator from "./Pages/GasGenerator.js";
import PortatifGeerator from "./Pages/PortatifGenerator.js";
import Contact from "./Pages/Contact";
import Catalog from "./Pages/Catalog.js";
import Footer from "./Components/Footer.js";
import BackToTop from "./Components/BackToTop.js";
import SesYalitimi from "./Pages/SesYalitimi.js";
import YakitTanki from "./Pages/YakitTanki.js";
import DisYakit from "./Pages/DisYakit.js";
import KurulumMontaj from "./Pages/KurulumMontaj.js";
import DusukVoltaj from "./Pages/DusukVoltaj.js";
import OrtaVoltaj from "./Pages/OrtaVoltaj.js";
import SismikTitresim from "./Pages/SismikTitresim.js";
import BlogSingle from "./Pages/BlogSingle.js";
import BlogList from "./Pages/BlogList.js";

function App() {
  const location = useLocation();
  const [navKey, setNavKey] = useState(0);

  useEffect(() => {
    setNavKey(prevKey => prevKey + 1); 
  }, [location.pathname]); 

  return (
    <>
      <Navbar key={navKey} />
      <Routes key={location.pathname}> 
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sound-proof-containers" element={<SesYalitimi />} />
        <Route path="/low-voltage-panels" element={<DusukVoltaj />} />
        <Route path="/medium-voltage-panels" element={<OrtaVoltaj />} />
        <Route path="/seismic-vibration-pads" element={<SismikTitresim />} />
        <Route path="/installation-works" element={<KurulumMontaj />} />
        <Route path="/external-fuel-tanks" element={<DisYakit />} />
        <Route path="/fuel-tank-automation" element={<YakitTanki />} />
        <Route path="/diesel-generator" element={<DieselGenerator />} />
        <Route path="/gas-generator" element={<GasGenerator />} />
        <Route path="/portable-generator" element={<PortatifGeerator />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs/:slug" element={<BlogSingle />} />
        <Route path="/blogs" element={<BlogList />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
