import React, { useContext } from 'react';
import { YoutubeEmbed } from '..';
import { MunicipalityContext } from '../../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../../hooks/Municipality/UserMunicipalityContentfulState';
import { SignUpButton } from '../../../TickerToSignup/SignupButton';
import { contentfulJsonToHtml } from '../../../utils/contentfulJsonToHtml';
import { getButtonText } from '../../../TickerToSignup/SignupButtonAndTile';
import s from './style.module.less';
import Img from 'gatsby-image';

export const StandardSectionComponent = ({
  videoLink,
  text,
  signUpButton,
  image,
}) => {
  const { municipality } = useContext(MunicipalityContext);
  const { userContentfulState } = useUserMunicipalityContentfulState();
  const buttonText = getButtonText(municipality, userContentfulState);

  return (
    <>
      {videoLink && <YoutubeEmbed url={videoLink} />}
      {image && <Img fluid={image.fluid} />}
      {text && <div>{contentfulJsonToHtml(text.json)}</div>}
      {signUpButton && (
        <SignUpButton className={s.signUpCTA}>{buttonText}</SignUpButton>
      )}
    </>
  );
};