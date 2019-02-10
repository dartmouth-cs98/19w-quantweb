import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { fetchTransactions, createTransaction, createOrder } from '../../actions';
import TransactionTable from './TransactionTable';
import Nav from '../Nav';
import CollectionCreateForm from './TransactionModal';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };

    this.getTransactions = this.getTransactions.bind(this);
    this.handleTransaction = this.handleCreateTransaction.bind(this);
    this.handleNewTransaction = this.handleNewTransaction.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);

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
          if (!to || !from || !status) {
            status = 'created';
            to = '';
            from = '';
          }
          console.log('status');
          console.log(value);
          if (!amount) {
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


  showModal() {
    console.log('reached');
    this.setState({
      visible: true,
    });
    console.log(this.state.visible);
  }

  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleCreate() {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      createOrder(values.amount, this.handleNewTransaction);


      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });


      // e.preventDefault();
    });
  }

  saveFormRef(formRef) {
    this.formRef = formRef;
  }

  // Utility method to handle transaction creation
  handleCreateTransaction(transactionId) {
    createTransaction(transactionId, (err, response) => {
      if (err) {
        // TODO: Handle failure gracefully
        console.log(err);
      } else {
        // On success, create a new transaction and add to the state
        const newTransaction = {
          paymentId: response.data.paymentId,
          date: response.data.date,
          status: response.data.status,
        };
        this.setState({
          transactions: [...this.state.transactions, newTransaction],
        });
      }
    });
  }

  handleNewTransaction(e) {
    console.log('order entered');
    console.log(e);

 // Default options
    const options = {
      key: 'rzp_test_XYB3SORKydGnpK',
      amount: e.data.amount,
      name: 'Test Merchant',
      description: 'Test Payment',
      image: 'https://img.icons8.com/cotton/2x/get-cash.png',
      order_id: e.data.orderId,
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
  }


  render() {
    console.log('render called');

    return (
      <div>
        <Nav color="#3c67c3" />
        <div id="dashboardBody">
          <Button type="primary" id="newTransactionButton" onClick={this.handleNewTransaction}>
            + New Transaction
          </Button>
          <Button type="primary" id="newTransactionButton" onClick={this.showModal}>
            Custom Transaction
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
          <TransactionTable records={this.processData(this.state.transactions)} />
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
