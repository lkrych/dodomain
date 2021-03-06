import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
    this.props.submitDomain({domain: this.state});
    this.setState({
      name: '',
      description: ''
    });
  }

  render(){
    const { classes } = this.props;
    let textErrors = <Typography color="error" variant="body2" id="errors" >{this.props.errors ? this.props.errors : this.state.errors}</Typography>;
    let textSuccess= <Typography color="primary" variant="body2" id="messages" >{this.props.message}</Typography>;

    let domainError = false;
    
    if (/Email/g.exec(this.state.errors) || /email/g.exec(this.props.errors)  ) {
      domainError = true;
    } 

    return (
      <Paper className={classes.root} elevation={4}>
      <Typography variant="headline" gutterBottom>
          Submit a Domain
        </Typography>
        <Typography variant="body2" gutterBottom>
          Domain Name ex: "npr.org"
        </Typography> 
        {textErrors}
        {textSuccess}
        <form action="">
          <div className='field'>
            <TextField
              error={domainError ? true : null}
              label='Domain Name' 
              type='name'
              id='name' 
              onChange={this.onInput('name')}
              value={this.state.name} />
          </div>

        <div className='field'>
          <TextField
            id="description"
            value={this.state.description}
            onChange={this.onInput('description')} 
            name='description' 
            label="Description of domain"
            placeholder="Description of domain"
            multiline
            className={classes.textField}
            margin="normal"
          />
         
        </div>


        <Button
          type="submit"
          variant="contained" color="primary"
          className="btn btn-primary btn-submit"
          onClick={this.onSubmit}>
          Submit Domain
        </Button>
        </form>
      </Paper>
    );
  }
}

export default SubmitDomain;