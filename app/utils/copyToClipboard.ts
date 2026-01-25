const fallbackCopyTextToClipboard = (text: string): boolean => {
  try {
    const elem = document.createElement('textarea')

    elem.value = text

    // Avoid scrolling to bottom
    elem.style.top = '0'
    elem.style.left = '0'
    elem.style.position = 'fixed'

    document.body.appendChild(elem)
    elem.focus()
    elem.select()

    document.execCommand('copy')
    document.body.removeChild(elem)

    return true
  } catch (_err: unknown) {
    return false
  }
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text)
  }

  try {
    await navigator.clipboard.writeText(text)

    return true
  } catch (e) {
    console.error(e)

    return false
  }
}
