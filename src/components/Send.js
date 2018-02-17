import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

class Send extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accounts.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      var account = accounts[0];

      const bounty = "1000000000000000000";
      const deliverByEpoch = 1519711436;
      const insurance = 10000;
      const receiver = "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c"
      const metadata = "abc"

      debugger
      var transaction = this.props.contract.createPackage(
        bounty,
        deliverByEpoch,
        insurance,
        receiver,
        metadata,
        {
          from: account,
          value: bounty
        }
      ).then((data) => { alert('package made') });
    })
  }

  render() {
    const loading = (
      <h1>loading</h1>
    )

    let body = null;
    if(this.props.contract) {
      body = (
        <RaisedButton label="Make Package" fullWidth={true} onClick={this.handleSubmit} />
      )
    } else {
      body = (
        <h1>loading</h1>

      )
    }

    return (
      <div>
        { body }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3.web3Instance,
    contract: state.contract.instance
  }
}

export default connect(mapStateToProps)(Send);
