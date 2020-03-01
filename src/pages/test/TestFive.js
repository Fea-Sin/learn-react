import React from 'react';
import ListOfWordsPure from '@/components/TestComponent/ListWordsPure';
// import ListOfWords from '@/components/TestComponent/ListWords';
import produce from 'immer';

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
  }

  // handleClick = () => {
  //   // 这部分代码很糟
  //   let words = this.state.words;
  //   words.push('marklar');
  //   this.setState({words: words});
  // }

  // handleClick = () => {
  //   this.setState(state => ({
  //     words: state.words.concat(['marklar'])
  //   }))
  // }

  handleClick = () => {
    this.setState(
      produce(draft => {
        draft.words.push('marklar')
      })
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>添加</button>
        {/* <ListOfWords words={this.state.words} /> */}
        <ListOfWordsPure words={this.state.words} />
      </div>
    );
  }
}

export default WordAdder;