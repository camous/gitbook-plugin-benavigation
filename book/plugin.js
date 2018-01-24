require(['gitbook', 'jquery'], function (gitbook, $) {


  gitbook.events.bind('page.change', function () {

    if (!$('#benavigation').length) {
      $('.book').each(function (index, element) {
        var $element = $(element);

        var settings = {
          crossDomain: true,
          url: '/api/books',
          cache : true,
          method: 'GET'
        };

        $element.before(`<div id="benavigation">
            <div id="books">&nbsp;</div>
            <div id="authentication">&nbsp;</div>
            <div id="roles">
              <div id="pageroles">&nbsp;</div>
              <div id="userroles">&nbsp;</div>
            </div>
          </div>`);

        $.ajax(settings).done(function (response) {
          for (var id in response) {
            $('#benavigation > #books').append('<a href="/' + response[id] + '">' + response[id] + '</a> ');
          }
        });
      });

      var settings = {
        crossDomain: true,
        url: '/api/user',
        method: 'GET'
      };

      $.ajax(settings).done(function (response) {
        $('#benavigation > #authentication').html('<a href="#" onclick="$(\'#roles\').toggle();">' + response.displayName + ' (' + response.email + ') <i class="fa fa-shield" aria-hidden="true"></i></a>');
        $('#roles > #userroles').html('<pre>' + response.email + ': ' + JSON.stringify(response.roles, null, 4) + '</pre>');
      });
    }
    $('#roles > #pageroles').html('<pre>' + gitbook.page.getState().page.title + ': ' + JSON.stringify(gitbook.page.getState().page.roles, null, 4) + '</pre>');
  });
});
