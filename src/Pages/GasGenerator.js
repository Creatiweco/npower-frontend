import React from 'react';
import PageTitle from '../Components/PageTitle';
import GeneratorTab from '../Components/GeneratorTab';
import useFetch from '../hooks/useFetch';
import Loader from '../Components/Loader';
import GeneratorDesc from '../Components/GeneratorDesc';
import { useTranslation } from "react-i18next";

const GasGenerator = () => {
  const { data, loading, error} = useFetch(
    "/generator-page?populate=GasGenerators.TabImage&populate=GasGenerators.TableRows&populate=GasGenerators.TableRows.katalog"
  );
   const { t } = useTranslation();

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const gasGenerators = data.GasGenerators || [];

  const tabs = gasGenerators.map((tab) => ({
    key: tab.TabKey,
    label: tab.TabName,
    image: `${tab.TabImage.url}`,
  }));

  const tableData = gasGenerators.reduce((acc, tab) => {
    acc[tab.TabKey] = tab.TableRows.map((row) => ({
      id: row.id,
      model: row.Model,
      yedekGuc: row.YedekGuc,
      birincilGuc: row.BirincilGuc,
      hz: row.Hz,
      katalogLink: row.KatalogLink,
      detayLink: row.DetayLink,
      content: row.Content,
      // image: row.Image?.url ? `${row.Image.url}` : "",
    }));
    return acc;
  }, {});
  

  return (
    <>
      <PageTitle title={t("generator.gasTitle")} />
      <GeneratorTab tabs={tabs} tableData={tableData} />
      <GeneratorDesc/>
    </>
  );
};

export default GasGenerator;
