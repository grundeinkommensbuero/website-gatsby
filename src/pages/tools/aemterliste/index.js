import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import Helmet from 'react-helmet';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../../components/Layout/Sections';
import { AEMTER, GEMEINDEN } from './aemter';

export default () => {
  const [selectedAmt, setSelectedAmt] = useState(null);
  const sorted = {};

  AEMTER.forEach(amt => {
    if (amt[1].startsWith('0')) {
      let index = 0;
      let amtExtended = generateAmtId(amt[1], index);
      while (sorted[amtExtended] !== undefined) {
        index++;
        amtExtended = generateAmtId(amt[1], index);
      }

      sorted[amtExtended] = { amt: amt[0], gemeinden: [amt[0]] };
    } else {
      sorted[amt[1]] = { amt: amt[0], gemeinden: [] };
    }
  });

  GEMEINDEN.forEach(gemeinde => {
    if (sorted[gemeinde[1]]) {
      sorted[gemeinde[1]].gemeinden.push(gemeinde[0]);
    }
  });

  const gemeindenByName = {};

  Object.entries(sorted).forEach(([key, amt]) => {
    amt.gemeinden.forEach(gemeinde => {
      gemeindenByName[gemeinde] = key;
    });
  });

  return (
    <Layout>
      <Helmet>
        <title>Ämter</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Ämter in SH">
          <SectionInner>
            <input
              list="suggestionList"
              id="answerInput"
              onChange={e => {
                if (gemeindenByName[e.target.value]) {
                  setSelectedAmt(sorted[gemeindenByName[e.target.value]]);
                }
              }}
            />
            <datalist id="suggestionList">
              {Object.keys(gemeindenByName).map(gemeinde => (
                <option key={gemeinde} value={gemeinde} />
              ))}
            </datalist>

            {selectedAmt && (
              <dl>
                <dt>Amt</dt>
                <dd>{selectedAmt.amt}</dd>
                <dt>Gemeinden</dt>
                {selectedAmt.gemeinden.map(gemeinde => (
                  <dd>{gemeinde}</dd>
                ))}
              </dl>
            )}
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

function generateAmtId(amtExtended, index) {
  return `${amtExtended}-${index}`;
}
