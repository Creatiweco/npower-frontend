import React from 'react';
import PageTitle from '../Components/PageTitle';
import ProductMain from '../Components/ProductMain';
import ContactDesc from '../Components/ContactDesc';
import OfferForm from '../Components/OfferForm'; 
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';

function OrtaVoltaj() {
    const { data, loading, error} = useFetch('/medium-voltage-page?populate=MainImage&populate=PanelItem&populate=MediumVoltageFeatures&populate=Brands');

    if (loading) return <div className="loader-container"><Loader/></div>;
    if (error) return <div>Error: {error.message}</div>;

    const { Title, Content, MainImage, PanelItem, MediumVoltageFeatures} = data;

    return (
        <>
            <PageTitle title={Title} />
            <ProductMain 
                image={`${MainImage.url}`} 
                content={Content.map(block => block.children.map(child => child.text).join('')).join('<br><br>')} 
            />

            <div className='container panel-types-area'>
                <h2>Medium Voltage Panel Types</h2>
                {/* Diagram img etiketleri aynı şekilde bırakılıyor */}
                <img className='diagram1 d-lg-flex d-none' src='Assets/image/diagram1.svg' alt='' />
                <img className='diagram2 d-lg-flex d-none' src='Assets/image/diagram2.svg' alt='' />
                <img className='diagram3 d-lg-flex d-none' src='Assets/image/diagram1.svg' alt='' />
                <img className='diagram4 d-lg-flex d-none' src='Assets/image/diagram2.svg' alt='' />
                <div className="panel-types">
                    {PanelItem.map((panel, index) => (
                        <div key={index} className='panel-items'>
                            <p dangerouslySetInnerHTML={{ __html: panel.Title }}></p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='voltage-features'>
                <div className='container features-container'>
                    <div className='features-head'>
                        <img src='/Assets/image/icon/voltaj.svg' alt='' />
                        <h2>Medium Voltage Panel Features</h2>
                    </div>
                    {MediumVoltageFeatures.map((feature, index) => (
                        <div key={index} className='features-item'>
                            <h3>{feature.Title}</h3>
                            <p dangerouslySetInnerHTML={{
                                __html: feature.Content.map(block => block.children.map(child => child.text).join('')).join('<br><br>')
                            }}></p>
                        </div>
                    ))}
                </div>
            </div>

            <ContactDesc /> 
            <OfferForm />
        </>
    );
}

export default OrtaVoltaj;
