var fs = require('fs/promises');
var fsMain = require('fs');
var html_to_pdf = require('html-pdf-node');


//date tools
exports.getDaysApart = (date, date2) => {
	let d = new Date(date);
	let d2 = new Date(date2);
	
	/// ms in day
	return (d - d2) / 86400000;
}

// The following date tools return iso format string date only
exports.getFirstOfYearDate = () => {
  let d = new Date();
  let year = d.getFullYear();
  return year + '-01-01';
};

exports.firstDayOfCurrentMonth = (string, search, replace) => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  month = String(month).padStart(2, '0')
  return year + '-' + month + '-01';
};

exports.lastDayOfCurrentMonth = (string, search, replace) => {
	var today = new Date();
	return new Date(today.getFullYear(), today.getMonth()+1, 0)
		.toISOString()
		.substring(0, 10)
};

//string tools
exports.replaceAll = (string, search, replace) => {
	return string.split(search).join(replace);
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

//input json
//'keyOne, keyTwo'
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

//PDF Tools
//This uses Pupeteer and html_to_pdf
exports.htmlToPDF = async (filename, directory, html)  => {
  try {
    let options = { format: 'A4' };
    let htmlFile = { content: html };
    let pdfBuffer = await html_to_pdf.generatePdf(htmlFile, options)  
  	return await fs.appendFile(directory + filename, pdfBuffer);
  }
  catch(error) {
    console.error(error)
  }
}

//array tools
exports.arrayToString = (array, joinWith = ', ') => {
	return array.join(joinWith);
}

exports.arrayToQuoteStringForDB = (array) => {
	return `'` + array.join(`','`) + `'`;
}

exports.objectArrayKeyToStringForDB = (array, keyArray) => {
	let strings = []

	for(let key of keyArray)
		strings[key] = ''

	for(let item of array)
		for(let key of keyArray)
			strings[key] += `'` + item[key] + `','`

	for(let item in strings)
		strings[item] = strings[item].substring(0, strings[item].length - 2) 

	return strings;
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

//fs
//input sample:
//await Utils.readFile('D:\\myDir\\', 'test.csv')
exports.readFile = async (directory, exportName) => {
	try {
  	return await fs.readFile(directory + exportName, { encoding: 'utf8' });
	}
	catch (error) {
		console.error(error)
	}
};

//input sample:
// Utils.deleteFile('D:\\myDir\\', 'test.csv')
exports.deleteFile = async (directory, exportName) => {
	try {
  	return await fs.unlink(directory + exportName);
	}
	catch (error) {
		console.error(error)
	}
};

//input sample:
//Utils.saveFile(fileData, 'D:\\myDir\\', 'test.csv')
exports.saveFile = async (fileData, directory, exportName) => {
	try {
  	await fs.writeFile(directory + exportName, fileData);
	}
	catch (error) {
		console.error(error)
	}
};

//create or add to file
//input sample:
// Utils.appendToFile(fileData, 'D:\\myDir\\', 'test.csv')
exports.appendToFile = async (fileData, directory, exportName) => {
	try {
  	return await fs.appendFile(directory + exportName, fileData);
	}
	catch (error) {
		console.error(error)
	}
};

//input sample:
// Utils.appendToFile(fileData, 'D:\\myDir\\', 'test.csv')
exports.renameFile = async (directory, exportName, newName) => {
	try {
  	return await fs.rename(directory + exportName, directory + newName);
	}
	catch (error) {
		console.error(error)
	}
};


//input sample:
// Utils.readDirContents('D:\\myDir\\')
exports.readDirContents = async (directory) => {
	try {
  	return await fs.readdir(directory);
	}
	catch (error) {
		console.error(error)
	}
};
