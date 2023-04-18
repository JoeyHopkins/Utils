//some test structures
const items = [
  {
    name: 'One',
    isTrue: false
  },
  {
    name: 'Two',
    isTrue: true
  }
];

let keys = 'one, two'

let array = ['one', 'two', 'three']

//date tools
function getDaysApart(date, date2) {
	let d = new Date(date)
	let d2 = new Date(date2)
	
	return (d - d2) / 86400000
}

//JSON Tools
function jsonKeyToString(json, key, joinWith = ', '){
  let string = ``
  
	for(let object of json)
	  if(object[key] != undefined)
	    string += object[key] + joinWith
	 
	 string = string.substring(0, string.length - joinWith.length) 
	  
	return string
}

function jsonUpdateObject(json, key, value, updateKey, updateValue) {
	
	for(let object in json)
	  if(json[object][key] == value)
	    json[object][updateKey] = updateValue
	
	return json
}

function jsonToCustomCsv(json, keys) {
	
	let csv = ''
	let keysArray = keys.split(',')
	
	for(let key of keysArray)
	  csv += `"` + key.trim() + `",`
	 
	csv = csv.substring(0, csv.length - 1)
	csv += '\r\n'
	
	for(let object of json){
	  for(let key of keysArray)
	    if(object[key.trim()] != undefined)
	      csv += `"` + object[key.trim()] + `",`
	      
	  csv = csv.substring(0, csv.length - 1)   
	  csv += '\r\n'	  
	}
	 
	return csv
}

function jsonToCsv(json) {
	let csv = ''
	csv += `"` + Object.keys(json[0]).join('","') + `"\r\n`
	
	for(let object of json)
	  csv += `"` + Object.values(object).join('","') + `"\r\n`
	
	return csv
}

//array tools
function arrayToString(array, joinWith = ', ') {
	return array.join(joinWith)
}