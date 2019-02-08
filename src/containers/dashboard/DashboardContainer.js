import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { fetchTransactions, createTransaction } from '../../actions';
import PaymentContainer from '../payment/PaymentContainer';
import TransactionTable from './TransactionTable';
import Nav from '../Nav';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getTransactions = this.getTransactions.bind(this);
    this.handleTransaction = this.handleCreateTransaction.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  // Utility method to fetch all transactions for current user
  getTransactions() {
    fetchTransactions((transactions) => {
      this.setState({
        transactions,
      });

      // Debug line
      console.log(transactions);
    });
  }

  // Utility method to handle transaction creation
  handleCreateTransaction(transactionId) {
    createTransaction(transactionId, (err, response) => {
      if (err) {
        // TODO: Handle failure gracefully
        console.log(err);
      } else {
        // On success, create a new transaction and add to the state
        const newTransaction = { paymentId: response.data.paymentId, date: response.data.date };
        this.setState({
          transactions: [...this.state.transactions, newTransaction],
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Nav color="#3c67c3" />
        <div id="dashboardBody">
          {/* <PaymentContainer handleTransaction={this.handleCreateTransaction} /> */}
          <Button type="primary" id="newTransactionButton">
            + New Transaction
          </Button>
          <TransactionTable />
        </div>
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
  }
);
// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { })(DashboardContainer));
