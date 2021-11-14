import React from 'react';
import EventTop from '../../Containers/EventTop';
import EventIntro from '../../Containers/EventIntro';
import EventMember from '../../Containers/EventMember';
import EventGame from '../../Containers/EventGame';

const Event = () => {
  return (
    <>
      <EventTop />
      <EventIntro />
      <EventMember />
      <EventGame />
    </>
  );
};

export default Event;
