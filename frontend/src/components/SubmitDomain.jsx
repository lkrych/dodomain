import React, {Component} from 'react';

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
        <div className='field'>
            <label> Domain Name ex: "npr.org" </label>
            <br />
            <input autoFocus='autofocus' type='name'
              id='name' 
              onChange={this.onInput('name')}
              value={this.state.name} />
          </div>

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