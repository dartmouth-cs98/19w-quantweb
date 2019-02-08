import React, { Component } from 'react';
import { Table } from 'antd';

class TransactionTable extends Component {

  constructor(props) {
    super(props);

    // const processedData = processData(input);

    this.state = {
      data: [],
    };

    this.processData = this.processData.bind(this);
  }

  componentWillMount() {
    // TODO: Grab transactions
  }

  // Clean transactions for table
  processData(inputData) {
    // TODO: We can clean the data here
  }

  render() {
    const columns = [
      {
        title: 'Payment Id',
        dataIndex: 'paymentId',
        sorter: (a, b) => a.level.length - b.level.length,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.source.length - b.source.length,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.action.length - b.action.length,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.message.length - b.message.length,
      },
      {
        title: 'From',
        dataIndex: 'from',
        sorter: (a, b) => a.tags.length - b.tags.length,
      },
      {
        title: 'To',
        dataIndex: 'to',
        sorter: (a, b) => a.message.length - b.message.length,
      },
    ];

    return (
      <div>
        <center><span id="title">Transactions</span></center>
        <div id="mainTable">
          <Table columns={columns} dataSource={this.state.data} />
        </div>
      </div>
    );
  }
}

export default TransactionTable;

