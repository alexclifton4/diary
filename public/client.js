/* globals axios, dateFormat */
var view = "/data"

var init = function() {
  getData("/data")
}

//gets all data
var getData = function(path) {
  view = path
  let html;
  
  //get data from server
  axios.get(path).then((response) => {
    let data = response.data
    if (data == "") {
      html = "No results"
    } else {
      //create top of table
      html = "<table><tr><th>Date</th><th>Country</th><th>Place</th><th>Notes</th><th>Edit</th></tr>"
  
      for (let i in data) {
        let x = data[i]
        let date = dateFormat(x.date, "dS mmm. yyyy")
        let buttons = `<button onclick="edit(${x.id})">Edit</button><button onclick="remove(${x.id})">X</button>`
        let notes = x.notes.replace(/\r\n/g, "<br>")
        html += `<tr><td>${date}</td><td>${x.country}</td><td>${x.place}</td><td>${notes}</td><td>${buttons}</td></tr>`
      }
    }
    
    //update page
    document.getElementById('table').innerHTML = html + "</table>"
  })
}

//deletes a record
var remove = function(id) {
  axios.get("/delete?id=" + id).then((response) => {
    getData(view)
  })
}

//edits a record
var edit = function(id) {
  window.location = "/edit#" + id
}

//show records between dates
var viewDates = function() {
  //get dates
  let from = new Date(document.getElementById('fromDate').value).getTime()
  let to = new Date(document.getElementById('toDate').value).getTime()
  getData("/dates?from=" + from + "&to=" + to)
}

//search for a country
var searchCountry = function() {
  let country = document.getElementById('country').value
  getData("/search?country=" + country)
}

//search for a place
var searchPlace = function() {
  let place = document.getElementById('place').value
  getData("/search?place=" + place)
}

window.onload = init