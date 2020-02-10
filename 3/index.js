function cashBox(cashBillsQuery) {
    console.log('cashBox() called with:', cashBillsQuery)
    const price = 25
    let cashSum = 0
    let availableBills = []
    let hasShortChange = false
    
    for (let i = 0; i < cashBillsQuery.length; i++) {
        console.log('cashSum:', cashSum)
        let currentBill = cashBillsQuery[i]
        console.log('currentBill:', currentBill)
        if (currentBill === price) hasShortChange = true
        else if (currentBill > price) {
            let changeAmount = currentBill - price
            console.log('changeAmount:', changeAmount)
            const enoughChange = changeAmount <= cashSum
            console.log('enoughChange:', enoughChange)
            if (!enoughChange) {  // seller has not enough change
                hasShortChange = false
                break
            } else {  // checking if bills suitable for make proper change
                console.log('availableBills:', availableBills)
                for (let j = 0; j < availableBills.length; j++) {
                    changeAmount -= availableBills[j]
                    if (changeAmount === 0) {
                        availableBills = availableBills.slice(0, j)
                        break
                    }
                }
                console.log('changeAmount:', changeAmount)
                if (changeAmount === 0) hasShortChange = true
                else {
                    hasShortChange = false
                    break
                }
            }
        } else break  // currentBill < price, cheater!
        console.log('hasShortChange:', hasShortChange)
        cashSum += price
        availableBills.push(currentBill)
    }
    console.log('Has short change?', hasShortChange)
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