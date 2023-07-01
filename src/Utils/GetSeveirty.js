export default function GetSeverity (statusCode, setSeverity) {
  if (statusCode < 210) {
    setSeverity('success')
  } else if (statusCode < 500) {
    setSeverity('warning')
  } else {
    setSeverity('error')
  }
}
