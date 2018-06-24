import React, {Component} from 'react';

import TextInput from './reusable/TextInput';


class SubmitDomain extends Component {
  constructor(props){
    super(props);
    this.state = {
     
      name: '',
      description: ''
    
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInput (property) {
    return (e) => {
      this.setState({ [property]: e.target.value });
    };
  }

  onSubmit(e){
    e.preventDefault();
    console.log("submitting domain");
  }

  render(){
    
    return (
      <div>
        <form action="">
        < TextInput
            name="name"
            label="name"
            value={this.state.name}
            onChange={this.onInput}/>

         <textarea type='text'
            value={this.state.description}
            onChange={this.onInput} 
            name='description' 
            cols='80' rows='15' required/>


        < input
          type="submit"
          className="btn btn-primary"
          onClick={this.onSubmit}/>
        </form>
      </div>
    );
  }
}

export default SubmitDomain;