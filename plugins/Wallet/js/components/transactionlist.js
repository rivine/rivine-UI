import React, { PropTypes } from 'react'
import { List } from 'immutable'

const TransactionList = ({transactions, ntransactions, actions}) => {
	if (transactions.size === 0) {
		return (
			<div className="transaction-list">
				<h3> No recent transactions </h3>
			</div>
		)
	}
	const prettyTimestamp = (timestamp) => {
		const pad = (n) => String('0'+n).slice(-2)

		const yesterday = new Date()
		yesterday.setHours(yesterday.getHours() -24)
		if (timestamp > yesterday) {
			return 'Today at ' + pad(timestamp.getHours()) + ':' + pad(timestamp.getMinutes())
		}
		return timestamp.getFullYear() + '-' + pad((timestamp.getMonth()+1)) + '-' + pad(timestamp.getDate()) + ' ' + pad(timestamp.getHours()) + ':' + pad(timestamp.getMinutes())
	}
	const transactionComponents = transactions.take(ntransactions).map((txn, key) => {
		let valueData = ''
		if (txn.transactionsums.totalCoin.abs().gt(0)) {
			valueData += txn.transactionsums.totalCoin.round(4).toNumber().toLocaleString() + ' C '
		}
		if (txn.transactionsums.totalBlockstakes.abs().gt(0)) {
			valueData += txn.transactionsums.totalBlockstakes.round(4).toNumber().toLocaleString() + ' BS '
		}
		if (txn.transactionsums.totalMiner.abs().gt(0)) {
			valueData += txn.transactionsums.totalMiner.round(4).toNumber().toLocaleString() + ' C (miner) '
		}
		if (valueData === '') {
			valueData = '0 C'
		}
		return (
			<tr key={key}>
				<td>{txn.confirmed ? prettyTimestamp(txn.confirmationtimestamp) : 'Not Confirmed'}</td>
				<td>{valueData}</td>
				<td className="txid">{txn.transactionid}</td>
				<td>{txn.confirmed ? <i className="fa fa-check-square confirmed-icon"> Confirmed </i> : <i className="fa fa-clock-o unconfirmed-icon"> Unconfirmed </i>}</td>
			</tr>
		)
	})
	const onMoreClick = () => actions.showMoreTransactions()
	return (
		<div className="transaction-list">
			<h2> Recent Transactions </h2>
			<table className="pure-table transaction-table">
				<thead>
					<tr>
						<th>Date</th>
						<th>Net Value</th>
						<th>Transaction ID</th>
						<th>Confirmation Status</th>
					</tr>
				</thead>
				<tbody>
					{transactionComponents}
				</tbody>
			</table>
			{
				transactions.size > ntransactions ? (
					<div className="load-more">
						<button className="load-more-button" onClick={onMoreClick}>More Transactions</button>
					</div>
				) : null
			}
		</div>
	)
}

TransactionList.propTypes = {
	transactions: PropTypes.instanceOf(List).isRequired,
	ntransactions: PropTypes.number.isRequired,
}

export default TransactionList
