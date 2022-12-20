function getRandomInteger(min, max) {
    return parseInt(Math.random() * (max - (min - 1))) + min;
}

function rollDice() {
    var frequencyTable = document.getElementById("frequencyTable");
    var numDice = document.getElementById("numDice").value;
    var numRolls = document.getElementById("numRolls").value;
    var sum = 0;
    var array = [];
    const allRows = [];
    for (var i = 0; i < numRolls; i++) {
        var thisRoll = [];
        for (var j = 0; j < numDice; j++) {
            var roll = getRandomInteger(1,6);
            thisRoll.push(roll);
            sum += roll;
        }
        array.push(thisRoll);
        allRows.push(array[i].reduce((a, b) => a + b, 0));
    }
    console.log(array);
    console.log(allRows);
    for (var num = numDice*1; num <= numDice*6; num ++) {
        var newRow = frequencyTable.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = num;
        newCell = newRow.insertCell();
        newCell.innerHTML = allRows.filter(item => item===num).length;
    }
    var statsTable = document.getElementById("statsTable");
    var newRow2 = statsTable.insertRow();
    var doubles = newRow2.insertCell();
    var triples = newRow2.insertCell();
    var mean = newRow2.insertCell();
    var median = newRow2.insertCell();
    var mode = newRow2.insertCell();
    doubles.innerHTML = 0;
    triples.innerHTML = 0;
    mean.innerHTML = Math.round(100*(sum/numRolls))/100;
    median.innerHTML = retMedian(allRows, numRolls);
    mode.innerHTML = retMode(allRows);
    if (numDice > 1) {
        doubles.innerHTML=repeats(array, 2);
        if (numDice > 2) {
            triples.innerHTML = repeats(array, 3);
        }
    }
}
function repeats(array, numOccur) {
    var num = 0;
    for (var item of array) {
        const counts = {};
        item.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; counts[x]>=numOccur?num++:num+=0});
    }
    return(num);
}

function retMedian(array, num) {
    array = array.sort((a, b) => a - b);
    let x = array.length;
    if (array.length % 2 != 0) {
        return array[Math.floor(x / 2)];
    } else {
        let mid1 = array[x / 2];
        let mid2 = array[x / 2- 1];
        return (mid1 + mid2) / 2;
    }
}
 
function retMode(array) {
    if (array.length < 2) {
        return array[0];
    }
    let freq = 0, freqNum, list = []
    array.forEach(function(num) {
        let foundNum = list.find(function(el){ return el.num == num })
        if (foundNum) {
            foundNum.count++
            if (foundNum.count > freq) { 
                freqNum = num
                freq = foundNum
            }
        } else
        list.push({num: num, count: 1})
    })  
    return freqNum
}