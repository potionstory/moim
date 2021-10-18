import React, { memo } from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { weeks } from '../../lib/const';
import { CardScheduleBoxWrap } from './style';

const CardScheduleBox = memo(({
  isSameDate,
  eventStartDate,
  eventStartWeek,
  eventEndDate,
  eventEndWeek,
}) => {
  return (
    <CardScheduleBoxWrap>
      {isSameDate ? (
        <div className="dateBox">
          <span className="month">{`${eventStartDate[0]}.${eventStartDate[1]}`}</span>
          <div className="dayBox">
            <span className="weekDot">
              {map(weeks, (week, index) => {
                if (week !== eventStartWeek) {
                  return <FontAwesomeIcon key={index} icon={faCircle} />;
                } else {
                  return <span key={index}>{eventStartWeek}</span>;
                }
              })}
            </span>
            <span className="day">{eventStartDate[2]}</span>
          </div>
          <span className="time">
            {`${eventStartDate[3]}:${eventStartDate[4]}`}
            <span className="timeToMotion">
              <motion.span
                animate={{
                  opacity: [0, 0.5, 1, 0.5, 0],
                }}
                transition={{
                  duration: 1,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  loop: Infinity,
                }}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </motion.span>
            </span>
            {`${eventEndDate[3] !== '00' ? eventEndDate[3] : '24'}:${
              eventEndDate[4]
            }`}
          </span>
        </div>
      ) : (
        <>
          <div className="dateBox to">
            <span className="month">{`${eventStartDate[0]}.${eventStartDate[1]}`}</span>
            <div className="dayBox">
              <div className="dayBoxInner">
                <span className="weekDot">
                  {map(weeks, (week, index) => {
                    if (week !== eventStartWeek) {
                      return <FontAwesomeIcon key={index} icon={faCircle} />;
                    } else {
                      return <span key={index}>{eventStartWeek}</span>;
                    }
                  })}
                </span>
                <span className="day">{eventStartDate[2]}</span>
              </div>
            </div>
            <span className="time">{`${eventStartDate[3]}:${eventStartDate[4]}`}</span>
          </div>
          <div className="dateBox to">
            <span className="month">{`${eventEndDate[0]}.${eventEndDate[1]}`}</span>
            <div className="dayBox">
              <div className="dayBoxInner">
                <span className="weekDot">
                  {map(weeks, (week, index) => {
                    if (week !== eventEndWeek) {
                      return <FontAwesomeIcon key={index} icon={faCircle} />;
                    } else {
                      return <span key={index}>{eventEndWeek}</span>;
                    }
                  })}
                </span>
                <span className="day">{eventEndDate[2]}</span>
              </div>
            </div>
            <span className="time">{`${eventEndDate[3]}:${eventEndDate[4]}`}</span>
          </div>
          <span className="dateToMotion">
            <motion.span
              animate={{
                opacity: [0, 0.5, 1, 0.5, 0],
              }}
              transition={{
                duration: 1,
                times: [0, 0.25, 0.5, 0.75, 1],
                loop: Infinity,
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </motion.span>
          </span>
        </>
      )}
    </CardScheduleBoxWrap>
  );
});

export default CardScheduleBox;
