/* global $ */
$(function () {
  var url = 'http://ga-webchat.herokuapp.com/'
  var socket = io.connect(url, {
    'query' : 'token=' + window.localStorage.getItem('userToken')
  })
/*
* Make a socket object,
* All our communication to the server, i.e.
* talking to or listening from server will happen via this object
*/

/*
* Whenever user clicks the send button
* Send the Message to the server
*/
  document.addEventListener('WebComponentsReady', function () {
    $('#sendBtn').click(function () {
  // retrieve the msg from textbox, trim it off white spaces
      var msg = $('#myMsg').val().trim()
  /*
  * If the msg length is not zero, i.e. msg is not empty, send it to server.
  * We will trigger/emit a "msg" event to the server... This event name can be
  * Anything of our choice, here we will use "msg"
  */
      if (msg.length > 0) {
  /*
  * We will Append the username infront of the message
  *  for decoration purpose only....
  */
        var userName = $('#username').val()
        var completeMsg = userName + ': ' + msg
  // use socket.emit to send something to the server
        socket.emit('chat message', {
          username: userName,
          message: completeMsg
        })

        console.log(socket);
      }
    })
    socket.on('msg', function (incomingMsg) {
      var decoratedHtml = '' + incomingMsg + ''
      $('#chatsContainer').append(decoratedHtml)
    })
  })
})
