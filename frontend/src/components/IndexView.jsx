import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class IndexView extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      search_query: "",
      desc: true,
      order_by: "id",
      itemsPerPage: 50,

    };
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(){

  }

  componentDidMount(){
    this.props.fetchDomains(this.state);
  }

  render(){
    const { classes } = this.props;
    let domains = [];
    if (this.props.domains.domains) {
      domains = this.props.domains.domains;
    }
    let textErrors = <div className="errors">{this.props.errors}</div>;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline" gutterBottom>
          List of Valid Domains
        </Typography>
        {textErrors}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell >Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {domains.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell>{n.description}</TableCell>
                  <TableCell>{new Date(n.created_at).toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
            component="div"
            count={domains.length}
            rowsPerPage={this.state.itemsPerPage}
            page={this.state.page - 1} //uses zero-based index
            rowsPerPageOptions={[50]}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />
      </Paper>
    );
  }
}

export default withStyles(styles)(IndexView);