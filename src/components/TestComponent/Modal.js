import React from 'react';
import ReactDOM from 'react-dom';


class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    const modalRoot = document.getElementById('modal-root');
    modalRoot && modalRoot.appendChild(this.el)
  }


  componentWillUnmount() {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      modalRoot.removeChild(this.el)
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    )
  }
}

export default Modal;