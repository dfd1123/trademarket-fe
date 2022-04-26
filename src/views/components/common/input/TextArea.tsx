import { formatNumber } from '@/utils/numberUtils';
import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

interface PropsType extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  error?: string;
  limit?: number;
  value?: string;
  width?: string;
  height?: string;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  onEnter?: (value: any, name?: any) => void;
  onInput?: (event: any) => void;
  onChange?: (event: any) => void;
  change?: (value: any, name?: any) => void;
  input?: (value: any, name?: any) => void;
}

const TextAreaComp = forwardRef<HTMLTextAreaElement, PropsType>(
  (
    {
      label,
      className,
      limit = 0,
      name = '',
      value = '',
      placeholder = '',
      error,
      readOnly = false,
      disabled = false,
      width,
      height,
      onBlur,
      onFocus,
      onEnter,
      onInput,
      onChange,
      change,
      input,
      onClick,
    },
    ref: React.ForwardedRef<HTMLTextAreaElement | null>
  ) => {
    const inp = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState<string>(value ?? '');
    const [focus, setFocus] = useState(false);
    const limitStatus = useMemo(
      () => `${formatNumber(text.length)}/${formatNumber(limit)}`,
      [text]
    );

    const handleEnter = () => {
      if (!onEnter) return;

      const inputRef =
        ref !== undefined
          ? (ref as MutableRefObject<HTMLTextAreaElement | null>)
          : inp;

      if (inputRef.current) {
        const { value, name } = inputRef.current;
        if (onEnter) {
          onEnter(value, name);
          return;
        }
      }
      onEnter('');
    };

    const toggleFocus = (status: boolean) => {
      setFocus(status);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEnter();
      }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let { value, name } = e.target;

      if (limit) {
        value = value.substring(0, limit);
        e.target.value = value
      }

      setText(value);

      change && change(value, name);
      input && input(value, name);
      onChange && onChange(e);
      onInput && onInput(e);
    };

    const handleReset = () => {
      const inputRef =
        ref !== undefined
          ? (ref as MutableRefObject<HTMLTextAreaElement | null>)
          : inp;
      if (inputRef.current) {
        inputRef.current.value = '';
        const { value, name } = inputRef.current;
        change && change('', name);
        setText('');
      }
    };

    useEffect(() => {
      if(value !== text) setText(value);
    }, [value])

    return (
      <div className={className}>
        <div className={`inp-box`}>
          {Boolean(label) && (
            <label htmlFor={name} className="label">
              {label}
            </label>
          )}
          <div
            className={`textarea-box ${focus ? 'focus' : ''} ${
              String(text) ? 'value' : ''
            } ${disabled ? 'disabled' : ''} ${Boolean(error) ? 'error' : ''}`}
          >
            <textarea
              ref={ref !== undefined ? ref : inp}
              id={name}
              name={name}
              value={text}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
              onKeyPress={handleKeyPress}
              onChange={handleValueChange}
              onInput={handleValueChange}
              onFocus={(e) => {
                onFocus && onFocus(e);
                toggleFocus(true);
              }}
              onBlur={(e) => {
                onBlur && onBlur(e);
                toggleFocus(false);
              }}
              onClick={onClick}
            ></textarea>
            {Boolean(limit) && (
              <span className="limit-status">{limitStatus}</span>
            )}
          </div>
          {Boolean(error) && (<span className="error-msg">{error}</span>)}
        </div>
      </div>
    );
  }
);

const TextArea = styled(TextAreaComp)`
  .inp-box {
    height:inherit;
    .label {
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
      line-height: 16px;
      color: #777;
    }
    .textarea-box {
      position: relative;
      height:inherit;
      ${props => `width:${props.width ?? ''};`}
      ${props => `height:${props.height ?? ''};`};
      padding: 14px 16px 30px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #ffffff;
      transition: border 0.15s, background-color 0.15s;

      &.focus,
      &.verify {
        border: 1px solid #000000;
        background-color: #fff;

        &.verify {
          border: 1px solid #000000;
          background-color: #fff;
        }

        &.value {
          border: 1px solid #000000;
          background-color: #fff;
        }
      }

      &.value {
        border: 1px solid #ddd;
        background-color: #fff;

        &.verify {
          border: 1px solid #ddd;
          background-color: #fff;
        }
      }

      &.error {
        border: 1px solid #dd250d !important;
      }

      .limit-status {
        position: absolute;
        bottom: 11px;
        right: 16px;
        color:#ccc;
      }
    }
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      outline: transparent;
      border: none;
      font-size: 16px;
      line-height: 20px;
      color: #222;

      &::placeholder {
        color: #ccc;
      }
    }

    .error-msg {
      display: block;
      margin-top: 8px;
      padding: 0 2px;
      font-size: 12px;
      line-height: 16px;
      color: #dd250d;
    }
  }
`;

export default TextArea;
