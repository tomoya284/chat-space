$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id="${message.id}">
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} class= "lower-message__image">
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id="${message.id}">
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
 
 var reloadMessages = function() {
  var last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      
      $('.main-chat__messages').append(insertHTML);
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('error');
  });
};
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
   setInterval(reloadMessages, 7000);
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
    console.log(data)
    var html = buildHTML(data);
    $('.main-chat__messages').append(html);
    $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
  })
  .always(function(){
    $(".main-chat__footer__up__2").prop('disabled', false);
    $('form')[0].reset();
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  
});
})
});


