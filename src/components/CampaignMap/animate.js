import anime from 'animejs';

export const animate = ({
  fadeOpacities,
  setFadeOpacities,
  dataEvents,
  setDataEvents,
  flyToAgsOnLoad,
  updateFocus,
  animateOnLoad,
}) => {
  const localEvents = [...dataEvents];
  const localOpacities = { ...fadeOpacities };
  const tl = anime.timeline();
  tl.add({
    targets: localOpacities,
    fallback: [1, 0],
    map: [0, 1],
    delay: 1200,
    duration: 500,
    easing: 'easeOutQuad',
    update() {
      setFadeOpacities({ ...localOpacities });
    },
  });
  if (animateOnLoad) {
    tl.add(
      {
        targets: localEvents.filter(x => x.category === 'new'),
        latitude: d => d.latitudeRange,
        signups: d => d.signupsRange,
        percentToGoal: d => d.percentToGoalRange,
        duration: 800,
        delay: anime.stagger(280),
        easing: 'easeOutQuad',
        update() {
          setDataEvents([...localEvents]);
        },
      },
      '-=500'
    );
    tl.add(
      {
        targets: localEvents.filter(x => x.category === 'change'),
        signups: d => d.signupsRange,
        percentToGoal: d => d.percentToGoalRange,
        duration: 1200,
        delay: anime.stagger(400),
        easing: 'easeOutElastic(10,0.3)',
        update() {
          setDataEvents([...localEvents]);
        },
      },
      '-=500'
    );
    tl.add(
      {
        targets: localEvents.filter(x => x.category === 'win'),
        signups: d => d.signupsRange,
        percentToGoal: d => d.percentToGoalRange,
        duration: 1200,
        delay: anime.stagger(400),
        easing: 'easeOutElastic(10,0.4)',
        update() {
          console.log('win');
          setDataEvents([...localEvents]);
        },
      },
      '-=500'
    );
  }

  tl.add({
    duration: 1,
    complete() {
      if (flyToAgsOnLoad) {
        updateFocus();
      }
    },
  });
  tl.pause();
  tl.play();
};
