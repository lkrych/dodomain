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
    let domains = [];
    if (this.props.domains.domains) {
      domains = this.props.domains.domains.map((el, idx) => {
        return <li key={idx}>{el.name}</li>;
      });
    }
    let textErrors = <div className="errors">{this.props.errors}</div>;

    return (
      <div>
        {textErrors}
        <h3>List of domains</h3>
        <ul className="domain-list">
          {domains}
        </ul>
      </div>
    );
  }
}

export default IndexView;