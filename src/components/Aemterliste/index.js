import React, { useState } from 'react';
import { TextInput } from '../Forms/TextInput';
import sourceCSV from 'raw-loader!./source.csv';
import parseCSV from 'csv-parse/lib/sync';
import s from './style.module.less';

export default () => {
  const [selectedAmt, setSelectedAmt] = useState(null);
  const source = parseCSV(sourceCSV, { delimiter: ';' });

  const [{ sorted, gemeindenByName }] = useState(() => {
    const sorted = {};
    const gemeindenByName = {};

    source.forEach((amt, forIndex) => {
      if (amt[2] === '') {
        // starts with 0 means does only have one gemeinde
        if (amt[0].startsWith('0')) {
          let index = 0;
          let amtExtended = generateAmtId(amt[0], index);

          while (sorted[amtExtended] !== undefined) {
            index++;
            amtExtended = generateAmtId(amt[0], index);
          }

          sorted[amtExtended] = {
            amt: amt[1],
            gemeinden: [`${source[forIndex + 1][2]} ${amt[1]}`],
          };
        } else {
          sorted[amt[0]] = { amt: amt[1], gemeinden: [] };
        }
      }
    });

    source.forEach(gemeinde => {
      if (gemeinde[2] !== '') {
        if (sorted[gemeinde[0]]) {
          sorted[gemeinde[0]].gemeinden.push(`${gemeinde[2]} ${gemeinde[1]}`);
        }
      }
    });

    Object.entries(sorted).forEach(([key, amt]) => {
      amt.gemeinden.forEach(gemeinde => {
        gemeindenByName[`${gemeinde} (${amt.amt})`] = key;
      });
    });
    return { sorted, gemeindenByName };
  });

  return (
    <>
      <label htmlFor="gemeindenInput">PLZ Ort (Amt)</label>
      <br />
      <TextInput
        list="gemeinden"
        id="gemeindenInput"
        className={s.input}
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
            <option key={gemeinde} value={gemeinde} aria-label="Gemeinde" />
          ))}
      </datalist>
      {selectedAmt && (
        <dl>
          <dt>Amt</dt>
          <dd>{selectedAmt.amt}</dd>
          <br />
          <dt>Alle Orte</dt>
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
