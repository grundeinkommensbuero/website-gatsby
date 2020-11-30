import anime from 'animejs';

export const animate = ({
  dataEvents,
  setDataEvents,
  initialFly,
  updateFocus,
}) => {
  const localEvents = [...dataEvents];
  const tl = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 1200,
    begin() {
      // console.log('animate');
    },
    complete() {
      if (initialFly) {
        updateFocus();
      }
    },
  });
  tl.add(
    {
      targets: localEvents.filter(x => x.category === 'new'),
      latitude: d => d.latitudeRange,
      signups: d => d.signupsRange,
      percentToGoal: d => d.percentToGoalRange,
      duration: 900,
      delay: anime.stagger(300),
      easing: 'easeOutQuad',
      update() {
        setDataEvents([...localEvents]);
      },
    },
    '+=500'
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
        setDataEvents([...localEvents]);
      },
    },
    '-=500'
  );
  tl.play();
};
