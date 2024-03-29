import React from 'react';
import Option from './Option'; 

const Options = (props) => (
      <div>
        <div className="widget-header">
          <h3 className="widget-header__title">Your Option</h3>
          <button className="button button--link" onClick={props.handleDeleteOptions}>
            Remove All</button>
        </div>
        {props.options.length === 0 && <p className="message">Please add an option to get started!</p>}
        {
          props.options.map((option, index) => (
            <Option handleDeleteOption={props.handleDeleteOption} 
            key={option} optionText={option}
            index={index + 1}
             />
          ))
        }
      </div>
    );

export default Options;