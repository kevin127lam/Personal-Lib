//load when page is initialized
function init() {
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
}

//calls init function
$( () => {
  init();
});

//loads the rows and values in the table
function loadTaskRows(books) {
  $("#bookrows").empty(); //refers to rows in the table
  books.forEach((book, index) => { $("#bookrows").append(`<tr><td>${book.title}</td><td>${book.author}</td><td>${book.genre}</td><td>${book.publisher}</td><td>${book.year}</td><td>${book.btype}</td></tr>`) });
}

//loads the non-matching values into the corresponding dropdowns
function loadDropdowns(data) {
  $("#authors").empty();
  $("#publishers").empty();
  data.authors.forEach((auth, index) => { $("#authors").append(`<option value= ${auth}> ${auth}</option>`)});
  data.publishers.forEach((publ, index) => { $("#publishers").append(`<option value= ${publ}> ${publ}</option>`)});
}

//functionality to add values in the fields
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
      success: function (data) {
        alert("Successfully added");
        loadDropdowns(data);
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

//loads the list
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