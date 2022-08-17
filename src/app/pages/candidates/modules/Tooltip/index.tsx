import{FC, useState} from 'react'
import clsx from 'clsx';

import s from './s.module.scss';
interface ITooltip{
    delay?:any,
  children?:any,
  direction?:any,
  content?:string,
  theme?:'light' | 'dark',
}

const Tooltip:FC<ITooltip> = ({
  delay,
  children,
  direction,
  content = "Hello, I'm a tooltip",
  theme = 'light',
}) => {
  const themeClass = {
    light: s.light,
    dark: s.dark,
  }[theme];

  let timeout: any;

  const [isActive, setIsActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setIsActive(true);
    }, delay || 300);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setIsActive(false);
  };

  return (
    <span
      className={clsx(s.tooltip_wrapper, themeClass)}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {isActive && (
        <span className={clsx(s.tooltip_tip, s[`tooltip_tip_${direction || 'bottom'}`])}>
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;