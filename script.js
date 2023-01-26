const byId = (selector) => document.getElementById(selector)
const byClass = (selector) => document.getElementByClass(selector)
const getCode = (selector) => parseInt(selector.charCodeAt(0)) - 97

const liEnkrip = byId("li-enkrip")
const liDekrip = byId("li-dekrip")
const linkEnkrip = byId("link-enkrip")
const linkDekrip = byId("link-dekrip")
const btnEnkrip = byId("btn-enkrip")
const btnDekrip = byId("btn-dekrip")
const plaintextIn = byId("plaintext")
const keyIn = byId("key")
const ciphertextIn = byId("ciphertext")

const keyGenerator = (key, text) => {
  const textArr = text.split("")
  const textLen = text.length
  const keyLen = key.length
  const result = textArr.map((x, i) => {
    return key[(keyLen + i) % keyLen]
  })
  return result.join("")
}

btnEnkrip.addEventListener('click', (e) => {
  e.preventDefault()
  ciphertextIn.innerHTML = ""
  const plain = plaintextIn.value.toLowerCase()
  const keyTemp = keyIn.value.toLowerCase()
  const key = keyGenerator(keyTemp, plain)
  const result = plain.split("").map((x, i) => {
    const plainTemp = getCode(plain[i])
    const keyTemp = getCode(key[i])
    const resTemp = parseInt((plainTemp + keyTemp) % 26) + 97
    return String.fromCharCode(resTemp)
  }).join("")
  ciphertextIn.innerHTML = result
})

btnDekrip.addEventListener('click', (e) => {
  e.preventDefault()
  plaintextIn.innerHTML = "result"
  const cipher = ciphertextIn.value.toLowerCase()
  const keyTemp = keyIn.value.toLowerCase()
  const key = keyGenerator(keyTemp, cipher)
  const result = cipher.split("").map((x, i) => {
    const cipherTemp = getCode(cipher[i])
    const keyTemp = getCode(key[i])
    const resTemp = parseInt((cipherTemp - keyTemp) % 26) + 97
    return String.fromCharCode(resTemp)
  }).join("")
  plaintextIn.innerHTML = result
})


linkDekrip.addEventListener('click', e => {
	e.preventDefault()
  liDekrip.classList.add('active')
  liEnkrip.classList.remove('active')
  btnEnkrip.classList.add('d-none')
  btnDekrip.classList.remove('d-none')
  plaintextIn.setAttribute('disabled', 'true')
  ciphertextIn.removeAttribute('disabled')
})

linkEnkrip.addEventListener('click', e => {
	e.preventDefault()
  liEnkrip.classList.add('active')
  liDekrip.classList.remove('active')
  btnEnkrip.classList.remove('d-none')
  btnDekrip.classList.add('d-none')
  ciphertextIn.setAttribute('disabled', 'true')
  plaintextIn.removeAttribute('disabled')
})