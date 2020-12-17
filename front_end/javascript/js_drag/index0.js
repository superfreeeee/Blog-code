function dragStart (e, id) {
  console.log('mouse down -> drag start')
  const el = document.getElementById(id)
  console.log(this)
  console.log(el)
  
  const getMove = function (e) {
    console.log('mouse move')
  }
  this.addEventListener('mousemove', getMove)
  this.onmouseup = function (e) {
    console.log('mouse up -> drag over')
    this.removeEventListener('mousemove', getMove)
  }
}