import React from "react";
import useFetch from "../hooks/useFetch";
import PageTitle from "../Components/PageTitle";
import GeneratorTab from "../Components/GeneratorTab";
import Loader from "../Components/Loader";
import GeneratorDesc from "../Components/GeneratorDesc";
import { useTranslation } from "react-i18next";

const MediumDieselGenerator = () => {
  const { data, loading, error} = useFetch(
    "/generator-page?populate=DieselGeneratorsMedium.TabImage&populate=DieselGeneratorsMedium.TableRows&populate=DieselGeneratorsMedium.TableRows.katalog"
  );
  const { t } = useTranslation();
  
  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const dieselGeneratorsMedium = data.DieselGeneratorsMedium || [];
  
  const tabs = dieselGeneratorsMedium.map((tab) => ({
    key: tab.TabKey,
    label: tab.TabName,
    image: `${tab.TabImage.url}`,
  }));
  
  const tableData = dieselGeneratorsMedium.reduce((acc, tab) => {
    acc[tab.TabKey] = tab.TableRows.map((row) => ({
      id: row.id,
      model: row.Model,
      yedekGuc: row.YedekGuc,
      birincilGuc: row.BirincilGuc,
      hz: row.Hz,
      katalogLink: row.katalog?.url ? `${row.katalog.url}` : "",
      detayLink: row.DetayLink,
      content: row.Content,
      // image: row.Image?.url ? `${row.Image.url}` : "",
    }));
    return acc;
    
  }, {});

  return (
    <>
      <PageTitle title={t("generator.dieselTitleMedium")} />
      <GeneratorTab tabs={tabs} tableData={tableData} />
      <GeneratorDesc/>
    </>
  );
};

export default MediumDieselGenerator;
