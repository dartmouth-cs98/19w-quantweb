import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { fetchTransactions, createTransaction, createOrder, addBank } from '../../actions';
import TransactionTable from './TransactionTable';
import InnerNav from '../InnerNav';
import CollectionCreateForm from './TransactionModal';
import BankForm from './BankModal';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      visibleBank: false,
      confirmLoadingBank: false,
    };

    this.getTransactions = this.getTransactions.bind(this);
    this.handleTransaction = this.handleCreateTransaction.bind(this);
    this.handleNewTransaction = this.handleNewTransaction.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.showBankModal = this.showBankModal.bind(this);
    this.handleBankOk = this.handleBankOk.bind(this);
    this.handleBankCancel = this.handleBankCancel.bind(this);
    this.handleBankCreate = this.handleBankCreate.bind(this);
    this.saveBankFormRef = this.saveBankFormRef.bind(this);

      // Utility method to process transaction data for table
    this.processData = (inputData) => {
      // Validate that records were recieved
      if (inputData !== undefined) {
        // Iterate over each record and construct a clean object
        return inputData.map((value) => {
          let { amount, to, from } = value;
          const { paymentId, date, orderId, status } = value;

          // TODO: These fields should be set once we move to
          //       our own manual checkout form
          if (!to || !from || !status) {
            to = '';
            from = '';
          }

          if (!amount) {
            amount = 10;
          }

          return { paymentId, date, amount, to, from, status: { date, status }, orderId };
        });
      }
      return undefined;
    };
  }

  componentDidMount() {
    this.getTransactions();

    setTimeout(() => {
      if (!this.props.user.user.bankSet) {
        this.showBankModal();
      }
    }, 2000);
  }

  // Utility method to fetch all transactions for current user
  getTransactions() {
    fetchTransactions((transactions) => {
      this.setState({
        transactions,
      });
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ confirmLoading: false, visible: false });
    }, 3000);
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  // Function called when payment modal is submitted
  handleCreate() {
    this.setState({ confirmLoading: true });

    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      createOrder((parseInt(values.amount * 100, 10)), this.handleNewTransaction);

      form.resetFields();
    });
  }

  saveFormRef(formRef) {
    this.formRef = formRef;
  }

  showBankModal() {
    this.setState({
      visibleBank: true,
    });
  }

  handleBankOk() {
    this.setState({ confirmLoadingBank: false, visibleBank: false });
  }

  handleBankCancel() {
    this.setState({ visibleBank: false });
  }

  // Function called when payment modal is submitted
  handleBankCreate() {
    this.setState({ confirmLoadingBank: true });

    const form = this.formRefBank.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      addBank(values.IFCS, values.accountNumber);
      form.resetFields();
    });
    this.setState({ confirmLoadingBank: false, visibleBank: false });
  }

  saveBankFormRef(formRef) {
    this.formRefBank = formRef;
  }

  // Utility method to handle transaction creation
  handleCreateTransaction(transactionId, orderId) {
    createTransaction(transactionId, orderId, (err, response) => {
      if (err) {
        // TODO: Handle failure gracefully
        console.log(err);
      } else {
        // On success, create a new transaction and add to the state
        const newTransaction = {
          paymentId: response.data.paymentId,
          date: response.data.date,
          status: response.data.status,
          amount: response.data.amount,
          orderId: response.data.orderId,
        };
        this.setState({
          transactions: [...this.state.transactions, newTransaction],
        });
      }
    });
  }

  handleNewTransaction(e) {
    this.setState({ confirmLoading: false, visible: false });

 // Default options
    const options = {
      key: 'rzp_test_XYB3SORKydGnpK',
      amount: (e.data.amount * 100),
      name: 'Test Merchant',
      description: 'Test Payment',
      image: 'https://img.icons8.com/cotton/2x/get-cash.png',
      order_id: e.data.orderId,
      handler: (response) => {
        console.log('adding paymentID');
        console.log(response);
        this.handleCreateTransaction(response.razorpay_payment_id, response.razorpay_order_id);
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
        <InnerNav color="#3c67c3" />
        <div id="dashboardBody">
          <Button type="primary" id="newTransactionButton" onClick={this.showModal}>
            + New Transaction
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={this.state.confirmLoading}
          />
          <BankForm
            wrappedComponentRef={this.saveBankFormRef}
            visible={this.state.visibleBank}
            onCancel={this.handleBankCancel}
            onCreate={this.handleBankCreate}
            confirmLoading={this.state.confirmLoadingBank}
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
    user: state.user,
  }
);
// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { })(DashboardContainer));
