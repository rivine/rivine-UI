import React, { PropTypes } from 'react'

const ReceivePrompt = ({address, actions}) => {
	const handleDismissClick = () => actions.hideReceivePrompt()
	return (
		<div className="modal">
			<div className="receive-prompt">
				You can receive Coins using the following address:
				<div className="wallet-address">{address}</div>
				<button className="receiveprompt-dismissbtn" onClick={handleDismissClick}>OK</button>
			</div>
		</div>
	)
}
ReceivePrompt.propTypes = {
	address: PropTypes.string,
}
export default ReceivePrompt
