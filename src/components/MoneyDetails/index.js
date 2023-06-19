// Write your code here
// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {displayItems} = props

  const {
    imageUrl,
    displayText,
    altName,
    classList,
    testId,
    amount,
  } = displayItems

  return (
    <li className={`${classList} output-card`}>
      <img className="image" src={imageUrl} alt={altName} />
      <div>
        <p className="balance">{displayText}</p>
        <p className="amount" data-testid={testId}>
          Rs.{amount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
