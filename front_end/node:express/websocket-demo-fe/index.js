window.onload = function () {
  console.log('window load')
  const proxy = new WebSocketProxy()

  document.getElementById('ws-create').onclick = () => proxy.create()
  document.getElementById('ws-send').onclick = () => proxy.send()
  document.getElementById('ws-close').onclick = () => proxy.close()
  document.getElementById('ws-show').onclick = () => {
    proxy.log('show messages')
    console.log(proxy.messages)
  }
  
}

function WebSocketProxy (url) {
  this.url = url || 'ws://localhost:3000/basic'
  this.socket = undefined
  this.messages = []
}

WebSocketProxy.prototype.create = function createSocket () {
  if (!WebSocket) {
    console.log('Sorry! Your browser doesn\'t support WebSocket')
    return
  }
  if (this.socket) {
    console.log('Connection already exist')
    console.log(this.socket)
    return
  }

  try {
    this.log(`create socket with url: ${this.url}`)
    this.socket = new WebSocket(this.url)

    const self = this
    console.log(this.socket)
    // 连接开启
    this.socket.onopen = function (e) {
      console.log('on open')
    }
    // 连接错误
    this.socket.onerror = function (e) {
      console.log('on error')
      self.close()
    }
    // 消息通知
    this.socket.onmessage = function ({data: msg}) {
      self.messages.push(msg)
      self.log('receive message')
      console.log(msg)
    }

  } catch (err) {
    console.log(err)
    this.close()
  }
}

WebSocketProxy.prototype.send = function sendMessage (msg) {
  if (!this.socket) {
    this.log('socket doesn\'t exist')
    return
  }
  msg = msg || 'default message'
  this.socket.send(msg)
  this.log('message sent')
}

WebSocketProxy.prototype.close = function closeSocket () {
  if (!this.socket) {
    this.log('socket doesn\'t exist')
    return
  }
  this.socket.close()
  this.socket = undefined
  this.log('socket close')
}

WebSocketProxy.prototype.log = function (msg) {
  const prefix = '[WebSocketProxy]'
  console.log(`${prefix}${msg}`)
}