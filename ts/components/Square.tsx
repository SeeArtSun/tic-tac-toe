import * as React from 'react';

function Square(props: { value: string, onClick(): void }) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
