//@ts-check
/**
 * @type {HTMLButtonElement}
 */
const SubmitButton = document.querySelector('#btn')
/**
 * @type{HTMLInputElement}
 */
const URLinput = document.querySelector('.URL-input')
/**
 * @type{HTMLSelectElement}
 */
const select = document.querySelector('.opt')
const serverURL = 'http://localhost:4000'

SubmitButton.addEventListener('click', () => {
  const value = URLinput.value
  if (!value || !value.trim()) {
    alert('Enter YouTube URL')
  } else {
    if (select.value === 'mp3') {
      downloadByType(URLinput.value, 'downloadmp3')
    } else if (select.value === 'mp4') {
      downloadByType(URLinput.value, 'downloadmp4')
    }
  }
})

async function downloadByType(query, type = 'downloadmp4' || 'downloadmp3') {
  try {
    SubmitButton.classList.add('disabled')
    SubmitButton.disabled = true
    SubmitButton.setAttribute('disabled', 'true')
    const res = await fetch(`${serverURL}/${type}?url=${query}`)
    if (res.status === 200) {
      var a = document.createElement('a')
      a.href = `${serverURL}/${type}?url=${query}`
      a.setAttribute('download', '')
      a.click()
    } else if (res.status === 400) {
      alert('Invalid url')
    }
    SubmitButton.classList.remove('disabled')
    SubmitButton.disabled = false
  } catch (error) {
    console.error(error)
    SubmitButton.classList.remove('disabled')
    SubmitButton.disabled = false
    let message = ''
    if (error instanceof Error) {
      message = error.message
    }
    alert('there was an error ' + message)
  }
}
