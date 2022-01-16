console.log('this is index')

const socket = io('http://localhost:3000')

const form = document.getElementById('form')
const container = document.getElementById('container')
const input = document.getElementById('input')


let name = prompt('Enter your Name')
console.log(name)
socket.emit('new-user-join', name)

function appendm(massage, position) {
    const lin = document.createElement('div')
    lin.classList.add(position);
    lin.classList.add('line');
    lin.innerText = massage;
    container.append(lin)
}

socket.on('user-join', name => {
    appendm(`User join the chat ${name} `, 'left')
})


form.addEventListener('submit', e => {
    e.preventDefault()
    const message = input.value
    appendm(`You: ${message}`,'right')
    socket.emit('send', message)
    input.value = ''
})


socket.on('rev', data => {
    appendm(`${data.name}: ${data.message}`,'left')
  })

  socket.on('user-disconnect',name=>{
      appendm(`${name} is disconnect`,'left')
  })

  


