import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import dateFormat from 'dateformat';

class TransactionTable extends Component {

  constructor(props) {
    super(props);

    // const processedData = processData(input);

    this.state = {
      data: [],
    };

    console.log('Init:');
    console.log(this.props.records);

    this.getStatusTag = (status) => {
      switch (status) {
        case 'created':
          return (<Tag color="gold" key={status}>{status}</Tag>);
        case 'authorized':
          return (<Tag color="orange" key={status}>{status}</Tag>);
        case 'captured':
          return (<Tag color="cyan" key={status}>{status}</Tag>);
        default:
          return (<Tag key={status}>{status}</Tag>);
      }
    };
  }

  render() {
    console.log(this.props.records);

    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => { return a.date > b.date; },
        render: (date) => {
          const day = dateFormat(date, 'mm/dd/yy');
          const hours = dateFormat(date, 'h:MM TT');
          return <span><Tag key={day}>{day}</Tag><Tag key={hours}>{hours}</Tag></span>;
        },
      },
      {
        title: 'Payment Id',
        dataIndex: 'paymentId',
        sorter: (a, b) => a.paymenId > b.paymenId,
        render: (id) => {
          return <Tag color="blue" key={id}>{id.substring(4, id.length)}</Tag>;
        },
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.message.length - b.message.length,
        render: (amount) => {
          return <Tag color="green" key={amount}>₹{amount}</Tag>;
        },
      },
      {
        title: 'From',
        dataIndex: 'from',
        sorter: (a, b) => a.tags.length - b.tags.length,
        render: (from) => {
          if (from === '') {
            return <Tag key={from}>N/A</Tag>;
          }
          return <Tag key={from}>{from}</Tag>;
        },
      },
      {
        title: 'To',
        dataIndex: 'to',
        sorter: (a, b) => a.message.length - b.message.length,
        render: (to) => {
          if (to === '') {
            return <Tag key={to}>N/A</Tag>;
          }
          return <Tag key={to}>{to}</Tag>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.action.length - b.action.length,
        render: (status) => {
          return this.getStatusTag(status);
        },
      },
    ];

    return (
      <div>
        <center><span id="tableTitle">Transactions</span></center>
        <div id="mainTable">
          <Table columns={columns} dataSource={this.props.records} pagination={{ pageSize: 10 }} />
        </div>
      </div>
    );
  }
}

export default TransactionTable;

