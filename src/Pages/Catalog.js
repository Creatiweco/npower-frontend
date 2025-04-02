import React from 'react';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';
import { useTranslation } from 'react-i18next';

const CatalogItem = ({ img, title, catalogLink }) => {
  const { t } = useTranslation();
  
  return (
    <div className='catalog-item'>
      <img src={img} alt={title} />
      <p>{title}</p>
      <a href={catalogLink} target="_blank" rel="noopener noreferrer">
        {t('catalog.download')}
      </a>
    </div>
  );
};

function Catalog() {
  const { t } = useTranslation();
  const { data, loading, error,} = useFetch('/catalog-page?populate=CatalogItem.Image&populate=CatalogItem.Catalog');
  
  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const catalogItems = data.CatalogItem.map((catalog) => ({
    img: `${catalog.Image[0]?.url}`,
    title: catalog.Title,
    catalogLink: `${catalog.Catalog.url}`,
  }));
  
  
  return (
    <div className='catalog-area'>
      <div className='container'>
        <h2 className='catalog-title'>{t('catalog.title')}</h2>
        <p className='catalog-description'>{t('catalog.description')}</p>
        <div className='catalog-grid'>
          {catalogItems.map((catalog, index) => (
            <CatalogItem
              key={index}
              img={catalog.img}
              title={catalog.title}
              catalogLink={catalog.catalogLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
