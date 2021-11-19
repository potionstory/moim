import React, { memo, useState, useCallback, useEffect } from 'react';
import AnimatedNumbers from 'react-animated-numbers';
import { EventMemberCardWrap } from './style';

const EventMemberCard = memo(({ member, onMemberClick }) => {
  const { id, number, name, team, job, isConfirm } = member;

  const [isFixed, setIsFixed] = useState(false);
  const [isJobView, setIsJobView] = useState(false);

  const onJobClick = useCallback(() => {
    setIsJobView((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isConfirm) setTimeout(() => setIsFixed(true), 2000);
  }, [isConfirm]);

  return (
    <li>
      <EventMemberCardWrap
        team={team}
        onClick={() => isConfirm || onMemberClick(id)}
      >
        <span className="job">
          <span onClick={() => !isFixed || onJobClick()}>
            {isJobView ? job : '???'}
          </span>
        </span>
        <span className="number">
          {!isFixed ? (
            !number ? (
              '?'
            ) : (
              <AnimatedNumbers
                animateToNumber={number}
                fontStyle={{ fontSize: 64 }}
                configs={[
                  { mass: 1, tension: 130, friction: 40 },
                  { mass: 2, tension: 140, friction: 40 },
                  { mass: 3, tension: 130, friction: 40 },
                ]}
              ></AnimatedNumbers>
            )
          ) : (
            number
          )}
        </span>
        <span className="name">{name}</span>
      </EventMemberCardWrap>
    </li>
  );
});

export default EventMemberCard;
