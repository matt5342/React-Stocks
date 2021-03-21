import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderPortfolio = () => {
    let myStocks = this.props.stocks.filter(({ id }) => this.props.myIds.includes(id))
    return myStocks.map(stock => <Stock stock={stock} />)

  }
  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.renderPortfolio()
            //render your portfolio stocks here
          }
      </div>
    );
  }

}

export default PortfolioContainer;
