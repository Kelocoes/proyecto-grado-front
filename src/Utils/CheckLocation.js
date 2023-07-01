export default function CheckLocation () {
  try {
    if (!window.location.href.includes(localStorage.getItem('type'))) {
      // console.log('Me meti donde no era')
      localStorage.removeItem('token')
      localStorage.removeItem('type')
      return true
    } else {
      // console.log('Entré a mi lugar correcto')
      return false
    }
  } catch (error) {
    // console.log('Hubo un error: ', error)
    window.location.href = '/'
  }
}
