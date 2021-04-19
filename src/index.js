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
    const url = `http://api.giphy.com/v1/gifs/search?q=${gifhy}&api_key=${apiKey}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      const embeddedGifUrl = response.data[0].images.original.url;
      console.log(embeddedGifUrl);
      const htmlString = `<img src="${embeddedGifUrl}" alt="${gifhy} GIF"/>`;
      $(".show").html(htmlString).show();

    }

  });
});