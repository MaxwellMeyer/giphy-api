import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';

$(document).ready(function () {
  const apiKey = process.env.API_KEY;

  $("#search").click(function () {
    let gifhy = $("#keyword").val();
    $("#keyword").val("");

    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/search?q=${gifhy}&api_key=${apiKey}&limit=5`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      const dataArray = response.data;
      let htmlString = "";
      dataArray.forEach((element) => {
        const gifUrl = element.images.original.url;
        htmlString += `<img src="${gifUrl}" alt="${gifhy} GIF"/>`;
      });
      $(".show").html(htmlString).show();
    }

  });
});