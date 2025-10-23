import { useState } from 'react'
import './POS.css'

function POS() {
  const [cardNumber, setCardNumber] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleTapCard = async () => {
    if (!cardNumber || !merchantId || !amount) {
      setStatus('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setStatus('Processing...')

    try {
      const response = await fetch('http://localhost:3000/pos/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber,
          merchantId,
          amount: parseFloat(amount),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setStatus(`Success! Response: ${JSON.stringify(data)}`)
      } else {
        setStatus(`Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccrueFiveDays = async () => {
    setIsDropdownOpen(false)
    setStatus('Accruing 5 days...')

    try {
      const now = Math.floor(Date.now() / 1000) // Current time in seconds
      const fiveDaysAgo = now - (5 * 24 * 60 * 60) // 5 days ago in seconds

      const response = await fetch('http://localhost:3000/yield/accrue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          now_sec: fiveDaysAgo,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setStatus(`Accrue Success! Response: ${JSON.stringify(data)}`)
      } else {
        setStatus(`Accrue Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setStatus(`Accrue Error: ${error.message}`)
    }
  }

  return (
    <div className="pos-container">
      <h1>POS Card Reader</h1>
      <div className="card-reader">
        <div className="card-reader-display">
          <div className="card-icon">💳</div>
          <p>Ready to accept payment</p>
        </div>
      </div>
      
      <div className="input-form">
        <div className="input-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="merchantId">Merchant ID:</label>
          <input
            id="merchantId"
            type="text"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
            placeholder="Enter merchant ID"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        
        <button 
          className="tap-button" 
          onClick={handleTapCard}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Tap Card'}
        </button>
        
        {status && (
          <div className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>
            {status}
          </div>
        )}
      </div>

      {/* Wrench button at bottom right */}
      <div className="wrench-container">
        <button 
          className="wrench-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          🔧
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button 
              className="dropdown-item"
              onClick={handleAccrueFiveDays}
            >
              +5 days
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default POS
