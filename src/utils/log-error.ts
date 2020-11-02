export const logError = (...msgs: string[]) => {
  const message = msgs.join(' ')

  console.error(message)

  return new Error(message)
}
