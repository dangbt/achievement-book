import React, { Component } from 'react';

export default class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsList: this.props.optionsList
    } 
  }

  handlingChange = (index, checked) => {
    let newOptionsList = [];
    this.state.optionsList.forEach((obj) => {
      var newObj = {};
      Object.keys(obj).forEach(key => newObj[key] = obj[key]);
      newOptionsList.push(newObj);
    });
    newOptionsList[index].checked = checked;
    this.setState({optionsList: newOptionsList}, function () {
      let checkedList = [];
      this.state.optionsList.forEach(option => {
        if (option.checked) {
          checkedList.push(option.value);
        }
      })
      this.props.onChange(checkedList);
    });
  }

  render() {
    const { label, required, optionsList, message, showMessage } = this.props;
    return (
      <div>
        <label> {label}: </label>
        { required && <span> * </span> }
        <form>
        {
          optionsList.map((option, index) => {
            return (
              <div key={index}>
                <label>
                  <input 
                    type = 'checkbox' 
                    value = {index} // This is the index of the value in the optionsList
                    onClick = {
                      e => this.handlingChange(e.target.value, e.target.checked)
                    }/>
                  {option.value}
                </label>
              </div>
            )
          })
        }
        </form>
        <div></div>
        { showMessage && message && <span> {message} </span> }
      </div>
    )
  }
}