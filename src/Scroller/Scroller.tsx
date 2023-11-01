import {
  cloneElement,
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  ComponentProps,
  isValidElement,
  createElement,
  useMemo,
} from 'react';
import { render, measure } from './styles.css';
import { useForkRef } from './useForkRef';

const classes = {
  render,
  measure,
};

export interface ScrollerProps extends ComponentProps<'div'> {
  speed?: number
  delay?: number
}

export const Scroller = forwardRef<HTMLElement, ScrollerProps>(({
  speed = 100,
  delay = 0,
  style,
  children,
  ...rest
}, forwardedRef) => {
  const elementRef = useRef<HTMLDivElement>();
  const forkRef = useForkRef(forwardedRef, elementRef);

  const [phase, setPhase] = useState<'render' | 'measure'>('render');
  const [hover, setHover] = useState(false);

  const renderWidth = useRef(0);
  const textIndent = useRef(0);

  useLayoutEffect(() => {
    if ('measure' === phase) {
      const fullWidth = elementRef.current!.offsetWidth;
      textIndent.current = fullWidth > renderWidth.current
        ? fullWidth - renderWidth.current + 1
        : 0;
      setPhase('render');
    }
  }, [phase]);

  const { forward, backward } = useMemo(() => ({
    forward: {
      textIndent: `-${textIndent.current}px`,
      transition: `text-indent ${textIndent.current / speed}s linear ${delay}ms`,
    },
    backward: {
      transition: `text-indent ${textIndent.current / speed * 0.2}s linear`,
    },
  }), [speed, delay, textIndent.current]);

  const onMouseEnter = () => {
    renderWidth.current = elementRef.current!.offsetWidth;
    setPhase('measure');
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const props = {
    ref: forkRef,
    onMouseEnter,
    onMouseLeave,
    className: classes[phase],
    style: { ...(hover ? forward : backward), ...style },
    ...rest,
  };

  return isValidElement(children)
    ? cloneElement(children, props)
    : createElement('div', props, children);
});

Scroller.displayName = 'Scroller';
