import React, { useContext } from 'react';
import AuthContext from '../../../context/Authentication';
import { MunicipalityContext } from '../../../context/Municipality';
import { contentfulJsonToHtml } from '../../utils/contentfulJsonToHtml';
import { InlineLinkButton } from '../../Forms/Button';
import { SignUpButton } from '../../TickerToSignup/SignupButton';
import * as s from './style.module.less';

export const MunicipalityGroups = ({ body }) => {
  const { isAuthenticated, customUserData: userData } = useContext(AuthContext);
  const { municipality } = useContext(MunicipalityContext);

  const introText = body && contentfulJsonToHtml(body);

  // If municipality is set (meaning user is on municipality page) we want to show groups
  // for this municipality
  if (municipality) {
    return (
      <>
        {introText}

        {!municipality?.groups && (
          <NoGroupInfo municipalityName={municipality.name} />
        )}

        {municipality?.groups?.map(({ medium, link }, index) => (
          <p key={index}>
            <InlineLinkButton href={link} target="_blank">
              {medium}
            </InlineLinkButton>
          </p>
        ))}

        <CreateGroupInfo />
      </>
    );
  }

  // If user is authenticated we want to show their groups
  if (isAuthenticated) {
    // Sort municipalities, so that those with groups are first
    const sortedMunicipalites = sortMunicipalities(userData?.municipalities);

    return (
      <>
        {introText}

        {sortedMunicipalites?.map(({ name, groups }, municipalityIndex) => (
          <div key={municipalityIndex}>
            <h3>{name}</h3>

            {!groups && <NoGroupInfo municipalityName={name} />}

            {groups?.map(({ medium, link, name }, groupIndex) => (
              <p key={groupIndex}>
                {medium}:{' '}
                <InlineLinkButton href={link} target="_blank">
                  {name}
                </InlineLinkButton>
              </p>
            ))}
          </div>
        ))}

        <CreateGroupInfo />
      </>
    );
  }

  return (
    <>
      {introText}
      <p>
        Du bist noch in keinem Ort angemeldet. Sobald du dich für einen Ort
        anmeldest, siehst du hier (falls vorhanden) Gruppen zur Vernetzung.
      </p>
      <SignUpButton>Ich will dabei sein</SignUpButton>
    </>
  );
};

const NoGroupInfo = ({ municipalityName }) => (
  <p>Es gibt noch keine Gruppen für {municipalityName}.</p>
);

const CreateGroupInfo = () => (
  <p className={s.createGroupInfo}>
    <InlineLinkButton href="/gruppen">Hier</InlineLinkButton> erfährst du, wie
    du eine neue Gruppe erstellen kannst.
  </p>
);

// Sort municipalities, so that those with groups are first.
// If param is undefined, function returns undefined.
const sortMunicipalities = municipalities => {
  return municipalities?.sort((a, b) => {
    if (a.groups) {
      return -1;
    }

    if (b.groups) {
      return 1;
    }

    return 0;
  });
};

// Default export needed for lazy loading
export default MunicipalityGroups;
