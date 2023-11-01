import React, {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  ComponentProps,
  ReactNode,
} from 'react';
import './styles.css';

const combineClasses = (...args: Array<string | undefined | boolean>): string => args.join(' ');

export interface ScrollerProps extends ComponentProps<'div'> {
  children: ReactNode
}

const scroll_margin = 24;
const in_pace = 10;
const out_pace = 2;

export const Scroller = forwardRef<HTMLDivElement, ScrollerProps>(({
  style,
  children,
  className,
  ...rest
}, forwardedRef) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>();
  const scrollOffset = useRef(0);

  // const ref = useForkRef(forwardedRef, parentRef);

  const [phase, setPhase] = useState<'render' | 'measure'>('render');
  const [hover, setHover] = useState(false);

  useLayoutEffect(
    () => {
      if (phase === 'measure') {
        const parentWidth = parentRef.current?.offsetWidth;
        const childWidth = childRef.current?.offsetWidth;
        scrollOffset.current = parentWidth < childWidth
          ? childWidth - parentWidth + scroll_margin
          : 0;
        setPhase('render');
      }
    },
    [phase],
  );

  const handleMouseEnter = () => {
    setPhase('measure');
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const scrollStyle = hover ? {
    textIndent: `-${scrollOffset.current}px`,
    transition: `all ${scrollOffset.current * in_pace}ms linear`,
  } : {
    transition: `all ${scrollOffset.current * out_pace}ms linear`,
  };

  return (
    <div
      ref={parentRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={combineClasses('parent', className)}
      style={{ ...scrollStyle, ...style }}
      {...rest}
    >
      <div ref={childRef} className={phase}>
        {children}
      </div>
    </div>
  );
});

Scroller.displayName = 'Scroller';
