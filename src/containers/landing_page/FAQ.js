import React from 'react';
import Collapsible from 'react-simple-collapsible-element';

const data = [
  {
    title: open => <h1>title 1 { open ? 'this is current opened!' : 'its close ATM'}</h1>,
    content: <span>content 1</span>,
    contentStyle: 'content-class',
  },
  {
    title: 'title 2',
    content: [
      {
        title: 'title 2 title 1',
        content: 'title 2 title 1 content',
        titleStyle: { backgroundColor: 'black' }, // can be a classname also.
        activeTitleStyle: 'activeTitleStyle',
        contentStyle: { backgroundColor: 'red' }, // can be a classname also.
        activeContentStyle: 'activeContentStyle',
      },
    ],
  },
];

return <Collapsible keepOpen={false} data={data} />;
