function cashBox(cashBillsQuery) {
    const price = 25
    let cashSum = 0
    let availableBills = []
    let hasShortChange = false
    
    for (let i = 0; i < cashBillsQuery.length; i++) {
        let currentBill = cashBillsQuery[i]
        if (currentBill === price) hasShortChange = true
        else if (currentBill > price) {
            let changeAmount = currentBill - price
            const enoughChange = changeAmount <= cashSum
            if (!enoughChange) {  // seller has not enough change
                hasShortChange = false
                break
            } else {  // checking if bills suitable for make proper change
                for (let j = 0; j < availableBills.length; j++) {
                    changeAmount -= availableBills[j]
                    if (changeAmount === 0) {
                        availableBills = availableBills.slice(0, j)
                        break
                    }
                }
                if (changeAmount === 0) hasShortChange = true
                else {
                    hasShortChange = false
                    break
                }
            }
        }  // else break  // currentBill < price, cheater!
        cashSum += price
        availableBills.push(currentBill)
    }
    return hasShortChange
}


// make some tests
check(cashBox([25, 25, 50]), true)
check(cashBox([25, 50, 25]), true)
check(cashBox([25, 50, 50]), false)
check(cashBox([50, 25, 25]), false)
check(cashBox([25, 50, 25, 25, 25, 100]), true)
check(cashBox([25, 50, 25, 25, 100]), true)
check(cashBox([25, 100]), false)
check(cashBox([25, 25, 100]), false)
check(cashBox([25, 25, 25, 100]), true)
check(cashBox([25, 25, 50, 50, 100]), false)


// testing function
function check(expression, value) {
    const checkResult = expression === value
    checkResult ? console.log('Successfull check\n======') : console.warn('Check failed!\n======')
    return checkResult
}