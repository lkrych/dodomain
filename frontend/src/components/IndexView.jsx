import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

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

  handleChangePage (event, page){
    //don't pass in unneccessary parameters
    let submitState = Object.assign({}, this.state, {page: page+1});
    delete submitState['itemsPerPage'];
    event.preventDefault();
    this.setState({ page: page + 1 }, () => {
      this.props.fetchDomains(submitState);
    });
  }

  componentDidMount(){
    //don't pass in unneccessary parameters
    let submitState = Object.assign({}, this.state);
    delete submitState['itemsPerPage'];
    this.props.fetchDomains(submitState);
  }

  render(){
    const { classes } = this.props;
    let domains = [];
    if (this.props.domains.domains) {
      domains = this.props.domains.domains;
    }
    let textErrors = <Typography color="error" variant="body2" id="errors" >{this.props.errors}</Typography>;

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
          <TableBody className="domain-list">
            {domains.map((n, idx) => {
              return (
                <TableRow key={idx}>
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
            count={this.props.domains.pagination.totalItems}
            rowsPerPage={this.state.itemsPerPage}
            page={this.state.page - 1} //uses zero-based index
            rowsPerPageOptions={[50]}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
              'id': 'back-button'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
              'id': 'forward-button'
            }}
            onChangePage={this.handleChangePage}
          />
      </Paper>
    );
  }
}

export default IndexView;