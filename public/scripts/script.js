
function init() {
  // Put initialization code here
}

function loadTaskRows(books) {
  $("#bookrows").empty(); //refers to rows in the table
  books.forEach((book, index) => { $("#bookrows").append(`<tr><td>${book.title}</td><td>${book.author}</td><td>${book.genre}</td><td>${book.publisher}</td><td>${book.year}</td><td>${book.btype}</td></tr>`) });
}

function loadDropdowns(data) {
  $("#authors").empty();
  $("#publishers").empty();
  data.authors.forEach((auth, index) => { $("#authors").append(`<option value= ${auth}> ${auth}</option>`)});
  data.publishers.forEach((publ, index) => { $("#publishers").append(`<option value= ${publ}> ${publ}</option>`)});
}

$(() => {
  $.ajax(
    "/load",
    {
      type: "GET",
      dataType: "json",
      success: function(data) {
        loadDropdowns(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
      }
    }
  );
});

$("#add").click(() => {
  let bookTypes = [];
  $("input:checked").each((index, obj) => bookTypes.push(obj.value));
  $.ajax(
    "/add",
    {
      type: "GET",
      processData: true,
      data: {
        title: $("#title").val(),
        auth: $("#auth").val(),
        genre: $("#genre").val(),
        publ: $("#publ").val(),
        year: $("#year").val(),
        btype: bookTypes,
      },
      dataType: "json",
      success: function (books) {
        alert("Successfully added");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
      }
    }
  );
  $("#title").val("");
  $("#auth").val("");
  $("#genre").val("");
  $("#publ").val("");
  $("#year").val("");
  $("input:checked").each((index, obj) => $(obj).prop("checked", false));
});

$("#list").click(() => {
  $.ajax(
    "/list",
    {
      type: "GET",
      processData: true,
      dataType: "json",
      success: function (books) {
        loadTaskRows(books);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
      }
    }
  );
});

/*append new option to dropdown for adding saved values to dropdown
initiialize dropdown with value that says "new publisher" if its new pub?

*/

// const a = {};
// const pub = {};
// for(){
//   cons books = (i);
//   authors[book.aythor] = 1;
//   publisher... = 1.
// }
// for(a in authors){
//   $("#authorlist").append('<option value'{idk}'>')
// }

/**
 * functino (){
 * let temp = "";
 * $("input checked").each(
 * (idx.ele) => {
 * const v = $(ele).val()
 * temp += ( v + " ")})
 * };
 * return remp
 * 
 * in the add function send bookType: typeString()
 */