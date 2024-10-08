require('dotenv').config(); // Load environment variables from .env file
const apiKey = process.env.API_KEY; // Access the API key

// event listener for reload the page , once reload it will call the function fetchData() , with deflaut input date
document.addEventListener("DOMContentLoaded" , fetchData(new Date("2021-01-05"),new Date("2021-01-15")) )
// event listener for clicking the update button , once clicked , exract the from date and to date , then call the function fetchData() with input of fromDate and toDate
document.getElementById("updateButton").addEventListener("click", function(){
  let fromDate = new Date(document.getElementById("from").value);
  let toDate = new Date(document.getElementById("to").value);
  fetchData(fromDate,toDate)
})


function fetchData(date1,date2) {
  //Call the API in get method and headers with the api key
  fetch ('https://api.api-ninjas.com/v1/covid19?country=canada&region=Ontario', {
      method: 'GET',
      headers: {
          'X-Api-Key': apiKey
      }
  })
  
  .then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response as JSON
      return response.json();
    })

    .then(data => {
      // print the input date and all the data in console
      console.log(date1);
      console.log(date2);
      console.log(data);

      // reset the result table as empty 
      const result = document.getElementById("result");
      result.innerHTML = ''; 

      // go through each cases set in the api result data, create the table according to the input date
      Object.entries(data[0].cases).forEach(([date,{total,new:newCases}]) => {
        let currentDate = new Date(date);

        if(currentDate >= date1 && currentDate <= date2){
          const row = document.createElement('tr');
          row.innerHTML = `<td>${date}</td><td>${total}</td><td>${newCases}</td>` 
          result.appendChild(row);
        }

      })
      
    })

    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });

}