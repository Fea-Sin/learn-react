import React, { Fragment } from 'react';
import memoize from 'memoize-one';

class Memo extends React.PureComponent {

  state = {
    filterText: ''
  }

  // 在list 或者 filter 变化时，重新运行 filter
  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  )

  handleChange = event => {
    this.setState({
      filterText: event.target.value
    })
  }

  render() {
    console.log('PureComponent render---')
    console.log('this state---', this.state)
    console.log('this props---', this.props)
    const filteredList = this.filter(this.props.list, this.state.filterText)

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {filteredList.map(item => <li key={item.id}>{item.text}</li>)}
        </ul>
      </Fragment>
    )
  }
}

export default Memo;