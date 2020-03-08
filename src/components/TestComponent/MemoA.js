import React, { Fragment } from 'react';

class Memo extends React.PureComponent {

  state = {
    filterText: ''
  }

  handleChange = event => {
    this.setState({
      filterText: event.target.value
    })
  }

  render() {
    console.log('PureComponent render---')
    console.log('this state---', this.state)
    console.log('this props---', this.props)
    const filteredList = this.props.list.filter(
      item => item.text.includes(this.state.filterText)
    )

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