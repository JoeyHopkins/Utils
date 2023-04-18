
//date tools
exports.getDaysApart = (date, date2) => {
	let d = new Date(date);
	let d2 = new Date(date2);
	
	/// ms in day
	return (d - d2) / 86400000;
}

// The following date tools return iso format string date only
exports.getFirstOfYearDate = () => {
  const d = new Date();
  let year = d.getFullYear();
  return year + '-01-01';
};

//JSON Tools
//input json format [json]
exports.jsonKeyToString = (json, key, joinWith = ', ') => {
  let string = ``;
  
	for(let object of json)
	  if(object[key] != undefined)
	    string += object[key] + joinWith;
	 
	 string = string.substring(0, string.length - joinWith.length);
	  
	return string;
}

exports.jsonUpdateObject = (json, key, value, updateKey, updateValue)  => {
	
	for(let object in json)
	  if(json[object][key] == value)
	    json[object][updateKey] = updateValue;
	
	return json;
}

exports.jsonToCustomCsv = (json, keys)  => {
	
	let csv = '';
	let keysArray = keys.split(',');
	
	for(let key of keysArray)
	  csv += `"` + key.trim() + `",`;
	 
	csv = csv.substring(0, csv.length - 1);
	csv += '\r\n';
	
	for(let object of json){
	  for(let key of keysArray)
	    if(object[key.trim()] != undefined)
	      csv += `"` + object[key.trim()] + `",`;
	      
	  csv = csv.substring(0, csv.length - 1);
	  csv += '\r\n';
	}
	 
	return csv;
}

exports.jsonToCsv = (json)  => {
	let csv = '';
	csv += `"` + Object.keys(json[0]).join('","') + `"\r\n`;
	
	for(let object of json)
	  csv += `"` + Object.values(object).join('","') + `"\r\n`;
	
	return csv;
}

//array tools
exports.arrayToString = (array, joinWith = ', ') => {
	return array.join(joinWith);
}

//Format tools
exports.formatNumber = (number, decimal = 0) => {
  //if negative, change to positive and put it in a string with proper format
	var options = { 
	  minimumFractionDigits: decimal, 
	  maximumFractionDigits: decimal, 
	};

  if (number < 0){
    number = number * -1;
    return `(-${number.toLocaleString("en-US", options)})`;
  } 
  else 
    return `${number.toLocaleString("en-US", options)}`;
};

//Format tools
exports.formatCurrency = (number, decimal = 2) => {
  //if negative, change to positive and put it in a string with proper format
	var options = { 
	  minimumFractionDigits: decimal, 
	  maximumFractionDigits: decimal, 
	};

  if (number < 0){
    number = number * -1;
    return `(-$${number.toLocaleString("en-US", options)})`;
  } 
  else
    return `$${number.toLocaleString("en-US", options)}`;
};

exports.formatPercent = (num, decimal = 1) => {
  if (num < 0 || num > 100 || num == null)
    return `Error please enter number between 0 and 100`;
  else 
    return `${num.toFixed(decimal)}%`;
};

exports.convertAndFormatPercent = (num, decimal = 1) => {
  if (num < 0 || num > 1 || num == null)
    return `Error please enter number between 0 and 100`;
  else 
  {
  	num = num * 100;
    return `${num.toFixed(decimal)}%`;
  }
};