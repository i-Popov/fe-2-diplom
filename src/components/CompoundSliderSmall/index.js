import * as React from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { Handle, Track, Tick } from './helpers';

const sliderStyle = {
  margin: '0%',
  position: 'relative',
  width: '100%',
};

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: '#3E3C41',
  border: '1px solid white',
};

const domain = [0, 24];

class CompoundSliderSmall extends React.Component {
  state = {
    values: [0, 24],
  };

  onChange = (values) => {
    this.setState({ values });
    this.props.setHoursFilter(values);
  };

  render() {
    const {
      state: { values },
    } = this;

    return (
      <div style={{ height: 10, width: '100%', marginTop: 10 }}>
        <Slider mode={1} step={1} domain={domain} rootStyle={sliderStyle} onChange={this.onChange} values={values}>
          <Rail>{({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}</Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle key={handle.id} handle={handle} domain={domain} getHandleProps={getHandleProps} />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={8}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick) => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default CompoundSliderSmall;
