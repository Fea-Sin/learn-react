import React from 'react';

export default class ListOfWords extends React.Component {
  render() {
    return <div>{this.props.words.join(',')}</div>
  }
}