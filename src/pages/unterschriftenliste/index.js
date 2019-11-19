import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Button } from '../../components/Forms/Button';
import {
  useSignaturesApi,
  useCreatePdfWithUser,
} from '../../hooks/Api/Signatures';

const Unterschriftenliste = () => {
  const [download, createPdf] = useCreatePdfWithUser();

  console.log('download', download);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('email'));
    createPdf({
      email: urlParams.get('email'),
      campaignCode: urlParams.get('campaignCode'),
    });
  }, []);

  const sections = [
    {
      title: <>Lade deine Unterschriftenliste herunter!</>,
      bodyTextSizeHuge: true,
      body: <>hu</>,
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
