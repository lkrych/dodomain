import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import dodo from "../resources/images/dodo.jpg";



const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 16,
  }),
});

class HomePage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" gutterBottom>
            Dodomain
        </Typography>
          
        <Typography variant="body2" gutterBottom>
          Keep track of domains before they go the way of the dodo.
        </Typography>
        <img src={dodo} alt="painting of dodo" />
      </Paper>
    );
  }
}

export default withStyles(styles)(HomePage);