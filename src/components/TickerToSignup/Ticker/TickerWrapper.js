import React, { useContext, useState, useEffect } from 'react';
import { MunicipalityContext } from '../../../context/Municipality';
import * as u from './utils';

import { Ticker } from './TickerMain.jsx';

import './reelstyle.less';

const TickerWrapper = ({ tickerDescription }) => {
    const { statsSummary, refreshContextStats } = useContext(MunicipalityContext);
    const [timerIsReady, setTimerIsReady] = useState(false);
    const [peopleCount, setPeopleCount] = useState(0);
    const [municipalityCount, setMunicipalityCount] = useState(0);
    const [updatedSummary, setUpdatedSummary] = useState(0);
    const [timePassedInIntervalInPercent, setTimePassedInIntervalInPercent] = useState(0);

    const prevTimestamp = new Date(statsSummary?.previous.timestamp);
    const currTimestamp = new Date(statsSummary?.timestamp);

    useEffect(() => {
        if (statsSummary && statsSummary.previous) {
            calcTickerValues({ prevTimestamp, currTimestamp, setTimePassedInIntervalInPercent });
            setTimerIsReady(true);
            setUpdatedSummary(updatedSummary + 1);
        }
    }, [statsSummary]);

    useEffect(() => {
        let updateTickerTimeout;
        const timerConf = {
            numberBetweenOneAndThree: Math.floor(Math.random() * 3) + 1,
            interval: 3000
        };
        // Set timer in a range of 3 to 9 seconds
        const randomTimer = timerConf.numberBetweenOneAndThree * timerConf.interval;
        if (timerIsReady && timePassedInIntervalInPercent <= 1) {
            // Set timeout to display data in the Ticker Comp
            // console.log('Timer set to:', randomTimer, 'ms');
            updateTickerTimeout = setTimeout(() => {
                calcTickerValues({ prevTimestamp, currTimestamp, setTimePassedInIntervalInPercent });
            }, randomTimer);
        }
        // Clear Timeout when done
        return () => {
            clearTimeout(updateTickerTimeout);
        }
    }, [updatedSummary]);

    useEffect(() => {
        if (statsSummary && statsSummary.previous) {
            updateTicker();
        }
    }, [timePassedInIntervalInPercent]);

    const updateTicker = () => {
        console.log('Percent of Interval passed:', timePassedInIntervalInPercent);
        // Get users and calculate users won in the last 15 minutes
        const prevCountUsers = statsSummary?.previous?.users;
        const currCountUsers = statsSummary?.users;
        const usersWonInInterval = u.diffCount(prevCountUsers, currCountUsers);
        const usersToAdd = Math.floor(usersWonInInterval * timePassedInIntervalInPercent);
        console.log('Users to add:', usersToAdd);
        // Get municiplaities and calculate users won in the last 15 minutes
        const prevCountMunicipalities = statsSummary?.previous?.municipalities;
        const currCountMunicipalities = statsSummary?.municipalities;
        const municipalitiesWonInInterval = u.diffCount(prevCountMunicipalities, currCountMunicipalities);
        const municipalitiesToAdd = Math.floor(municipalitiesWonInInterval * timePassedInIntervalInPercent);
        console.log('Municipalities to add:', municipalitiesToAdd);

        if (timePassedInIntervalInPercent <= 1) {
            console.log('Setting Users to:', prevCountUsers + usersToAdd);
            setPeopleCount(prevCountUsers + usersToAdd);
            console.log('Setting Municipalities to:', prevCountMunicipalities + municipalitiesToAdd);
            setMunicipalityCount(prevCountMunicipalities + municipalitiesToAdd);
            setTimeout(() => {
                setUpdatedSummary(updatedSummary + 1);
            }, 1000);
        } else {
            refreshContextStats();
        }
    };

    const calcTickerValues = ({
        prevTimestamp,
        currTimestamp,
        setTimePassedInIntervalInPercent
    }) => {
        // prepare variables for calulation of time passed in percent
        const currTime = new Date();
        const intervalLength = u.diffSeconds(prevTimestamp, currTimestamp);
        const timePassed = u.diffSeconds(currTimestamp, currTime);
        const calcTimePassed = timePassed / intervalLength;
        setTimePassedInIntervalInPercent(calcTimePassed);
    };

    return (
        <Ticker
            prefixText="Schon"
            highlight1={peopleCount}
            inBetween1="Menschen in"
            // inBetween2="in"
            highlight2={municipalityCount}
            suffixHighlight2="Orten sind dabei."
            tickerDescription={tickerDescription}
        />
    );
};

export default TickerWrapper;