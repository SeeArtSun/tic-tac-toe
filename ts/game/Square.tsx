import * as React from 'react';

interface IProps {
  value: string;
  onClick(): void;
}

function Square(props: IProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
