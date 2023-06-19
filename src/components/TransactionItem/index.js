// Write your code here
// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionItem, onDeleteItem} = props

  const {title, amount, type, id} = transactionItem

  console.log()

  const deleteTheSelectedItem = () => {
    onDeleteItem(id, type, amount)
  }

  return (
    <li className="trans-bar">
      <p className="trans-text">{title}</p>
      <p className="trans-text">Rs {amount}</p>
      <p className="trans-text">{type}</p>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={deleteTheSelectedItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
