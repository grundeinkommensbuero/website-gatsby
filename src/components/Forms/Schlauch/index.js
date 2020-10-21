import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/Authentication';
import ImageUpload from '../ImageUpload';
import SocialMediaButton from '../../SocialMedia/Button';
import SelectedImage from '../ImageUpload/SelectedImage';
import { CTAButton } from '../../Layout/CTAButton';

export default () => {
  const [step, setStep] = useState('imageUpload');
  const { customUserData: userData, userId } = useContext(AuthContext);

  if (step === 'imageUpload') {
    return (
      <ImageUpload
        userData={userData}
        userId={userId}
        onUploadDone={() => setStep('share')}
        pickFromFacebook={true}
      />
    );
  }

  if (step === 'share') {
    return <div>Sharen</div>;
  }

  return <div></div>;
};

const FacebookShare = () => {
  // return (
  //   <SocialMediaButton
  //     icon="Facebook"
  //     link={`https://www.facebook.com/sharer.php?u=https://expedition-grundeinkommen.de&quote=${facebookText}`}
  //     iconSize={iconSize}
  //     label="Teile auf Facebook"
  //     className={s.shareButton}
  //   />
  // );
};
