document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
  
    searchInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        const searchTerm = searchInput.value;
        window.api.send('search', searchTerm);
      }
    });
  });
  
  // Receive and log the search result from main.js
  window.api.receive('search-result', (result) => {
    console.log(result);
  });
  
  