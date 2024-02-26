$(document).ready(function(){
  // Submit form
  $('#urlForm').submit(function(e){
    e.preventDefault();
    var AWS_API_URL = "https://e2jkrpehd8.execute-api.us-east-1.amazonaws.com/dev/direct-ddb/";
    var urlInput = $('#urlInput').val();
    var shortURL = generateShortURL();
    $.ajax({
      url: AWS_API_URL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ "shortURL": shortURL, "longURL": urlInput, "owner": "pratik" }),
      success: function(response){
        // Show short URL button
        $('#shortURLContainer').show();
        $('#shortURLButton').text(response.shortURL);
        $('#shortURLButton').attr('data-url', AWS_API_URL + response.shortURL); // Store URL in data attribute
        var btn = '<button type="button" class="btn btn-success lbtn" id="'+response.shortURL+'" data-url="'+AWS_API_URL + response.shortURL+'">'+response.shortURL+'</button>'
        var newRow = '<tr><td>' + response.shortURL + '</td><td>' + urlInput + '</td><td>' + btn + '</td></tr>';
        $('#urlTable').append(newRow);
      },
      error: function(xhr, status, error){
        console.error(error);
        alert('An error occurred while shortening the URL. Please try again.');
      }
    });
  });

  // Open link in new tab when shortURL button is clicked
  $(document).on('click', '.lbtn', function(){
    var url = $(this).attr('data-url');
    window.open(url, '_blank');
  });

  // Function to generate 10-character random ID
  function generateShortURL() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var shortURL = '';
    for (var i = 0; i < 10; i++) {
      shortURL += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortURL;
  }
});
