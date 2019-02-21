import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Button } from 'antd';
import SettingsBody from './SettingsBody';
import { fetchTransactions, createTransaction } from '../../actions';
import InnerNav from '../InnerNav';


class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getTransactions = this.getTransactions.bind(this);
    this.handleTransaction = this.handleCreateTransaction.bind(this);
    this.handleNewTransaction = this.handleNewTransaction.bind(this);

      // Utility method to process transaction data for table
    this.processData = (inputData) => {
      // Validate that records were recieved
      if (inputData !== undefined) {
        // Iterate over each record and construct a clean object
        return inputData.map((value) => {
          let { amount, to, from, status } = value;
          const { paymentId, date } = value;

          // TODO: These fields should be set once we move to
          //       our own manual checkout form
          if (!to || !from || !status || !amount) {
            status = 'created';
            to = '';
            from = '';
            amount = 10;
          }

          return { paymentId, date, amount, to, from, status };
        });
      }
      return undefined;
    };
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
      // console.log(transactions);
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

  handleNewTransaction(e) {
 // Default options
    const options = {
      key: 'rzp_test_34XZtQhCECAwjv',
      amount: 1000,
      name: 'Test Merchant',
      description: 'Test Payment',
      image: 'https://img.icons8.com/cotton/2x/get-cash.png',
      handler: (response) => {
        this.handleCreateTransaction(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Test Testerton',
        email: 'test@test.com',
        contact: '5-555-555-5555',
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#F37254',
      },
    };

      // Open razorpay client form
    const rzp = new window.Razorpay(options);
    rzp.open();

    e.preventDefault();
  }

  render() {
    return (
      <div>
        <InnerNav color="#3c67c3" />
        <SettingsBody />
      </div>
      //   <form action="/action_page.php" method="get">
      //     First name: <input type="text" name="fname" /><br />
      //     Last name: <input type="text" name="lname" /><br />
      //     Email: <input type="text" name="email" /><br />
      //     Phone Number: <input type="text" name="phone" /><br />
      //     <input type="submit" value="Update" />
      //   </form>
      //   Settings
      // </div>
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
export default withRouter(connect(mapStateToProps, { })(SettingsContainer));
