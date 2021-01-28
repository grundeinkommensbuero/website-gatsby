import React from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../../../components/Layout/Sections';
import SelfScan from '../../../components/Forms/SelfScan';

export const campaignCodes = [
  {
    campaignCode: 'berlin-1',
    successMessage: 'Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Karl-Marx-Straße 50, 12043 Berlin'
  },
  {
    campaignCode: 'brandenburg-1',
    successMessage: 'Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Karl-Marx-Straße 50, 12043 Berlin.'
  },
  {
    campaignCode: 'bremen-1',
    successMessage: 'Danke! Bitte schicke die Listen möglichst schnell an: Svenja Heer, Borchshöher Straße 168 b, 28755 Bremen'
  },
  {
    campaignCode: 'hamburg-1',
    successMessage: 'Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Am Langenzug 12, 22085 Hamburg'
  },
  {
    campaignCode: 'schleswig-holstein-1',
    successMessage: 'Danke! Bitte schicke die Listen möglichst schnell an: Johannes Wagner, Postfach 1104, 24585 Nortorf.'
  },
]

export const ProfileSignatures = ({ userId }) => {
  return (
    <section className={gS.profilePageGrid}>
      <section className={cN(gS.editPageSection, gS.editSettings)}>
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>

        <section className={s.signatureSection}>
          <Helmet>
            <title>Selbsteingabe Unterschriftsliste</title>
          </Helmet>

          <SectionWrapper>
            <SelfScan
              campaignCode="berlin-1"
              successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Karl-Marx-Straße 50, 12043 Berlin"
              className={s.customStyle}
            />
          </SectionWrapper>

          {/* <SelfScan
            campaignCode="brandenburg-1"
            successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Karl-Marx-Straße 50, 12043 Berlin."
          />

          <SelfScan
            campaignCode="bremen-1"
            successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Svenja Heer, Borchshöher Straße 168 b, 28755 Bremen"
          />

          <SelfScan
            campaignCode="hamburg-1"
            successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Am Langenzug 12, 22085 Hamburg"
          />

          <SelfScan
            campaignCode="schleswig-holstein-1"
            successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Johannes Wagner, Postfach 1104, 24585 Nortorf."
          /> */}
        </section>
      </section>
    </section>
  )
};