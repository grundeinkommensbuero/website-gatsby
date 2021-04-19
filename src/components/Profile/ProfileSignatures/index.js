import React, { useEffect, useState } from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../../../components/Layout/Sections';
import SelfScan from '../../../components/Forms/SelfScan';
import campaignCodes from './campaignCodes.json';
import { CampainScanVisualisation } from '../../Forms/SelfScan/CampaignScanVisualisation';

export const ProfileSignatures = ({ userId, userData }) => {
  const [userCampaigns, setUserCampaigns] = useState([]);

  useEffect(() => {
    if (userData && 'municipalities' in userData) {
      const activeCampaigns = [];
      userData.municipalities.forEach(mun => {
        campaignCodes.forEach(campCode => {
          if (mun.ags === campCode.ags) {
            activeCampaigns.push(campCode);
          }
        })
      })
      setUserCampaigns(activeCampaigns);
    }
  }, [userData]);

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
              successMessage={'Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Gneisenaustraße 63, 10961 Berlin'}
              className={s.signatureWrapper}
            />
            {userCampaigns[0] ? userCampaigns.map(scan => {
              return (
                <div className={s.signatureContainer}>
                  <h2>Eingegangene Unterschriften {scan.campaignName}</h2>
                  <CampainScanVisualisation campaignCode={scan.campaignCode} />
                </div>
              )
            }) :
              <h3>Du bist für keine Kampagne angemeldet, die gerade Unterschriften sammelt.</h3>}
          </SectionWrapper>
        </section>
      </section>
    </section>
  )
};