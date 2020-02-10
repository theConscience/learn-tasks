const isBracketStructureBalanced = function isBracketStructureBalanced(str) {
    console.log('Checking (1) str:', str)

    const openingBrackets = ['[', '(', '<', '{']
    const closingBrackets = [']', ')', '>', '}']

    const balance = str.split('').reduce((sum, symbol) => {
        const openingBracketPosition = openingBrackets.indexOf(symbol) + 1
        const closingBracketPosition = closingBrackets.indexOf(symbol) + 1

        if (openingBracketPosition) sum += openingBracketPosition
        else if (closingBracketPosition) sum -= closingBracketPosition

        return sum
    }, 0)

    const result = balance === 0
    console.log('result for str:', str, ':', result)
    return balance === 0
}

// make some tests
check(isBracketStructureBalanced('[()]'), true)
check(isBracketStructureBalanced('{<>}}'), false)
check(isBracketStructureBalanced('](())'), false)
check(isBracketStructureBalanced('(())'), true)
check(isBracketStructureBalanced('((())'), false)
check(isBracketStructureBalanced('(sone [] + 9 (<1>)){}(123)'), true)
check(isBracketStructureBalanced('{1}.gammaFrom (ahah)) pseudo{}'), false)
check(isBracketStructureBalanced('[[[>'), false)
check(isBracketStructureBalanced('(]]'), false)
check(isBracketStructureBalanced('[([(])])'), false)

console.log('====================')


const isBracketStructureBalanced2 = function isBracketStructureBalanced2(str) {
    console.log('Checking (2) str:', str)

    const openingBrackets = ['[', '(', '<', '{']
    const closingBrackets = [']', ')', '>', '}']

    const bracketWeightsArr = str.split('').reduce((checkArr, symbol) => {
        const openingBracketPosition = openingBrackets.indexOf(symbol) + 1
        const closingBracketPosition = closingBrackets.indexOf(symbol) + 1

        if (openingBracketPosition) checkArr.push(openingBracketPosition)
        else if (closingBracketPosition) {
            const prevBracket = checkArr[checkArr.length - 1]
            const prevBracketIsOpening = prevBracket > 0
            if (prevBracketIsOpening) {
                const prevBracketMatch = (prevBracket - closingBracketPosition === 0)
                if (prevBracketMatch) checkArr.push(-closingBracketPosition)
                else checkArr.push(-Infinity)  // Brackets unbalanced
            } else checkArr.push(-closingBracketPosition)
        }

        return checkArr
    }, [])
    console.log('bracketWeightsArr:', bracketWeightsArr)

    const balance = bracketWeightsArr.reduce((acc, el) => acc + el, 0)

    const isBalanced = balance === 0
    console.log('String', str, 'brackets balance is:', isBalanced)
    return isBalanced
}

// make some tests
check(isBracketStructureBalanced2('{<>}}'), false)
check(isBracketStructureBalanced2('[()]'), true)
check(isBracketStructureBalanced2('](())'), false)
check(isBracketStructureBalanced2('(())'), true)
check(isBracketStructureBalanced2('((())'), false)
check(isBracketStructureBalanced2('(sone [] + 9 (<1>)){}(123)'), true)
check(isBracketStructureBalanced2('{1}.gammaFrom (ahah)) pseudo{}'), false)
check(isBracketStructureBalanced2('[[[>'), false)
check(isBracketStructureBalanced2('(]]'), false)
check(isBracketStructureBalanced2('[([(])])'), false)

console.log('====================')


const isBracketStructureBalanced3 = function isBracketStructureBalanced3(str) {
    console.log('Checking (3) str:', str)

    const openingBrackets = ['[', '(', '<', '{']
    const closingBrackets = [']', ')', '>', '}']

    const bracketsArr = str.split('').filter(symbol => openingBrackets.indexOf(symbol) > -1 || closingBrackets.indexOf(symbol) > -1)
    console.log('bracketsArr:', bracketsArr)
    
    const hasUnmachedBracket = bracketsArr.length % 2 != 0
    if (hasUnmachedBracket) return false

    const balanceBracketsArr = bracketsArr.reduce((acc, bracket, i) => {
        if (!acc) return false
        const openingBracketId = openingBrackets.indexOf(bracket)
        const closingBracketId = closingBrackets.indexOf(bracket)

        if (closingBracketId > -1) {
            const prevBracket = acc[acc.length - 1] 
            console.log('prevBracket:', prevBracket)
            if (!prevBracket) return false
            const prevClosingBracketId = closingBrackets.indexOf(prevBracket) 
            console.log('prevClosingBracketId:', prevClosingBracketId)
            if (prevClosingBracketId > -1) acc.push(closingBracketId)
            const prevOpeningBracketId = openingBrackets.indexOf(prevBracket)
            console.log('prevOpeningBracketId:', prevOpeningBracketId)
            if (prevOpeningBracketId > -1) {
                const isMatchingBracket = prevOpeningBracketId == closingBracketId
                console.log('isMatchingBracket:', isMatchingBracket)
                if (isMatchingBracket) delete prevBracket
            } else return false
        } else if (openingBracketId) {
            acc.push(openingBracketId)
        }

        console.log('acc:', acc)
        return acc
    }, [])

    console.log('balanceBracketsArr:', balanceBracketsArr)
    if (!balanceBracketsArr) return false

    return true
}


// make some tests
check(isBracketStructureBalanced3('{<>}}'), false)
check(isBracketStructureBalanced3('][()]['), false)
check(isBracketStructureBalanced3('[()]'), true)
check(isBracketStructureBalanced3('](())'), false)
check(isBracketStructureBalanced3('(())'), true)
check(isBracketStructureBalanced3('((())'), false)
check(isBracketStructureBalanced3('(sone [] + 9 (<1>)){}(123)'), true)
check(isBracketStructureBalanced3('{1}.gammaFrom (ahah)) pseudo{}'), false)
check(isBracketStructureBalanced3('[[[>'), false)
check(isBracketStructureBalanced3('(]]'), false)
check(isBracketStructureBalanced3('[([(])])'), false)

console.log('====================')


const isBracketStructureBalanced4 = function isBracketStructureBalanced4(str) {
    console.log('Checking (4) str:', str)

    const openingBrackets = ['[', '(', '<', '{']
    const closingBrackets = [']', ')', '>', '}']
    
    const bracketsArr = str.split('').filter(symbol => openingBrackets.indexOf(symbol) > -1 || closingBrackets.indexOf(symbol) > -1)
    console.log('bracketsArr:', bracketsArr)
    
    const hasUnmachedBracket = bracketsArr.length % 2 != 0
    if (hasUnmachedBracket) return false
    
    const bracketsCombinations = ['()', '[]', '<>', '{}']

    const shouldBeEmpty = []
    for (let i = 0; i < bracketsArr.length; i++) {
        const thisBracket = bracketsArr[i]
        if (i > 0) {
            const prevBracket = shouldBeEmpty[shouldBeEmpty.length - 1]
            const checkedCombination = prevBracket + thisBracket
            if (bracketsCombinations.indexOf(checkedCombination) > -1) shouldBeEmpty.pop()
            else shouldBeEmpty.push(thisBracket)
        } else shouldBeEmpty.push(thisBracket)
    }

    console.log('shouldBeEmpty:', shouldBeEmpty)

    return !shouldBeEmpty.length
}


// make some tests
check(isBracketStructureBalanced4('{<>}}'), false)
check(isBracketStructureBalanced4('[()]'), true)
check(isBracketStructureBalanced4('](())'), false)
check(isBracketStructureBalanced4('(())'), true)
check(isBracketStructureBalanced4('((())'), false)
check(isBracketStructureBalanced4('(sone [] + 9 (<1>)){}(123)'), true)
check(isBracketStructureBalanced4('{1}.gammaFrom (ahah)) pseudo{}'), false)
check(isBracketStructureBalanced4('[[[>'), false)
check(isBracketStructureBalanced4('(]]'), false)
check(isBracketStructureBalanced4('[([(])])'), false)

console.log('====================')


// testing function
function check(expression, value) {
    const checkResult = expression === value
    checkResult ? console.log('Successfull check\n======') : console.warn('Check failed!\n======')
    return checkResult
}