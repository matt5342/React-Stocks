import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [], 
    filter: 'all', 
    sort: 'none', 
    myIds: []
  }
  componentDidMount(){
    this.fetchStocks()
  }
  fetchStocks = () => {
    fetch('http://localhost:3000/stocks')
    .then(r => r.json())
    .then(stockData => this.setState({stocks: stockData}))
  }

  renderStocks = () => {
    if (this.state.filter === 'all'){
      return <StockContainer updatePortfolio={this.updatePortfolio} stocks={this.state.stocks} />
    }
    else {
      let stocksList = this.state.stocks.filter(stock => stock.type === this.state.filter) 
      if (this.state.sort === 'none'){
        return <StockContainer updatePortfolio={this.updatePortfolio} stocks={stocksList} />
      }
      else if (this.state.sort === 'Alphabetically'){
        stocksList = stocksList.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          else {return 1;}
        })
        return <StockContainer updatePortfolio={this.updatePortfolio} stocks={stocksList} />
      }
      else if (this.state.sort === 'Price'){
        stocksList = stocksList.sort(function (a, b) {
          if (a.price < b.price) {
            return -1;
          }
          else {return 1;}
        })
        return <StockContainer updatePortfolio={this.updatePortfolio} stocks={stocksList} />
      }
    }
  }


  updateFilter = e => {
    let newType = e.target.value
    this.setState({
      filter: newType
    })
  }

  updateSort = e => {
    let newSort = e.target.value
    this.setState({
      sort: newSort
    })
  }
  updatePortfolio = id => {
    if (!this.state.myIds.includes(id)) {
      let newIds = this.state.myIds
      newIds.push(id)
      this.setState({
        myIds: newIds
      })
    }
  }

  render() {
    return (
      <div>
        <SearchBar updateFilter={this.updateFilter} updateSort={this.updateSort} />

          <div className="row">
            <div className="col-8">

              {
                this.renderStocks()
              /* <StockContainer stocks={this.state.stocks}/> */}

            </div>
            <div className="col-4">

              <PortfolioContainer myIds={this.state.myIds} stocks={this.state.stocks} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
