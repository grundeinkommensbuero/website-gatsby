import React from 'react';
import s from '../style.module.less';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import cN from 'classnames';
import SocialMediaButton from '../Button';

export default ({ children, className }) => {
  const iconSize = '3x';

  const facebookText = `
  Hey+Leute%21%0D%0AIch+unterst%C3%BCtze+die+neue+
  Initiative+%22Expedition+Grundeinkommen%22%21%0D%0ADie+
  Idee+dahinter%3A+%C3%9Cber+einen+Modellversuch+ein+
  besseres+Verst%C3%A4ndnis+f%C3%BCr+das+Bedingungslose+
  Grundeinkommen+zu+entwickeln.%0D%0AWie+das%3F+-+
  Vielen+Menschen+wird+ein+Grundeinkommen+ausgezahlt%2C+
  die+Wissenschaft+begleitet+und+dokumentiert%2C+sodass+
  die+Politik+gewonnene+Erkenntnisse+ernst+nimmt+und+eine+
  gemeinsame+und+faire+Debatte+zum+Grundeinkommen+erm%C3%B6glicht+
  wird.%0D%0A%0D%0AFolgt+und+teilt+sehr+gerne%21%0D%0A%0D%0A
  Website%3A+https%3A%2F%2Fexpedition-grundeinkommen.de
  %2F%0D%0AFacebook%3A+https%3A%2F%2Fwww.facebook.com%2F
  expeditionbge%2F%0D%0ATwitter%3A+https%3A%2F%2Ftwitter.com%2F
  expeditionbge%0D%0AInstagram%3A+https%3A%2F%2F
  www.instagram.com%2Fexpedition.bge%2F%0D%0A
  Die+Petition%3A+https%3A%2F%2Fwww.change.org%2Fp%2F
  expedition-grundeinkommen-starten-wir-ein-staatliches-experiment`;

  const twitterText =
    'Hey+Leute%21+Ich+unterst%C3%BCtze+die+neue+Initiative+%40expeditionbge+%21+Die+Idee%3A+%23grundeinkommen+ausprobieren%2C+besser+verstehen+%26+gemeinsam+eine+faire+Debatte+f%C3%BChren.%0D%0AAlle+Infos+%26+Updates%3A%0D%0Ahttps%3A%2F%2Fexpedition-grundeinkommen.de%2F%0D%0Ahttps%3A%2F%2Fwww.facebook.com%2Fexpeditionbge%2F%0D%0Ahttps%3A%2F%2Fwww.instagram.com%2Fexpedition.bge%2F%0D%0A%28sharing+is+caring+%F0%9F%98%8A%29';

  return (
    <div className={cN(s.container, className)}>
      {children && <p>{children}</p>}
      <div className={`${s.iconContainer} ${s.shareButtons}`}>
        <SocialMediaButton
          icon={faFacebook}
          link={`https://www.facebook.com/share.php?u=https://expedition-grundeinkommen.de&quote=${facebookText}`}
          iconSize={iconSize}
          label="Teile auf Facebook"
        />
        <SocialMediaButton
          icon={faTwitter}
          link={`https://www.twitter.com/intent/tweet?status=${twitterText}`}
          iconSize={iconSize}
          label="Teile auf Twitter"
        />
      </div>
    </div>
  );
};
