import React from 'react';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../Components/Button/IconButton';
import EventMemberCard from './EventMemberCard';
import { EventMemberWarp } from './style';

const EventMember = ({ memberList, onMemberClick, onMemberAlign }) => {
  return (
    <EventMemberWarp>
      <ul className="memberList">
        {memberList.map((member, index) => (
          <EventMemberCard
            key={index}
            member={member}
            onMemberClick={onMemberClick}
          />
        ))}
      </ul>
      <div className="memberButton">
        <IconButton onClickEvent={onMemberAlign} icon={faThLarge} />
      </div>
    </EventMemberWarp>
  );
};

export default EventMember;
