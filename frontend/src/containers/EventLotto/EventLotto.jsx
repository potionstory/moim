import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import { findIndex } from 'lodash';
import { produce } from 'immer';
import ReactCanvasConfetti from 'react-canvas-confetti';
import AnimatedNumbers from 'react-animated-numbers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix } from '@fortawesome/free-solid-svg-icons';
import { EventLottoWarp, EventWinnerCardWrap } from './style';

const EventLottoBtn = memo(({ number }) => {
  return (
    <>
      {number === 0 ? (
        <FontAwesomeIcon icon={faDiceSix} />
      ) : (
        <span className="number">
          <AnimatedNumbers
            animateToNumber={number}
            fontStyle={{ fontSize: 128 }}
            configs={[
              { mass: 1, tension: 130, friction: 40 },
              { mass: 2, tension: 140, friction: 40 },
              { mass: 3, tension: 130, friction: 40 },
            ]}
          ></AnimatedNumbers>
        </span>
      )}
    </>
  );
});

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 200,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
    colors: ['#f4511e', '#f8b408', '#7cb342', '#1e88e5', '#ff4c82', '#d56dfb'],
  };
}

const EventLotto = ({ memberList }) => {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const [isLotto, setIsLotto] = useState(false);
  const [number, setNumber] = useState(0);
  const [winnerList, setWinnerList] = useState([]);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.4));
      setTimeout(
        () => refAnimationInstance.current(getAnimationSettings(0.6, 0.9)),
        200,
      );
    }
  }, []);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
      setTimeout(() => {
        pauseAnimation();
      }, 15000);
    }
  }, [intervalId, nextTickAnimation]);

  const onLotto = useCallback(() => {
    setIsLotto(true);

    let num = Math.floor(Math.random() * memberList.length + 1);

    while (findIndex(winnerList, (winner) => winner.number === num) !== -1) {
      num = Math.floor(Math.random() * memberList.length + 1);
    }

    setNumber(num);

    setTimeout(() => {
      setWinnerList(
        produce((draft) => {
          draft.push(
            memberList[
              findIndex(memberList, (member) => member.number === num)
            ],
          );
        }),
      );
      setIsLotto(false);
      startAnimation();
    }, 2000);
  }, [memberList, winnerList]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <EventLottoWarp>
      <div className="lottoBtn">
        <button type="button" onClick={() => isLotto || onLotto()}>
          <EventLottoBtn number={number} />
        </button>
      </div>
      <ul className="winnerList">
        {winnerList.map((member) => {
          const { id, team, number, job, name } = member;

          return (
            <li key={id}>
              <EventWinnerCardWrap team={team}>
                <span className="job">
                  <span>{job}</span>
                </span>
                <span className="number">
                  {number
                    .toString()
                    .split('')
                    .map((digit, index) => (
                      <span key={index} className="digit">
                        {digit}
                      </span>
                    ))}
                </span>
                <span className="name">{name}</span>
              </EventWinnerCardWrap>
            </li>
          );
        })}
      </ul>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </EventLottoWarp>
  );
};

export default EventLotto;
