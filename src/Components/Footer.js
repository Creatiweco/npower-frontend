import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../hooks/useFetch";

const FooterItem = ({ title, address, addressLink, number }) => {
    return (
        <div className="footer-item">
            <h3>{title}</h3>
            <a href={addressLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLocationDot} /> {address}
            </a>
            <a href={'tel:' + number}><FontAwesomeIcon icon={faPhone} /> {number}</a>
        </div>
    );
};

const Footer = () => {
    const { data, loading, error } = useFetch("/footer?populate=*");

    if (loading) return <div> </div>;
    if (error) return <div>Error: {error.message}</div>;

    const footerData = data;

    if (!footerData) return null;

    // Açıklama Metni
    const description = footerData.FooterDescription.map(item => item.children.map(text => text.text).join(" ")).join("\n");
    
    // Adres Bilgileri
    const footerItems = footerData.FooterAddress.map(item => ({
        title: item.Title,
        address: item.Address.map(addr => addr.children.map(text => text.text).join(" ")).join("\n"),
        addressLink: item.Link,
        number: item.Phone,
    }));

    return (
        <footer>
            <div className="container">
                <div className="pre-footer">
                    <p>{description}</p>
                    <Link to='/'>
                        <img src="/Assets/image/footer_logo.svg" alt="NPower Logo" />
                    </Link>
                </div>
                <div className="footer">
                    {footerItems.map((item, index) => (
                        <FooterItem key={index} title={item.title} address={item.address} addressLink={item.addressLink} number={item.number} />
                    ))}
                </div>
            </div>
            <div className="copyright">
                <p>Copyright &copy;2024 NPower</p>
            </div>
        </footer>
    );
};

export default Footer;
