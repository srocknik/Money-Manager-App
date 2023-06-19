import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

const initialMoneyDetailsList = [
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    displayText: 'Your Balance',
    altName: 'balance',
    classList: 'border-color1',
    testId: 'balanceAmount',
    id: v4(),
    amount: 0,
  },
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    displayText: 'Your Income',
    altName: 'income',
    classList: 'border-color2',
    testId: 'incomeAmount',
    id: v4(),
    amount: 0,
  },
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    displayText: 'Your Expenses',
    altName: 'expenses',
    classList: 'border-color3',
    testId: 'expensesAmount',
    id: v4(),
    amount: 0,
  },
]

class MoneyManager extends Component {
  state = {
    moneyDetailsList: initialMoneyDetailsList,
    historyList: [],
    userIncome: 0,
    userBalance: 0,
    userExpenses: 0,
    userTitle: '',
    userAmount: '',
    userOption: 'Income',
  }

  submitDetails = () => {
    const {userTitle, userAmount, userOption} = this.state

    const newList = {
      type: userOption,
      title: userTitle,
      amount: userAmount,
      id: v4(),
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newList],
      userTitle: '',
      userAmount: '',
    }))

    if (userOption === 'INCOME') {
      this.setState(prevState => ({
        userIncome: parseInt(prevState.userIncome) + parseInt(userAmount),
      }))
      this.setState(prevState => ({
        userBalance: prevState.userBalance + parseInt(userAmount),
      }))
    } else if (userOption === 'EXPENSES') {
      this.setState(prevState => ({
        userExpenses: parseInt(prevState.userExpenses) + parseInt(userAmount),
      }))
      this.setState(prevState => ({
        userBalance: parseInt(prevState.userBalance) - parseInt(userAmount),
      }))
    }

    this.setState(prevState => ({
      moneyDetailsList: prevState.moneyDetailsList.map(each => {
        if (each.testId === 'balanceAmount') {
          return {
            ...each,
            amount: prevState.userBalance,
          }
        }
        if (each.testId === 'expensesAmount') {
          return {
            ...each,
            amount: prevState.userExpenses,
          }
        }
        if (each.testId === 'incomeAmount') {
          return {
            ...each,
            amount: prevState.userIncome,
          }
        }
        return each
      }),
    }))
  }

  onSubmitTitle = event => {
    this.setState({userTitle: event.target.value})
  }

  onSubmitAmount = event => {
    this.setState({userAmount: event.target.value})
  }

  onSelectOption = event => {
    this.setState({userOption: event.target.value})
  }

  onDeleteItem = (id, type, amount) => {
    console.log(type)
    if (type === 'INCOME') {
      this.setState(prevState => ({
        userIncome: parseInt(prevState.userIncome) - parseInt(amount),
        userBalance: parseInt(prevState.userBalance) - parseInt(amount),
      }))
    } else if (type === 'EXPENSES') {
      this.setState(prevState => ({
        userIncome: parseInt(prevState.userIncome) + parseInt(amount),
        userBalance: parseInt(prevState.userBalance) + parseInt(amount),
        userExpense: parseInt(prevState.userExpense) - parseInt(amount),
      }))
    }

    this.setState(prevState => ({
      historyList: prevState.historyList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {historyList, moneyDetailsList, userOption} = this.state

    return (
      <div className="bg-container">
        <div className="welcome-section">
          <h1 className="main-heading">Hi, Rechard</h1>
          <p id="name" className="greetings">
            Welcome back to your{' '}
            <label htmlFor="name" className="highlight-text">
              Money Manager
            </label>
          </p>
        </div>
        <ul className="output-container">
          {moneyDetailsList.map(each => (
            <MoneyDetails displayItems={each} key={each.id} />
          ))}
        </ul>
        <div className="trans-hist-container">
          <div className="card-container">
            <h1 className="card-heading">Add Transaction</h1>
            <label className="title-label" htmlFor="title">
              TITLE
            </label>
            <input
              className="title-input"
              type="text"
              id="title"
              placeholder="TITLE"
              onChange={this.onSubmitTitle}
            />
            <label className="title-label" htmlFor="amount">
              AMOUNT
            </label>
            <input
              className="title-input"
              type="text"
              id="amount"
              placeholder="AMOUNT"
              onChange={this.onSubmitAmount}
            />
            <label className="title-label" htmlFor="type">
              TYPE
            </label>
            <select
              defaultValue={userOption}
              className="title-input"
              type="select"
              id="type"
              placeholder="AMOUNT"
              onChange={this.onSelectOption}
            >
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="add-btn"
              onClick={this.submitDetails}
            >
              Add
            </button>
          </div>
          <div className="card-container">
            <h1 className="card-heading">History</h1>
            <ul className="list-container">
              <div className="status-bar">
                <p className="status-text">Title</p>
                <p className="status-text">Amount</p>
                <p className="status-text">Type</p>
              </div>
              {historyList.map(each => (
                <TransactionItem
                  transactionItem={each}
                  key={each.id}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
