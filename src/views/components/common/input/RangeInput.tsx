import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Range } from 'react-range';
import _debounce from 'lodash/debounce';

interface PropsType {
  name: string;
  step: number;
  value: number;
  min: number;
  max: number;
  trackHeight?: number;
  trackColor?: string;
  trackActiveColor?: string;
  thumbWidth?: number;
  thumbHeight?: number;
  thumbColor?: string;
  showLabel?: boolean;
  onChange: (value: number, name?: string) => void;
}

const RangeInput = React.memo(
  ({
    name,
    step,
    value,
    min,
    max,
    thumbWidth = 12,
    thumbHeight = 12,
    trackHeight = 6,
    thumbColor = '#999',
    trackColor = '#ccc',
    trackActiveColor = '#fff',
    showLabel = false,
    onChange,
  }: PropsType) => {
    const [data, setData] = useState(value);
    const activePerc = useMemo(
      () => ((value / (max - min)) * 100).toFixed(1),
      [value]
    );

    const handleChange = _debounce(function(values: number[]) {
      setData(values[0]);
      onChange(values[0], name);
    }, 10);

    useEffect(() => {
      setData(value);
    }, [value]);

    return (
      <RangeInputStyle height={thumbHeight}>
        <Range
          step={step}
          min={min}
          max={max}
          values={[data]}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: `${trackHeight}px`,
                width: '100%',
                borderRadius: '20px',
                background: `linear-gradient(to right, ${trackActiveColor} 0%, ${trackActiveColor} ${activePerc}%, ${trackColor} ${activePerc}%, ${trackColor} 100%)`,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              className="thumb"
              style={{
                ...props.style,
                borderRadius: '50%',
                height: `${thumbWidth}px`,
                width: `${thumbHeight}px`,
                backgroundColor: thumbColor,
              }}
            >
              <div
                className={`label ${isDragged ? 'draged' : ''}`}
                style={{
                  position: 'absolute',
                  top: '-28px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: '#548BF4',
                }}
              >
                {value}
              </div>
            </div>
          )}
        />
      </RangeInputStyle>
    );
  }
);

const RangeInputStyle = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;

  .thumb {
    .label {
      display: none;
      width: 150%;
      left: -27%;
      text-align: center;
      background-color: rgb(255, 171, 46) !important;
      &.draged {
        display: block;
      }
    }
    &:hover {
      .label {
        display: block;
        background-color: rgb(255, 171, 46) !important;
      }
    }
  }
`;

const ThumbStyle = styled.div<{
  style: any;
  width: number;
  height: number;
  color: string;
  isDragged: boolean;
}>`
  ${(props) => props.style}
  border-radius: 50%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.color};
`;

export default RangeInput;
