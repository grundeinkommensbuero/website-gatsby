import React, { useContext } from 'react';
import AuthContext from '../../../context/Authentication';
import { MunicipalityContext } from '../../../context/Municipality';
import AvatarImage from '../../AvatarImage';
import { LinkButtonLocal } from '../../Forms/Button';
import { formatDate } from '../../utils';
import s from './style.module.less';

export const ProfileTile = ({ body }) => {
  const { userId, customUserData: userData } = useContext(AuthContext);
  const { municipality } = useContext(MunicipalityContext);

  return (
    <>
      {userId && (
        <div>
          <div>
            <AvatarImage user={userData} className={s.avatar} />
          </div>
          <div>
            <h3>{userData.username}</h3>
            <p>{userData.city}</p>
            <p>
              Dabei seit dem{' '}
              {userData.createdAt && formatDate(new Date(userData.createdAt))}
            </p>
          </div>
          <div>
            <LinkButtonLocal to={`/mensch/${userId}`}>
              Zum Profil
            </LinkButtonLocal>
          </div>
          <div>
            <h3>Hallo {userData.username}!</h3>
            {municipality && (
              <p>
                Du hast dich für {municipality.name} angemeldet. Schön, dass du
                dabei bist!
              </p>
            )}
            <p>Besuche dein Profil, um deine Einstellungen zu ändern.</p>
          </div>
        </div>
      )}
    </>
  );
};
