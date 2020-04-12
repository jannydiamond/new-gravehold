const copyToClipboard = (json: string) => {
  window.navigator.clipboard.writeText(json)
}

export default copyToClipboard
