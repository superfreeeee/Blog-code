const gVerify = new GVerify({ el: '.verify' })

function validate (e) {
  const input = document.querySelector('.wrapper input')
  if (!input.validity.valid) {
    return
  }
  const code = input.value
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
