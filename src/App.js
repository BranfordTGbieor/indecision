import React, { Component } from 'react';
import AddOption from './Components/AddOption';
import Options from './Components/Options';
import Action from './Components/Action';
import Header from './Components/Header';
import OptionModal from './Components/OptionModal';
import './Styles/Style.scss'



class App extends Component {

  state = {
    options: [],
    selectedOption: undefined
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({selectedOption: undefined}));
  }

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !==option)
    }));
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  }
  
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({options: prevState.options.concat(option)}));
  }

  componentDidMount() {

    try {

      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
  
      if (options) {
        this.setState(() => ({options}));
      }

    } catch (e) {

    }
   
  }

  componentDidUpdate(preProps, prevState) {
    if (prevState.options.length !== this.state.options.length)
    {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }


  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <div className="">
        <Header subtitle={subtitle} />
        <div className="container">
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
        </div>  
        </div>
        <OptionModal handleClearSelectedOption={this.handleClearSelectedOption} selectedOption={this.state.selectedOption}></OptionModal>
      </div>
      </div>
    );
  }
}

App.defaultProps = {
  options: []
};



export default App;
