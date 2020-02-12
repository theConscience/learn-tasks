function cashBox(cashBillsQuery, price = 25) {
    console.log('cashBox() called with:', cashBillsQuery)
    // const price = 25
    let cashSum = 0
    let availableBills = []
    let unusedBills = []
    let hasShortChange = false

    for (let i = 0; i < cashBillsQuery.length; i++) {
        console.log('------- iteration', i, '-------')
        console.log('cashSum:', cashSum)
        let currentBill = cashBillsQuery[i]
        console.log('currentBill:', currentBill)
        if (currentBill === price) hasShortChange = true
        else if (currentBill > price) {
            let remainingAmount = currentBill - price
            console.log('remainingAmount:', remainingAmount)
            const enoughChange = remainingAmount <= cashSum
            console.log('enoughChange:', enoughChange)
            if (!enoughChange) {  // seller has not enough change
                hasShortChange = false
                break
            } else {  // checking if bills suitable for make proper change
                console.log('availableBills:', availableBills)
                for (let j = 0; j < availableBills.length; j++) {
                    if (remainingAmount - availableBills[j] > 0) {
                        remainingAmount -= availableBills[j]
                    } else if (remainingAmount - availableBills[j] === 0) {
                        remainingAmount = 0
                        console.log('availableBills before:', availableBills)
                        // availableBills = availableBills.slice(j + 1)
                        availableBills.splice(0, j + 1)
                        console.log('availableBills after :', availableBills)
                        break
                    } else if (remainingAmount - availableBills[j] < 0) {
                        unusedBills.push(availableBills[j])
                        console.log('unusedBills:', unusedBills)
                    }
                }
                console.log('remainingAmount:', remainingAmount)
                if (remainingAmount === 0) hasShortChange = true
                else {
                    hasShortChange = false
                    break
                }
            }
        }  // else break  // currentBill < price, cheater!
        console.log('hasShortChange:', hasShortChange)
        cashSum += price
        availableBills.push(currentBill)
        availableBills = [...unusedBills, ...availableBills]
        unusedBills = []
    }
    console.log('Has short change?', hasShortChange)
    return hasShortChange
}


// make some tests with default price 25
check(cashBox([25, 25, 50]), true)
check(cashBox([25, 50, 25]), true)
check(cashBox([25, 50, 50]), false)
check(cashBox([50, 25, 25]), false)
check(cashBox([25, 50, 25, 25, 25, 100]), true)
check(cashBox([25, 50, 25, 25, 100]), true)
check(cashBox([25, 100]), false)
check(cashBox([25, 25, 100]), false)
check(cashBox([25, 25, 25, 100]), true)
check(cashBox([25, 25, 100, 50]), false)
check(cashBox([25, 25, 50, 50, 100]), false)
check(cashBox([25, 25, 50, 50, 25, 100]), true)
check(cashBox([25, 25, 50, 50, 100]), false)
check(cashBox([25, 25, 50, 50, 100]), false)
check(cashBox([25, 25, 50, 50, 100]), false)
check(cashBox([25, 50, 25, 100]), true)
check(cashBox([25, 50, 25, 100, 125]), true)
check(cashBox([25, 50, 25, 100, 125, 150]), true)
check(cashBox([25, 25, 50, 25, 25, 100]), true)
check(cashBox([25, 25, 50, 25, 25, 125]), true)
check(cashBox([25, 25, 50, 25, 25, 25, 150]), true)
check(cashBox([25, 25, 50, 25, 25, 50, 50]), true)
check(cashBox([25, 25, 50, 25, 25, 25, 25, 25, 25, 25, 25, 25, 50, 50]), true)
check(cashBox([25, 25, 50, 25, 25, 25, 25, 25, 25, 25, 25, 25, 50, 50, 50, 100, 100, 500]), false)
check(cashBox([25, 25, 50, 25, 25, 25, 25, 25, 25, 25, 25, 25, 50, 50, 50, 25, 100, 100, 100, 500]), true)

// make some tests with price 10
check(cashBox([10, 10, 20], 10), true)
check(cashBox([10, 20, 10], 10), true)
check(cashBox([10, 20, 20], 10), false)
check(cashBox([20, 10, 10], 10), false)
check(cashBox([10, 20, 10, 10, 10, 40], 10), true)
check(cashBox([10, 20, 10, 10, 40], 10), true)
check(cashBox([10, 40], 10), false)
check(cashBox([10, 10, 40], 10), false)
check(cashBox([10, 10, 10, 40], 10), true)
check(cashBox([10, 10, 20, 20, 40], 10), false)
check(cashBox([10, 10, 20, 20, 40], 10), false)
check(cashBox([10, 10, 20, 20, 40], 10), false)
check(cashBox([10, 20, 10, 40], 10), true)
check(cashBox([10, 20, 10, 40, 50], 10), true)
check(cashBox([10, 20, 10, 40, 50, 60], 10), true)
check(cashBox([10, 10, 20, 10, 10, 40], 10), true)
check(cashBox([10, 10, 20, 10, 10, 50], 10), true)
check(cashBox([10, 10, 20, 10, 10, 10, 60], 10), true)
check(cashBox([10, 10, 20, 10, 10, 20, 50], 10), true)
check(cashBox([10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20], 10), true)
check(cashBox([10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 40, 40, 200], 10), false)
check(cashBox([10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 10, 40, 40, 40, 200], 10), true)

// make some tests with price 12
check(cashBox([48, 11, 44, 52], 12), true)


// testing function
function check(expression, value) {
    const checkResult = expression === value
    checkResult ? console.log('=================\nSuccessfull check\n=================') : console.warn('===========\nCheck failed!\n=============')
    console.log('\n')
    return checkResult
}