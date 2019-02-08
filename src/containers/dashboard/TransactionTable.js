import React, { Component } from 'react';
import { Table, Tag } from 'antd';

class TransactionTable extends Component {

  constructor(props) {
    super(props);

    // const processedData = processData(input);

    this.state = {
      ipLocations: {},
      data: [],
    };

    this.processData = this.processData.bind(this);
  }

  componentWillMount() {
    // TODO: Grab transactions
    // TODO: We need to paginate here, use firestore.
    // firebasedb.handleLogRecord((key, value) => {
    //   const records = value.val();
    //   const result = Object.keys(records).map((k) => {
    //     return records[k];
    //   });
    //   const data = this.processData(result);
    //   this.setState({
    //     data,
    //   });
    // });
  }

  // Clean transactions for table
  processData(inputData) {
    const processedData = [];
    debugger;
    for (const record of inputData) {
      // Create new object model
      const newData = {
        level: record.level,
        source: record.id,
        action: record.action,
        message: record.message,
        file: record.file,
        tags: 'test',
        timestamp: record.timestamp,
        source_copy: record.id,
      };

      // Get location name for IP
      // this.setIPLocation(newData.source_copy);

      // Add new record
      processedData.push(newData);
      // }
    }
    return processedData;
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

