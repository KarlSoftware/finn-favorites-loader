$(document).ready(function() {
    var pathName = window.location.href;
    pathName = pathName.replace('&page=1', '');

    // Gets the content of the last child in "pagination". Might be a better way to find the last page, but this works for now.
    var numOfPages = $('.hidelt768 a:last-child').text();

    // Only run script content if more than 1 page. 
    if (numOfPages > 1) {
        // Removes the whole pagination from the website. Ain't nobody got time to click that...
        $('div.listing > div.inner > div.bd > div:last-child').remove();

        // Create array with all page Integers
        var pageArr = [];
        for (var i = 2; i <= numOfPages; i++) {
            pageArr.push(i);
        }
        console.log(pageArr);

        // Save the listing div. 
        var listDiv = $('div.listing > div.inner > div.bd');
        var divHeight = listDiv.innerHeight();
        var wHeight = $(window).innerHeight();

        // to ensure only ONE call per additional page
        var pause = false; 

        // Watch user scroll
        $(window).scroll(function() {
            if($(this).scrollTop() >= (divHeight - wHeight) && !pause && pageArr.length) {
                // Splice next page from array.
                var nextPage = pageArr.splice(0,1)[0];
                // Pause scrolling. 
                pause = true;
                console.log(nextPage);

                // Generate URL for the page we want to fetch content from.
                var url = pathName + ('&page=' + nextPage);
                console.log(url);
                // Run a GET method for next page
                $.get(url, function(data) {
                    var content = $(data).find('div.listing > div.inner > div.bd');
                    $(content).children('div:last').remove();
                    listDiv.append($(content).html());
                    divHeight = listDiv.innerHeight();
                    pause = false;
                });
            }
        });
    }
});
