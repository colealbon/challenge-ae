const timestampStr = new Date({{ timestamp }}).toLocaleString();
document.getElementById('pulsetime').innerHTML = timestampStr;

// reformat tradehistory
const tradehistory = JSON.parse(document.getElementById('tradehistory').innerHTML)
console.log(tradehistory[0]);
