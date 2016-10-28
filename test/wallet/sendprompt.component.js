/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import SendPrompt from '../../plugins/Wallet/js/components/sendprompt.js'

const testActions = {
	setSendAddress: spy(),
	setSendAmount: spy(),
	sendCurrency: spy(),
	closeSendPrompt: spy(),
}

const sendpromptComponentC = shallow(<SendPrompt currencytype="coins" sendAddress="testaddr" sendAmount="1" actions={testActions} />)
const sendpromptComponentBS = shallow(<SendPrompt currencytype="blockstakes" sendAddress="testaddr" sendAmount="1" actions={testActions} />)

describe('wallet send prompt component', () => {
	it('renders a modal with one child', () => {
		expect(sendpromptComponentC.find('.modal')).to.have.length(1)
	})
	it('renders send amount with the correct currency', () => {
		expect(sendpromptComponentC.find('.sendamount h3').first().text()).to.contain('Send Amount (C)')
		expect(sendpromptComponentBS.find('.sendamount h3').first().text()).to.contain('Send Amount (BS)')
	})
	it('renders send amount input with sendAmount value', () => {
		expect(sendpromptComponentC.find('.sendamount input').first().props().value).to.equal('1')
	})
	it('renders a send-prompt-buttons div with two buttons', () => {
		expect(sendpromptComponentC.find('.send-prompt-buttons').first().children()).to.have.length(2)
	})
	it('calls closeSendPrompt on cancel click', () => {
		sendpromptComponentC.find('.cancel-send-button').first().simulate('click')
		expect(testActions.closeSendPrompt.called).to.be.true
	})
	it('calls sendCurrency with correct currency and value on send click', () => {
		sendpromptComponentC.find('.send-coin-button').first().simulate('click')
		expect(testActions.sendCurrency.calledWith('testaddr', '1', 'coins')).to.be.true
		testActions.sendCurrency.reset()
		sendpromptComponentBS.find('.send-coin-button').first().simulate('click')
		expect(testActions.sendCurrency.calledWith('testaddr', '1', 'blockstakes')).to.be.true
	})
	it('calls setSendAddress on sendaddress change', () => {
		sendpromptComponentC.find('.sendaddress input').first().simulate('change', {target: {value: 'newaddress'}})
		expect(testActions.setSendAddress.calledWith('newaddress')).to.be.true
	})
	it('calls setSendAmount on sendamount change', () => {
		sendpromptComponentC.find('.sendamount input').first().simulate('change', {target: {value: 'newamount'}})
		expect(testActions.setSendAmount.calledWith('newamount')).to.be.true
	})
})
/* eslint-enable no-unused-expressions */
