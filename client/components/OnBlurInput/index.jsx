import React, { Component } from 'react'

export default class OnBlurInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default || '',

      edit: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      value: nextProps.default || ''
    })
  }

  handlingBlur = (value) => {
    this.props.onBlur(value, this.props.id);
    this.setState({
      edit: false,
      value: value
    })
  }

  handlingDoubleClick = () => {
    this.setState({edit: true})
  }

  render() {
    let { id, type, label, required, suggestion, onBlur, message, showMessage } = this.props;
    let { value, edit } = this.state;
    return (
      <div>
        { label && <label> {label}: </label> }
        { required && <span>*</span> }
        { suggestion && 
          <div>
            <div></div>
            <p> {suggestion} </p>
          </div>
        }
        {
          (edit || value == '') ? 
            <input
              type = {type || 'text'}
              defaultValue = {value}
              onBlur = {e => {
                this.handlingBlur(e.target.value)
              }
              }
            />
          : <span onDoubleClick = {this.handlingDoubleClick}> {value} </span>
        }
        <div></div>
        { showMessage && message && <span>{message}</span> }
      </div>
    )
  }
}
