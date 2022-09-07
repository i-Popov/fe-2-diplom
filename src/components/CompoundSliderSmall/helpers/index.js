import * as React from 'react';
// import { SliderItem, GetHandleProps, GetTrackProps } from 'react-compound-slider';

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
// interface IHandleProps {
//   domain: number[];
//   handle: SliderItem;
//   getHandleProps: GetHandleProps;
// }

export const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps
}) => (
  <div
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      left: `${percent}%`,
      position: 'absolute',
      marginLeft: '-9px',
      marginTop: '-1px',
      zIndex: 2,
      width: 13,
      height: 13,
      cursor: 'pointer',
      borderRadius: '50%',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#ffff'
    }}
    {...getHandleProps(id)}
  />
);

// *******************************************************
// TRACK COMPONENT
// *******************************************************
// interface ITrackProps {
//   source: SliderItem;
//   target: SliderItem;
//   getTrackProps: GetTrackProps;
// }

export const Track = ({
  source,
  target,
  getTrackProps
}) => (
  <div
    style={{
      position: 'absolute',
      height: 10,
      zIndex: 1,
      backgroundColor: '#FFA800',
      borderRadius: 7,
      cursor: 'pointer',
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`
    }}
    {...getTrackProps()}
  />
);

// *******************************************************
// TICK COMPONENT
// *******************************************************
// interface ITickProps {
//   key: string;
//   tick: SliderItem;
//   count: number;
// }

export const Tick = ({ tick, count }) => (
  <div>
    <div
      style={{
        position: 'absolute',
        marginTop: 10,
        width: 1,
        height: 0,
        backgroundColor: 'rgb(200,200,200)',
        left: `${tick.percent}%`
      }}
    />
    <div
      style={{
        position: 'absolute',
        marginTop: 18,
        fontSize: 12,
        textAlign: 'center',
        marginLeft: `${-(100 / count) / 2}%`,
        width: `${100 / count}%`,
				left: `${tick.percent}%`
      }}
    >
      {tick.value}
    </div>
  </div>
);
