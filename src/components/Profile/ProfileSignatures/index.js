import React, { useEffect, useState } from 'react';
import * as s from './style.module.less';
import * as gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../../../components/Layout/Sections';
import SelfScan from '../../../components/Forms/SelfScan';
import campaignCodes from './campaignCodes.json';
import { CampainScanVisualisation } from '../../Forms/SelfScan/CampaignScanVisualisation';
const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

export const ProfileSignatures = ({ userId, userData }) => {
  // Berlin page should by default show berlin campaign
  // even if user is not signed up for berlin for some reason
  const [userCampaigns, setUserCampaigns] = useState(
    IS_BERLIN_PROJECT ? [campaignCodes[0]] : []
  );

  useEffect(() => {
    if (userData && 'municipalities' in userData && !IS_BERLIN_PROJECT) {
      const activeCampaigns = [];
      userData.municipalities.forEach(mun => {
        campaignCodes.forEach(campCode => {
          if (mun.ags === campCode.ags) {
            activeCampaigns.push(campCode);
          }
        });
      });
      setUserCampaigns(activeCampaigns);
    }
  }, [userData]);

  console.log({ userCampaigns });
  return (
    <section className={gS.profilePageGrid}>
      <section
        className={cN(gS.editPageSection, gS.editSettings, {
          [gS.rose]: IS_BERLIN_PROJECT,
        })}
      >
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>

        <section className={s.signatureSection}>
          <Helmet>
            <title>Selbsteingabe Unterschriftsliste</title>
          </Helmet>

          <SectionWrapper>
            <SelfScan
              successMessage={
                'Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Gneisenaustraße 63, 10961 Berlin'
              }
              campaignCode={
                userCampaigns.length === 1
                  ? userCampaigns[0].campaignCode
                  : null
              }
            />
            {userCampaigns[0] ? (
              userCampaigns.map((scan, index) => {
                return (
                  <div className={s.signatureContainer} key={index}>
                    <h2>Eingegangene Unterschriften {scan.campaignName}</h2>
                    <CampainScanVisualisation
                      campaignCode={scan.campaignCode}
                    />
                  </div>
                );
              })
            ) : (
              <h3>
                Du bist für keine Kampagne angemeldet, die gerade Unterschriften
                sammelt.
              </h3>
            )}
          </SectionWrapper>
        </section>
      </section>
    </section>
  );
};
