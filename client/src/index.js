import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { TransactionsProvider } from './context/TransactionContext';
import App from './App';

ReactDOM.render(<TransactionsProvider><App /></TransactionsProvider>, document.getElementById('root'));
