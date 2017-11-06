(function ($, undefined) {
    $(function () {
        var pathName = window.location.href;

        var numOfPages = $('.hidelt768 a:last-child').text();
        $('div.listing > div.inner > div.bd > div:last-child').remove();

        if (numOfPages > 1) {

            var filler = [];
            for (var i = 2; i <= numOfPages; i++) {
                filler.push(i);
            }

            var listDiv = $('div.listing > div.inner > div.bd');
            var divHeight = listDiv.innerHeight();
            var wHeight = $(window).innerHeight();

            // to ensure only ONE call per additional page
            var pause = false; 

            // Watch user scroll
            $(window).scroll(function() {
                if($(this).scrollTop() >= (divHeight - wHeight) && !pause && filler.length) {
                    console.warn('end reached');
                    var nextPage = filler.splice(0,1);
                    pause = true;

                    var url = pathName + ("&page=" + nextPage);

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
})(window.jQuery.noConflict(true));
