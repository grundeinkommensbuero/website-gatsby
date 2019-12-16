import React, { useState } from 'react';
import { TextInput } from '../Forms/TextInput';
import sourceCSV from 'raw-loader!./source.csv';
import parseCSV from 'csv-parse/lib/sync';

export default () => {
  const [selectedAmt, setSelectedAmt] = useState(null);
  const sorted = {};
  const source = parseCSV(sourceCSV, { delimiter: ';' });

  source.forEach(amt => {
    if (amt[2] === '') {
      if (amt[0].startsWith('0')) {
        let index = 0;
        let amtExtended = generateAmtId(amt[0], index);
        while (sorted[amtExtended] !== undefined) {
          index++;
          amtExtended = generateAmtId(amt[0], index);
        }

        sorted[amtExtended] = { amt: amt[1], gemeinden: [amt[1]] };
      } else {
        sorted[amt[0]] = { amt: amt[1], gemeinden: [] };
      }
    }
  });

  source.forEach(gemeinde => {
    if (gemeinde[2] !== '') {
      if (sorted[gemeinde[0]]) {
        sorted[gemeinde[0]].gemeinden.push(gemeinde[1]);
      }
    }
  });

  const gemeindenByName = {};

  Object.entries(sorted).forEach(([key, amt]) => {
    amt.gemeinden.forEach(gemeinde => {
      gemeindenByName[`${gemeinde} (${amt.amt})`] = key;
    });
  });

  return (
    <>
      <label htmlFor="gemeindenInput">gemeinde</label>
      <br />
      <TextInput
        list="gemeinden"
        id="gemeindenInput"
        onChange={e => {
          if (gemeindenByName[e.target.value]) {
            setSelectedAmt(sorted[gemeindenByName[e.target.value]]);
          }
        }}
      />
      <datalist id="gemeinden">
        {Object.keys(gemeindenByName)
          .sort()
          .map(gemeinde => (
            <option key={gemeinde} value={gemeinde} />
          ))}
      </datalist>
      {selectedAmt && (
        <dl>
          <dt>Amt</dt>
          <dd>{selectedAmt.amt}</dd>
          <dt>Gemeinden</dt>
          {selectedAmt.gemeinden.map(gemeinde => (
            <dd key={gemeinde}>{gemeinde}</dd>
          ))}
        </dl>
      )}
      <hr />
    </>
  );
};

function generateAmtId(amtExtended, index) {
  return `${amtExtended}-${index}`;
}
