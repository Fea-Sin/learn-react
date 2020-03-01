import React from 'react';

export default class ListOfWords extends React.PureComponent {
  render() {
    console.log('ListOfWordsPure render ----')
    return <div>{this.props.words.join(',')}</div>
  }
}