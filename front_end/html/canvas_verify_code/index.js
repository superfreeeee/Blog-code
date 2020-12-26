const gVerify = new GVerify({ el: '.verify' })

function validate (e) {
  const input = document.querySelector('.wrapper input')
  console.log('validate')
  if (!input.validity.valid) {
    return
  }
  console.log('after validate')
  const code = input.value
  console.log(code)
  const msgEl = document.querySelector('.wrapper .msg')
  const res = gVerify.validate(code)
  if (res) {
    msgEl.style.color = 'seagreen'
    msgEl.textContent = '验证成功'
  } else {
    msgEl.style.color = 'red'
    msgEl.textContent = '验证失败'
  }
  e.preventDefault()
}

function resetForm (e) {
  e.preventDefault()
  gVerify.refresh()
  document.querySelector('.wrapper input').value = ''
  document.querySelector('.wrapper .msg').textContent = ''
}
