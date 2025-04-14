import React from 'react';
import PageTitle from '../Components/PageTitle';
import ContactDesc from '../Components/ContactDesc';
import CounterArea from '../Components/CounterArea';
import FormArea from '../Components/FormArea';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';
import { useTranslation } from "react-i18next";

function Product() {
  const { t } = useTranslation();

  const { data, loading, error } = useFetch('/products-page?populate=ProductItems.Icon&populate=ProductsCounter.Link2&populate=ProductsCounter.CounterItem&populate=ProductsCounter.CounterItem.Icon');

  if (loading) return <div className="loader-container"><Loader /></div>;
  if (error) return <div>Error: {error.message}</div>;

  // Description
  // const description = data?.ProductsCounter?.Description?.map((desc) =>
  //   desc.children?.map((child) => child.text).join(' ')
  // ).join(' ') || '';

  // Products (CounterItem'ları ürün gibi kullanıyoruz)
  const products = data?.ProductItems?.map((item) => ({
    id: item.id,
    title: item.Title,
    value: item.Content,
    image: item.Icon?.url || '',
  })) || [];
  
  console.log(products);

  const counterSection = data?.ProductsCounter || {};

  // Counter bilgileri
  const counters = counterSection.CounterItem?.map((counter) => ({
    id: counter.id,
    title: counter.Title || '',
    value: counter.Value || '',
    icon: counter.Icon?.[0]?.url || '',
  })) || [];

  return (
    <>
      <PageTitle title={t("products")} />

      <div className='product-wrapper'>
        {products.map((product, index) => (
          <div className='product-item row' key={product.id}>
            <div className='col-lg-9'>
              <div className={`row product-content ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className='col-lg-8'>
                  <h3>{product.title}</h3>
                  <p>{product.value}</p>
                </div>
                <div className='col-lg-1'></div>
                <div className='col-lg-3 d-flex justify-content-center'>
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CounterArea counterSection={counterSection} counters={counters} />
      <ContactDesc />
      <FormArea />
    </>
  );
}

export default Product;
