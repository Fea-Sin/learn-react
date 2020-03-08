import React from 'react';
import MemoA from '@/components/TestComponent/MemoA';
import MemoB from '@/components/TestComponent/MemoB';
import MemoC from '@/components/TestComponent/MemoC';

const list = [{
  id: 1,
  text: 'learn typescript',
}, {
  id: 2,
  text: 'memoization'
}, {
  id: 3,
  text: 'twitter it'
}]

export default class Example extends React.Component {
  
  render() {
    return (
      <div>
        <div>Test Ten</div>
        {/* <MemoA list={list} /> */}
        {/* <MemoB list={list} /> */}
        <MemoC list={list} />
      </div>
    )
  }
}