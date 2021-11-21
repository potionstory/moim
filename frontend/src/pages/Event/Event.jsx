import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { produce } from 'immer';
import EventTop from '../../Containers/EventTop';
import EventMember from '../../Containers/EventMember';
import EventSchedule from '../../Containers/EventSchedule';
import EventGame from '../../Containers/EventGame';
import EventLotto from '../../containers/EventLotto';
import { eventTabMenu } from '../../lib/const';

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const MEMBER_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const MEMBER_JOB = [
  '직업1',
  '직업2',
  '직업3',
  '직업4',
  '직업5',
  '직업6',
  '직업7',
  '직업8',
  '직업9',
  '직업10',
  '직업11',
  '직업12',
  '직업13',
  '직업14',
  '직업15',
];
const MEMBER_TEAM = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5];
const memberData = [
  {
    id: 0,
    number: null,
    name: 'name01',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 1,
    number: null,
    name: 'name02',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 2,
    number: null,
    name: 'name03',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 3,
    number: null,
    name: 'name04',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 4,
    number: null,
    name: 'name05',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 5,
    number: null,
    name: 'name06',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 6,
    number: null,
    name: 'name07',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 7,
    number: null,
    name: 'name08',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 8,
    number: null,
    name: 'name09',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 9,
    number: null,
    name: 'name10',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 10,
    number: null,
    name: 'name11',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 11,
    number: null,
    name: 'name12',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 12,
    number: null,
    name: 'name13',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 13,
    number: null,
    name: 'name14',
    team: null,
    job: null,
    isConfirm: false,
  },
  {
    id: 14,
    number: null,
    name: 'name15',
    team: null,
    job: null,
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

          draft[index].isConfirm = true;
        }),
      );
    },
    [memberList],
  );

  const onMemberAlign = useCallback(() => {
    setMemberList([...memberList].sort((a, b) => a.team - b.team));
  }, memberList);

  const EventTabMenuSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return (
          <EventMember
            memberList={memberList}
            onMemberClick={onMemberClick}
            onMemberAlign={onMemberAlign}
          />
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
  }, [tabIndex, memberList, onMemberClick, onMemberAlign]);

  useEffect(() => {
    shuffle(MEMBER_NUMBER);
    shuffle(MEMBER_JOB);
    shuffle(MEMBER_TEAM);

    setMemberList(
      memberList.map((member, index) => {
        member.number = MEMBER_NUMBER[index];
        member.job = MEMBER_JOB[index];
        member.team = MEMBER_TEAM[index];

        return member;
      }),
    );
  }, []);

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
