import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import { getStockPrices } from '../../actions';

class PortfolioContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      labels: [],
      prices: [],
    };

    this.createStockChart = this.createStockChart.bind(this);

    console.log('Init:');
    console.log(this.props.records);
  }

  componentDidMount() {
    getStockPrices(this.createStockChart);
  }

  createStockChart(stockObject) {
    for (const object in stockObject) {
      if (object !== undefined) {
        console.log(stockObject[object]['4. close']);
        this.setState({
          labels: [...this.state.labels, object],
          prices: [...this.state.prices, parseFloat(stockObject[object]['4. close'])],
        });
      }
    }
    console.log(this);
  }


  render() {
    console.log(this.props.records);
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'INDA - iShares MSCI India ETF',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: this.state.prices,
        },
      ],
    };

    let Tag = (<div />);
    if (this.state.prices.length > 0) {
      const rupeeValue = (parseInt(this.props.user.user.points, 10) / 100)
       * this.state.prices[this.state.prices.length - 1] * 72;
      Tag =
      (<center>
        <span id="tableTitle">Points: {parseInt(this.props.user.user.points, 10)} - </span>
        <span id="tableTitle">Rupee Value: ₹{rupeeValue} </span>
      </center>);
    } else {
      Tag =
        (<center>
          <span id="tableTitle">Points: {parseInt(this.props.user.user.points, 10)} </span>
        </center>);
    }

    return (
      <div>
        <center><span id="tableTitle">Portfolio</span></center>
        {Tag}
        <div id="mainTable" >
          <Line data={data} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
    user: state.user,
  }
);

export default withRouter(connect(mapStateToProps, { })(PortfolioContainer));
// export default PortfolioContainer;
