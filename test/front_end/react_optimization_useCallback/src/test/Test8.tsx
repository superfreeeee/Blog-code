import React, {
  ChangeEvent,
  ChangeEventHandler,
  Component,
  useCallback,
  useState,
} from 'react';
import { rec } from '../utils/record';

interface IInnerProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

class Inner extends Component<IInnerProps> {
  shouldComponentUpdate(nextProps: IInnerProps, nextState) {
    return this.props.onChange !== nextProps.onChange;
  }

  render() {
    console.log('render Test8 Inner');
    return <input type="text" onChange={this.props.onChange} />;
  }
}

const Test8 = () => {
  console.group('render Test8');

  const [name, setName] = useState('');
  const increment = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );

  rec('Test8', increment);

  console.groupEnd();
  return (
    <div>
      <h2>Test 8: 测试 shouldComponentUpdate</h2>
      <h3>name: {name}</h3>
      <Inner onChange={increment} />
    </div>
  );
};

export default Test8;
