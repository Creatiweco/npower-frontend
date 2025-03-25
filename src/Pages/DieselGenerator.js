import React from "react";
import useFetch from "../hooks/useFetch";
import PageTitle from "../Components/PageTitle";
import GeneratorTab from "../Components/GeneratorTab";
import Loader from "../Components/Loader";
import { useTranslation } from "react-i18next";

const DieselGenerator = () => {
  const { data, loading, error, api } = useFetch(
    "/generator-page?populate=DieselGenerators.TabImage&populate=DieselGenerators.TableRows&populate=DieselGenerators.TableRows.Image&populate=DieselGenerators.TableRows.katalog"
  );
  const { t } = useTranslation();
  
  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const dieselGenerators = data.DieselGenerators || [];
  
  const tabs = dieselGenerators.map((tab) => ({
    key: tab.TabKey,
    label: tab.TabName,
    image: `${api}${tab.TabImage.url}`,
  }));
  
  const tableData = dieselGenerators.reduce((acc, tab) => {
    acc[tab.TabKey] = tab.TableRows.map((row) => ({
      id: row.id,
      model: row.Model,
      yedekGuc: row.YedekGuc,
      birincilGuc: row.BirincilGuc,
      hz: row.Hz,
      katalogLink: row.katalog?.url ? `${api}${row.katalog.url}` : "",
      detayLink: row.DetayLink,
      content: row.Content,
      image: row.Image?.url ? `${api}${row.Image.url}` : "",
    }));
    return acc;
    
  }, {});

  console.log(tableData.katalogLink);
  
  return (
    <>
      <PageTitle title={t("generator.dieselTitle")} />
      <GeneratorTab tabs={tabs} tableData={tableData} />
    </>
  );
};

export default DieselGenerator;
