import React, { useState, useCallback, useMemo } from 'react';
import { produce } from 'immer';
import EventTop from '../../Containers/EventTop';
import EventMember from '../../Containers/EventMember';
import EventSchedule from '../../Containers/EventSchedule';
import EventGame from '../../Containers/EventGame';
import EventLotto from '../../containers/EventLotto';
import { eventTabMenu } from '../../lib/const';

const MEMBER_LENGTH = 12;
const memberData = [
  {
    id: 0,
    number: 0,
    name: 'potionstorypotionstory',
    team: 0,
    job: '도둑',
    isConfirm: false,
  },
  {
    id: 1,
    number: 0,
    name: '어리양',
    team: 0,
    job: '경찰',
    isConfirm: false,
  },
  {
    id: 2,
    number: 0,
    name: 'jurijung',
    team: 0,
    job: '테란',
    isConfirm: false,
  },
  {
    id: 3,
    number: 0,
    name: 'Latte',
    team: 0,
    job: '프로토스',
    isConfirm: false,
  },
  {
    id: 4,
    number: 0,
    name: 'potionstorypotionstory',
    team: 0,
    job: '도둑',
    isConfirm: false,
  },
  {
    id: 5,
    number: 0,
    name: '어리양',
    team: 0,
    job: '경찰',
    isConfirm: false,
  },
  {
    id: 6,
    number: 0,
    name: 'jurijung',
    team: 0,
    job: '테란',
    isConfirm: false,
  },
  {
    id: 7,
    number: 0,
    name: 'Latte',
    team: 0,
    job: '프로토스',
    isConfirm: false,
  },
  {
    id: 8,
    number: 0,
    name: 'potionstorypotionstory',
    team: 0,
    job: '도둑',
    isConfirm: false,
  },
  {
    id: 9,
    number: 0,
    name: '어리양',
    team: 0,
    job: '경찰',
    isConfirm: false,
  },
  {
    id: 10,
    number: 0,
    name: 'jurijung',
    team: 0,
    job: '테란',
    isConfirm: false,
  },
  {
    id: 11,
    number: 0,
    name: 'Latte',
    team: 0,
    job: '프로토스',
    isConfirm: false,
  },
];

const Event = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [memberList, setMemberList] = useState(memberData);

  const onTabClick = useCallback(
    (index) => {
      setTabIndex(index);
    },
    [eventTabMenu],
  );

  const onMemberClick = useCallback(
    (id) => {
      setMemberList(
        produce((draft) => {
          const index = memberList.findIndex((member) => member.id === id);
          let number = Math.floor(Math.random() * MEMBER_LENGTH) + 1;

          while (
            memberList.findIndex((member) => member.number === number) !== -1
          ) {
            number = Math.floor(Math.random() * MEMBER_LENGTH) + 1;
          }

          draft[index].number = number;
          draft[index].team = Math.floor(Math.random() * 5) + 1;
          draft[index].isConfirm = true;
        }),
      );
    },
    [memberList],
  );

  const EventTabMenuSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return (
          <EventMember memberList={memberList} onMemberClick={onMemberClick} />
        );
      case 1:
        return <EventSchedule />;
      case 2:
        return <EventGame />;
      case 3:
        return <EventLotto />;
      default:
        return false;
    }
  }, [tabIndex, memberList, onMemberClick]);

  console.log('memberList: ', memberList);

  return (
    <>
      <EventTop
        tabMenu={eventTabMenu}
        tabTitle={eventTabMenu[tabIndex].title}
        tabIndex={tabIndex}
        onTabClick={onTabClick}
      />
      {EventTabMenuSwitch}
    </>
  );
};

export default Event;
