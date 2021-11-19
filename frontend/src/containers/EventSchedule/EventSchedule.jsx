import React from 'react';
import { EventScheduleWrap } from './style';

const EventSchedule = () => {
  return (
    <EventScheduleWrap>
      <h2>2022 1/2 [FE] COMMUNITY MEETUP</h2>
      <p>2022년 상반기 프론트엔드 커뮤니티 정모에 참석해주셔서 감사합니다.</p>
      <div>테이블로 모임 시간표 작성</div>
      <table>
        <thead>
          <tr>
            <td>시간</td>
            <td>내용</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10:00 ~ 11:00</td>
            <td>밥먹기</td>
          </tr>
          <tr>
            <td>10:00 ~ 11:00</td>
            <td>밥먹기</td>
          </tr>
          <tr>
            <td>10:00 ~ 11:00</td>
            <td>밥먹기</td>
          </tr>
          <tr>
            <td>10:00 ~ 11:00</td>
            <td>밥먹기</td>
          </tr>
        </tbody>
      </table>
    </EventScheduleWrap>
  );
};

export default EventSchedule;
