import React, { useContext } from 'react';
import AuthContext from '../../../context/Authentication';
import { MunicipalityContext } from '../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../hooks/Municipality/UserMunicipalityContentfulState';
import AvatarImage from '../../AvatarImage';
import { LinkButtonLocal } from '../../Forms/Button';
import { formatDate } from '../../utils';
import s from './style.module.less';
import cN from 'classnames';

export const ProfileTile = ({ body }) => {
  const { userId, customUserData: userData } = useContext(AuthContext);
  const { municipality } = useContext(MunicipalityContext);
  const tileData = { userId, userData, municipality };

  // console.log(userData);

  const {
    municipalityContentfulState,
    userContentfulState,
  } = useUserMunicipalityContentfulState();
  // console.log(userContentfulState, municipalityContentfulState);

  if (userContentfulState === 'loggedInThisMunicipalitySignup') {
    return <TileLoggedInThisMunicipality {...tileData} />;
  }
  if (
    municipalityContentfulState === 'noMunicipality' &&
    userContentfulState === 'loggedInOtherMunicipalitySignup'
  ) {
    return <TileLoggedInOtherMunicipality {...tileData} />;
  }
  // if (
  //   municipalityContentfulState === 'noMunicipality' &&
  //   userContentfulState === 'loggedInNoMunicipalitySignup'
  // ) {
  //   return <WelcomeBack {...tileData} />;
  // }
  return <></>;
};

const TileLoggedInThisMunicipality = ({ userId, userData, municipality }) => {
  return (
    <>
      {userId && (
        <div className={cN(s.tileContainer, s.sectionAqua)}>
          <div className={s.avatarAndInfo}>
            <div className={s.avatarContainer}>
              <AvatarImage user={userData} className={s.avatar} />
            </div>

            <div className={s.info}>
              <h3 className={cN(s.headline, s.centerMobile)}>
                {userData.username}
              </h3>
              <ul className={cN(s.infoText, s.centerMobile)}>
                <li className={s.centerMobile}>{userData.city}</li>
                <li className={s.centerMobile}>
                  Dabei seit dem{' '}
                  {userData.createdAt &&
                    formatDate(new Date(userData.createdAt))}
                </li>
              </ul>
            </div>
          </div>
          <div className={s.flexElement}>
            <h3 className={s.headline}>Hallo {userData.username}!</h3>
            {municipality && (
              <p>
                Du hast dich für {municipality.name} angemeldet. Schön, dass du
                dabei bist!
              </p>
            )}
            <p>Besuche dein Profil, um deine Einstellungen zu ändern.</p>
            <div>
              <LinkButtonLocal to={`/mensch/${userId}`}>
                Zum Profil
              </LinkButtonLocal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TileLoggedInOtherMunicipality = ({ userId, userData, municipality }) => {
  return (
    <>
      {userId && (
        <div className={cN(s.tileContainer, s.sectionWhite)}>
          <div className={s.flexElement}>
            <h3 className={s.headline}>Hallo {userData.username}! </h3>

            <p>Du bist bereits in folgenden Orten angemeldet:</p>
            <div className={s.municipalityButtonGroup}>
              {userData.municipalities.map(municipality => {
                return (
                  <div key={municipality.ags}>
                    <p className={s.municipalityLabel}>{municipality.name}</p>
                    <LinkButtonLocal to={`/gemeinden/${municipality.ags}`}>
                      Zur Seite von {municipality.name}
                    </LinkButtonLocal>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={s.avatarAndInfo}>
            <div className={s.avatarContainer}>
              <AvatarImage user={userData} className={s.avatar} />
            </div>

            <div className={s.info}>
              <h3 className={cN(s.headline, s.centerMobile)}>
                {userData.username}
              </h3>
              <ul className={cN(s.infoText, s.centerMobile)}>
                <li className={s.centerMobile}>{userData.city}</li>
                <li className={s.centerMobile}>
                  Dabei seit dem{' '}
                  {userData.createdAt &&
                    formatDate(new Date(userData.createdAt))}
                </li>
              </ul>
            </div>
            <div>
              <p>Besuche dein Profil, um deine Einstellungen zu ändern.</p>
              <LinkButtonLocal to={`/mensch/${userId}`}>
                Zum Profil
              </LinkButtonLocal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// const WelcomeBack = () => {
//   return <div>Test</div>;
// };
