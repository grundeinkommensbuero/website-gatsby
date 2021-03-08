import React, { useContext, useState, useEffect } from 'react';
import { MunicipalityContext } from '../../../context/Municipality';

import TickerMunicipality from './TickerMunicipality.jsx';

import './reelstyle.less';

export const TickerMunicipalityWrapper = () => {
    const { municipality } = useContext(MunicipalityContext);
    const [peopleCount, setPeopleCount] = useState(0);

    useEffect(() => {
        if (municipality && typeof municipality.signups === 'number') {
            setPeopleCount(municipality.signups);
        }
    }, [municipality]);

    return (
        <TickerMunicipality
            prefixText="Schon"
            highlight1={peopleCount}
            inBetween1=""
            inBetween2="Menschen holen Grundeinkommen nach"
            highlight2={municipality?.name}
            suffixHighlight2=""
        />
    );
};