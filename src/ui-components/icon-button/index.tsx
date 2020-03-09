import React, { FunctionComponent, ReactNode, SVGAttributes, MouseEvent } from 'react';
import './style.scss';
export default (props: {
  onMouseDown?(e: MouseEvent): void;
  className?: string;
  disabled?: boolean;
  icon?: FunctionComponent<SVGAttributes<SVGElement>>;
  children?: ReactNode;
}) => {
  const { onMouseDown, className = '', disabled = false, children = null } = props;

  return (
    <div
      onMouseDown={e => {
        onMouseDown && onMouseDown(e);
      }}
      className={`finxos-icon-button ${className} ${disabled ? 'finxos-icon-button--disabled' : ''}`}
    >
      {props.icon ? <props.icon /> : null}
      {children}
    </div>
  );
};
