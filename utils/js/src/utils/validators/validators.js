// 验证邮箱
const validateMail = (mail) => {
  const pattern = /^[a-zA-Z0-9_\-]+@[0-9a-z]+(\.[a-z]+)+$/
  return pattern.test(mail)
}

// 验证大陆手机号
const validatePhone = (phone) => {
  const pattern = /^[0-9]{11}$/
  return pattern.test(phone)
}

module.exports = {
  validateMail,
  validatePhone
}