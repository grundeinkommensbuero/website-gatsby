import React, { useContext } from 'react';
import { MunicipalityContext } from '../../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../../hooks/Municipality/UserMunicipalityContentfulState';
import { SignUpButton } from '../../../TickerToSignup/SignupButton';
import { contentfulJsonToHtml } from '../../../utils/contentfulJsonToHtml';
import { getButtonText } from '../../../TickerToSignup/SignupButtonAndTile';
import * as s from './style.module.less';
import Img from 'gatsby-image';
const YoutubeEmbed = React.lazy(() => import('../../../YoutubeEmbed'));

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
        <React.Suspense fallback={<div>Lädt...</div>}>
          <YoutubeEmbed url={videoLink} />
        </React.Suspense>
      )}
      {image && image.fluid && <Img fluid={image.fluid} />}
      {text && <div>{contentfulJsonToHtml(text)}</div>}
      {signUpButton && (
        <SignUpButton className={s.signUpCTA}>{buttonText}</SignUpButton>
      )}
    </>
  );
};
