$(function(){

  function buildHTML(message){
    image = ( message.image ) ? `<img class="lower-message__image" src=${message.image} >` : ""; //三項演算子(投稿したimage(現在20)が{message(json).image=>message.image.url}であることはtrueなら,画像のhtmlを表示,falseなら何も表示しない)　つまり画像のurlを投稿したときはそのurlを読んで画像で表示
                var html =  
                ` <div class="message">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
          return html; //htmlをajaxに返す
  }



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("form")[0].reset();
      $('input').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 50);
    })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });

  $(function(){
    var reloadMessages = function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {last_id: last_message_id}
        })
        .done(function(messages){
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 50);
        })
        .fail(function(){
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(reloadMessages, 7000);
  });
});