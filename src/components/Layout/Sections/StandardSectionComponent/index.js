import React, { useContext } from 'react';
import { MunicipalityContext } from '../../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../../hooks/Municipality/UserMunicipalityContentfulState';
import { SignUpButton } from '../../../TickerToSignup/SignupButton';
import { contentfulJsonToHtml } from '../../../utils/contentfulJsonToHtml';
import { getButtonText } from '../../../TickerToSignup/SignupButtonAndTile';
import * as s from './style.module.less';
import { GatsbyImage } from 'gatsby-plugin-image';
import loadable from '@loadable/component';
const YoutubeEmbed = loadable(() => import('../../../YoutubeEmbed'));

export const StandardSectionComponent = ({
  videoLink,
  text,
  signUpButton,
  image,
}) => {
  const { municipality } = useContext(MunicipalityContext);
  const userContentfulState = useUserMunicipalityContentfulState();
  const buttonText = getButtonText(municipality, userContentfulState);

  return (
    <>
      {videoLink && (
        <YoutubeEmbed url={videoLink} fallback={<div>Lädt...</div>} />
      )}
      {image && image.gatsbyImageData && (
        <GatsbyImage image={image.gatsbyImageData} alt="" />
      )}
      {text && <div>{contentfulJsonToHtml(text)}</div>}
      {signUpButton && (
        <SignUpButton className={s.signUpCTA}>{buttonText}</SignUpButton>
      )}
    </>
  );
};
