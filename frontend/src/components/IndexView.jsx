import React, {Component} from 'react';

class IndexView extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      search_query: "",
      desc: true,
      order_by: "id"
    };
  }

  componentDidMount(){
    this.props.fetchDomains(this.state);
  }

  render(){
    let domains = this.props.domains.domains.map((el, idx) => {
      return <li idx={idx}>{el}</li>;
    });
    return (
      <div>
        <h3>List of domains</h3>
        <ul>
          {domains}
        </ul>
      </div>
    );
  }
}

export default IndexView;