import React, { useState, useRef, useEffect } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import cN from 'classnames';
import { formatDateMonthYear, contentfulJsonToHtml } from '../utils';
import { LinkButtonLocal } from '../Forms/Button';
import { useSignatureCount } from '../../hooks/Api/Signatures/Get';
import { Link } from 'gatsby';
import eyeCatcherBackground from '!svg-inline-loader!./eye_catcher.svg';
import { Tooltip } from '../Tooltip';
import VisualCounter from '../VisualCounter';

export default ({ visualisations }) => {
  const currentCounts = useSignatureCount();

  return (
    <>
      {visualisations.map((visualisation, index) => (
        <Visualisation
          key={index}
          index={index}
          currentCount={
            currentCounts &&
            currentCounts[visualisation.campainCode] &&
            currentCounts[visualisation.campainCode].computed
          }
          receivedCount={
            currentCounts &&
            currentCounts[visualisation.campainCode] &&
            currentCounts[visualisation.campainCode].withMixed
          }
          {...visualisation}
          showCTA={visualisations.length !== 1 && visualisation.ctaLink}
        />
      ))}
    </>
  );
};

const Visualisation = ({
  //typo: also in contentful 'campainCode', so no big day
  campainCode,
  goal,
  startDate,
  title,
  currentCount,
  receivedCount,
  minimum,
  maximum,
  addToSignatureCount,
  showCTA,
  ctaLink,
  eyeCatcher,
  goalUnbuffered,
  index,
  hint,
  goalInbetweenMultiple,
  addSelfScanned,
}) => {
  const barEl = useRef(null);
  const [isInView, setIsInView] = useState(false);
  let goalInbetween;

  if (goalInbetweenMultiple) {
    const goalInbetweenMultipleSorted = goalInbetweenMultiple
      .map(goal => parseInt(goal))
      .sort((next, prev) => next - prev)
      .reverse();

    goalInbetween = goalInbetweenMultipleSorted.find((goal, index) => {
      if (!goalInbetweenMultipleSorted[index + 1]) {
        return goalInbetweenMultipleSorted[0] > currentCount;
      }
      return (
        currentCount < goal &&
        currentCount > goalInbetweenMultipleSorted[index + 1]
      );
    });
  }
  const EyeCatcherContent = eyeCatcher && contentfulJsonToHtml(eyeCatcher.json);

  const goalInbetweenPercentage = goalInbetween && (goalInbetween / goal) * 100;

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsInView(true);
            }
          });
        },
        {
          threshold: 1.0,
        }
      );

      observer.observe(barEl.current);
    } else {
      setIsInView(true);
    }
  }, []);

  const dateString = formatDateMonthYear(new Date(startDate));
  const hasStarted = new Date().getTime() > new Date(startDate);

  let count = currentCount || 0;

  if (currentCount) {
    if (addToSignatureCount) {
      count += addToSignatureCount;
    }

    if (minimum) {
      count = Math.max(count, minimum);
    }

    if (maximum) {
      count = Math.min(count, maximum);
    }
  }

  if (addSelfScanned) {
    count += addSelfScanned;
  }

  const hintWithVariables = replaceVariablesHintText({
    hint: hint && hint.hint,
    goal,
    goalInbetween,
    count,
    receivedCount,
    goalUnbuffered,
  });

  const percentage =
    count && isInView
      ? Math.max(Math.min((count / (goalInbetween || goal)) * 100, 100), 3)
      : 0;
  const countOutside = percentage < 40;

  const barGoalWidth = Math.min(100, ((goalInbetween || goal) / count) * 100);

  return (
    <SectionInner
      wide={true}
      className={cN({ [s.sectionInnerHasEyeCatcher]: !!EyeCatcherContent })}
    >
      {title && <h2 className={s.title}>{title}</h2>}
      {hintWithVariables && <div className={s.hint}>{hintWithVariables}</div>}

      <div
        className={cN(s.body, { [s.showCTA]: showCTA })}
        style={{ zIndex: index }}
      >
        <div className={s.bar} ref={barEl}>
          <WrapInLink link={showCTA && ctaLink}>
            <span
              className={cN(s.barGoal, { [s.hasNotStarted]: !hasStarted })}
              aria-hidden="true"
              style={{ width: `${barGoalWidth || 100}%` }}
            >
              <div className={s.barGoalBar}>
                {hasStarted && (
                  <div
                    className={s.barGoalInbetween}
                    style={{ width: `${goalInbetweenPercentage || 100}%` }}
                  ></div>
                )}
              </div>
              {goal && !goalInbetween && (
                <Tooltip
                  className={s.goal}
                  content={<>Benötigte Unterschriften</>}
                >
                  {goal.toLocaleString('de')}
                </Tooltip>
              )}

              {goalInbetween && (
                <Tooltip
                  className={s.goal}
                  content={
                    <>
                      Insgesamt benötigt:
                      <br />
                      {goal.toLocaleString('de')} Unterschriften
                    </>
                  }
                >
                  Nächstes Ziel: {goalInbetween.toLocaleString('de')}{' '}
                  Unterschriften
                </Tooltip>
              )}
            </span>
            {hasStarted && (
              <>
                <span
                  className={cN(s.barCurrent, { [s.outside]: countOutside })}
                  style={{ width: `${percentage}%` }}
                  aria-label={`${count} von ${goal} Unterschriften`}
                >
                  <Tooltip
                    content="Gesammelte Unterschriften"
                    className={s.barCurrentLabel}
                    placement="bottom"
                  >
                    {count && <VisualCounter end={isInView ? count : 0} />}
                  </Tooltip>
                </span>
              </>
            )}
            {!hasStarted && (
              <span
                aria-label={`Noch nicht gestartet. Ziel: ${goal}. Startet ${dateString}.`}
                className={s.starts}
              >
                {dateString}
              </span>
            )}
          </WrapInLink>
        </div>
        {showCTA && (
          <LinkButtonLocal size="MEDIUM" className={s.cta} to={ctaLink}>
            Mitmachen
          </LinkButtonLocal>
        )}
        {EyeCatcherContent && (
          <div
            className={cN(s.eyeCatcher, {
              [s.eyeCatcherWithCta]: showCTA && ctaLink,
            })}
          >
            <WrapInLink link={showCTA && ctaLink} className={s.eyeCatcherLink}>
              <div
                className={s.eyeCatcherBackground}
                dangerouslySetInnerHTML={{ __html: eyeCatcherBackground }}
                aria-hidden="true"
              />
              <div className={s.eyeCatcherContent}>{EyeCatcherContent}</div>
            </WrapInLink>
          </div>
        )}
      </div>
    </SectionInner>
  );
};

function replaceVariablesHintText({
  hint,
  goal,
  count,
  receivedCount,
  goalInbetween,
  goalUnbuffered,
}) {
  if (!hint) return undefined;
  const buffer = goal - goalUnbuffered;
  const expectedToArrive = count - receivedCount;

  return hint
    .replace(
      /\$GOAL_INBETWEEN/gi,
      goalInbetween && goalInbetween.toLocaleString('de')
    )
    .replace(
      /\$GOAL_UNBUFFERED/gi,
      goalUnbuffered && goalUnbuffered.toLocaleString('de')
    )
    .replace(/\$GOAL/gi, goal && goal.toLocaleString('de'))
    .replace(/\$BUFFER/gi, buffer && buffer.toLocaleString('de'))
    .replace(/\$COLLECTED/gi, count && count.toLocaleString('de'))
    .replace(
      /\$RECEIVED/gi,
      receivedCount ? receivedCount.toLocaleString('de') : ''
    )
    .replace(
      /\$EXPECTED/gi,
      expectedToArrive ? expectedToArrive.toLocaleString('de') : ''
    );
}

const WrapInLink = ({ link, children, className }) => {
  if (link) {
    return (
      <Link to={link} className={className}>
        {children}
      </Link>
    );
  }
  return <>{children}</>;
};
