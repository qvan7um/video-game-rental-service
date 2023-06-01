import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  // constructor(props) {
  //   super(props);
  //   this.state = { forecasts: [], loading: true };
  // }
  constructor(props) {
    super(props);
    this.state = { games: [], loading: true };
  }

  // componentDidMount() {
  //   this.populateWeatherData();
  // }
  componentDidMount() {
    this.populateGameData();
  }

  // static renderForecastsTable(forecasts) {
  //   return (
  //     <table className="table table-striped" aria-labelledby="tableLabel">
  //       <thead>
  //         <tr>
  //           <th>Date</th>
  //           <th>Temp. (C)</th>
  //           <th>Temp. (F)</th>
  //           <th>Summary</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {forecasts.map(forecast =>
  //           <tr key={forecast.date}>
  //             <td>{forecast.date}</td>
  //             <td>{forecast.temperatureC}</td>
  //             <td>{forecast.temperatureF}</td>
  //             <td>{forecast.summary}</td>
  //           </tr>
  //         )}
  //       </tbody>
  //     </table>
  //   );
  // }
  static renderGamesTable(games) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Platform</th>
            <th>Explore</th>
            <th>Release Date</th>
            <th>Developer</th>
            <th>Publisher</th>
            <th>ESRB Rating</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game =>
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.genre.join(', ')}</td>
              <td>{game.platform}</td>
              <td>{game.explore.join(', ')}</td>
              <td>{game.releaseDate}</td>
              <td>{game.developer}</td>
              <td>{game.publisher}</td>
              <td>{game.esrbRating}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  // render() {
  //   let contents = this.state.loading
  //     ? <p><em>Loading...</em></p>
  //     : FetchData.renderForecastsTable(this.state.forecasts);

  //   return (
  //     <div>
  //       <h1 id="tableLabel">Weather forecast</h1>
  //       <p>This component demonstrates fetching data from the server.</p>
  //       {contents}
  //     </div>
  //   );
  // }
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderGamesTable(this.state.games);

    return (
      <div>
        <h1 id="tableLabel">Games</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  // async populateWeatherData() {
  //   const response = await fetch('weatherforecast');
  //   const data = await response.json();
  //   this.setState({ forecasts: data, loading: false });
  // }

  // async populateGameData() {
  //   const response = await fetch('game')
  //   const data = await response.json();
  //   this.setState({ games: data, loading: false })
  // }
  async populateGameData() {
    try {
        const response = await fetch('/game');
        const data = await response.json();
        this.setState({ games: data, loading: false });
      } catch (error) {
          console.error('An error occurred while fetching data:', error);
      }
  }
}
