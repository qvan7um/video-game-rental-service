import React, { Component } from 'react';

export class FetchContracts extends Component {
  static displayName = FetchContracts.name;

  constructor(props) {
    super(props);
    this.state = { contracts: [], loading: true };
  }

  componentDidMount() {
    this.populateContractData();
  }

  static renderContractsTable(contracts) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Game Id</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(contract => {
            const startDate = new Date(contract.startDate);
            const endDate = new Date(contract.endDate);
            const formattedStartDate = startDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedEndDate = endDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            return (
              <tr key={contract.id}>
                <td>{contract.gameId}</td>
                <td>{formattedStartDate}</td>
                <td>{formattedEndDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchContracts.renderContractsTable(this.state.games);

    return (
      <div>
        <h1 id="tableLabel">Contracts</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateContractData() {
    try {
        const response = await fetch('/contract');
        const data = await response.json();
        this.setState({ contracts: data, loading: false });
      } catch (error) {
          console.error('An error occurred while fetching data:', error);
      }
  }
}
