import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { TransactionsProvider } from './context/TransactionContext';
import App from './App/App';

ReactDOM.render(
    <TransactionsProvider addressFrom={undefined} addressTo={undefined} timestamp={{
        toNumber: function (): number {
            throw new Error('Function not implemented.');
        }
    }} message={undefined} gif={undefined} amount={{
        _hex: ''
    }}>
        <App />
    </TransactionsProvider>,
    document.getElementById('root'));