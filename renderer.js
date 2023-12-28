document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
  
    searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const searchTerm = searchInput.value;
        window.api.send('search', searchTerm);
      }
    });
    searchInput.addEventListener('input', function () {
      window.api.send('search-input-started');
    });
  });
  
  // Receive and log the search result from main.js
  window.api.receive('search-result', (result) => {
    console.log(result);
  });
  
  