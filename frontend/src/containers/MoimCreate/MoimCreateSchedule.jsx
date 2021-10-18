import React, { memo, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash';
import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import DateFnsUtils from '@date-io/dayjs';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faCalendarDay,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { weeks } from '../../lib/const';
import { light, dark, color } from '../../lib/styles/palette';
import { MoimCreateScheduleWrap } from './style';

const { blackGray, gray, whiteGray } = color;
const arrowMotion = [
  [
    blackGray,
    gray,
    whiteGray,
    whiteGray,
    whiteGray,
    gray,
    blackGray,
    blackGray,
    blackGray,
  ],
  [
    blackGray,
    blackGray,
    gray,
    whiteGray,
    whiteGray,
    whiteGray,
    gray,
    blackGray,
    blackGray,
  ],
  [
    blackGray,
    blackGray,
    blackGray,
    gray,
    whiteGray,
    whiteGray,
    whiteGray,
    gray,
    blackGray,
  ],
];

const MoimCreateSchedule = memo(({
  isEdit,
  startDate,
  endDate,
  onScheduleChange,
}) => {
  const { theme } = useSelector(({ global }) => global);

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const eventStartDate = useMemo(
    () => dayjs.unix(startDate._seconds).format('YYYY/MM/DD/HH/mm').split('/'),
    [startDate],
  );
  const eventStartWeek = useMemo(
    () => dayjs.unix(startDate._seconds).format('ddd'),
    [startDate],
  );
  const eventEndDate = useMemo(
    () => dayjs.unix(endDate._seconds).format('YYYY/MM/DD/HH/mm').split('/'),
    [endDate],
  );
  const eventEndWeek = useMemo(
    () => dayjs.unix(endDate._seconds).format('ddd'),
    [endDate],
  );

  const onStartDateChange = useCallback((date) => {
    onScheduleChange('startDate', date);
  }, []);

  const onEndDateChange = useCallback((date) => {
    onScheduleChange('endDate', date);
  }, []);

  const pickerTheme = useMemo(() => {
    const pickerColor = theme ? light.theme : dark.theme;

    return createMuiTheme({
      palette: {
        primary: {
          50: pickerColor,
          100: pickerColor,
          200: pickerColor,
          300: pickerColor,
          400: pickerColor,
          500: pickerColor,
          600: pickerColor,
          700: pickerColor,
          800: pickerColor,
          900: pickerColor,
          A100: pickerColor,
          A200: pickerColor,
          A400: pickerColor,
          A700: pickerColor,
        },
      },
    });
  }, [theme]);

  return (
    <MoimCreateScheduleWrap>
      <div className="dateTimePicker">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
          <ThemeProvider theme={pickerTheme}>
            <DateTimePicker
              variant="dialog"
              open={isStartOpen}
              onOpen={() => setIsStartOpen(true)}
              onClose={() => setIsStartOpen(false)}
              ampm={false}
              disablePast={true}
              value={dayjs.unix(startDate._seconds).toDate()}
              onChange={onStartDateChange}
            />
            <DateTimePicker
              variant="dialog"
              open={isEndOpen}
              onOpen={() => setIsEndOpen(true)}
              onClose={() => setIsEndOpen(false)}
              ampm={false}
              disablePast={true}
              value={dayjs.unix(endDate._seconds).toDate()}
              onChange={onEndDateChange}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </div>
      <div className="dateInner">
        <span className="month">{`${eventStartDate[0]}.${eventStartDate[1]}`}</span>
        <div className="dateBox">
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
          {isEdit && (
            <span className="btnCalendar">
              <button
                type="button"
                onClick={() => {
                  setIsStartOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faCalendarDay} />
              </button>
            </span>
          )}
        </div>
        <span className="time">{`${eventStartDate[3]}:${eventStartDate[4]}`}</span>
      </div>
      <div className="dateInner">
        <span className="month">{`${eventEndDate[0]}.${eventEndDate[1]}`}</span>
        <div className="dateBox">
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
          {isEdit && (
            <span className="btnCalendar">
              <button
                type="button"
                onClick={() => {
                  setIsEndOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faCalendarDay} />
              </button>
            </span>
          )}
        </div>
        <span className="time">{`${eventEndDate[3]}:${eventEndDate[4]}`}</span>
      </div>
      <span className="progress">
        {map(arrowMotion, (color, index) => {
          return (
            <motion.span
              key={index}
              animate={{
                color,
              }}
              transition={{
                duration: 1,
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                loop: Infinity,
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </motion.span>
          );
        })}
      </span>
    </MoimCreateScheduleWrap>
  );
});

export default MoimCreateSchedule;
