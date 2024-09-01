function convertPlaintextToJSON(plaintext) {
  
  let cleanedText = plaintext
    .trim()
    .replace(/^\s*`+|\s*`+$/g, "") 
    .replace(/[\n\r]/g, "") 
    .replace(/(\w+)\s*,\s*(\w+)/g, '{"name": "$1", "type": "$2"}') // Convert parameter tuples
    .replace(/(\w+):\s*"(.*?)"/g, '"$1": "$2"') 
    .replace(/(\w+):/g, '"$1":') // Ensure keys are in double quotes
    .replace(/\(/g, "") 
    .replace(/\)/g, "") 
    .replace(/(\[\s*\])/g, "[$1]") // Ensure proper brackets
    .replace(/,\s*$/, ""); 

  
  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

module.exports = { convertPlaintextToJSON };

// const plaintext = `[
//     {
//         Name: "DeleteUser",
//         Parameters: [
//             (userId, String),
//             (forceDelete, Boolean)
//         ]
//     }

// ]`;

// const jsonFormat = convertPlaintextToJSON(plaintext);
// console.log(JSON.stringify(jsonFormat, null, 2));
