(function() {                             // Lives in an IIFE(Immediately Invoked Function Expression)
  var $img = $(".gallery img");           // Get the images
  var $search = $("#search");             // Get the input element
  var cache = [];                         // Create an array called cache

  $img.each(function() {                  // For each image
    cache.push({                          // Add an object to the cache array
      element: this,                      // This image
      text: this.alt.trim().toLowerCase() // Its alt text (lowercase trimmed)
    });
  });

  function filter() {                     // Declare a function named filter
    var textInPut = this.value.trim().toLowerCase();  // Get the textInPut
    cache.forEach(function(img) {         // For each entry in cache pass image 
      var index = 0;                          // Set index to 0

      if (textInPut) {                    // If there is some textInPut
        index = img.text.indexOf(textInPut);  // Find if textInPut matches
      }

      img.element.style.display = index === -1? 'none' : '';  // Show / hide
    });
  }

  if ("oninput" in $search[0]) {          // If browser supports input event
    $search.on("input", filter);          // Use input event to call filter()
  } else {                                // Else
    $search.on("keyup", filter);          // Use keyup event to call filter()
  }              

}());