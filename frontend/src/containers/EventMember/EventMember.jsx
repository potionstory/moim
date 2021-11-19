import React from 'react';
import EventMemberCard from './EventMemberCard';
import { EventMemberWarp } from './style';

const EventMember = ({ memberList, onMemberClick }) => {
  return (
    <EventMemberWarp>
      <ul className="memberList">
        {memberList.map((member) => (
          <EventMemberCard
            key={member.id}
            member={member}
            onMemberClick={onMemberClick}
          />
        ))}
      </ul>
    </EventMemberWarp>
  );
};

export default EventMember;
