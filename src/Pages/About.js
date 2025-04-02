import React from 'react';
import PageTitle from '../Components/PageTitle';
import AboutMain from '../Components/AboutMain';
import WhatWeDo from '../Components/WhatWeDo';
import VisionMision from '../Components/VisionMision'; 
import AboutCertificate from '../Components/AboutCertificate';
import useFetch from '../hooks/useFetch.js';
import Loader from '../Components/Loader.js';
import { useTranslation } from 'react-i18next';

function About() {
  const { data, loading, error, api } = useFetch(
    '/about-page?populate=WhoAreWe.Image&populate=WhatWeDo.Image&populate=VissionMissionArge.VissionMissionImage&populate=VissionMissionArge.ArgeImage&populate=Certificate.Image'
  );

  const { t } = useTranslation();

  if (loading) return <div className="loader-container"><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  const aboutMainData = {
    title: data.WhoAreWe?.Title || "Title Not Found",
    subtitle: data.WhoAreWe?.Subtitle || "No Subheading Found",
    description: data.WhoAreWe?.Description?.[0]?.children?.[0]?.text || "No explanation found.",
    image: `${data.WhoAreWe?.Image?.url || ''}`,
    imageAlt: data.WhoAreWe?.Image?.alternativeText || data.WhoAreWe?.Title,
  };

  const whatWeDoData = {
    title: data.WhatWeDo?.Title || "Başlık Bulunamadı",
    description1: data.WhatWeDo?.Description1?.[0]?.children?.[0]?.text || "Explanation 1 not found.",
    description2: data.WhatWeDo?.Description2?.[0]?.children?.[0]?.text || "Explanation 2 not found.",
    image: `${data.WhatWeDo?.Image?.[0]?.url || ''}`,
    imageAlt: data.WhatWeDo?.Image?.[0]?.alternativeText || data.WhatWeDo?.Title,
  };

  const visionMisionData = {
    title: data.VissionMissionArge?.VissionMissionTitle || "Vision & Mission",
    description: data.VissionMissionArge?.VissionMissionDescription?.map(
      (desc) => desc.children?.[0]?.text
    ).filter(Boolean) || [],
    argeTitle: data.VissionMissionArge?.ArgeTitle || "R&D Activities",
    argeDescription: data.VissionMissionArge?.ArgeDescription?.map(
      (desc) => desc.children?.[0]?.text
    ).filter(Boolean) || [],
    vissionMissionImage: `${data.VissionMissionArge?.VissionMissionImage?.url || ''}`,
    argeImage: `${data.VissionMissionArge?.ArgeImage?.url || ''}`,
  };

  const aboutCertificateData = data.Certificate?.map((certificate) => ({
    img: `${certificate.Image?.url}`,
    title: certificate.Title,
  })) || [];

  return (
    <>
      <PageTitle title={t("about")} />
      <AboutMain aboutMainData={aboutMainData} />
      <WhatWeDo whatWeDoData={whatWeDoData} />
      <VisionMision visionMisionData={visionMisionData} />
      <AboutCertificate aboutCertificateData={aboutCertificateData} />
    </>
  );
}

export default About;
