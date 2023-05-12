//Selecciona los elementos del DOM que serán utilizados y los almacena en variables
const inputTextArea = document.querySelector('#inputTextArea');// Variable donde el usuario ingresará el texto original
const outputTextArea = document.querySelector('#outputTextArea');// Variable donde se mostrará el resultado (texto encriptado o desencriptado)
const CopyResult = document.querySelector('#CopyResult');// Botón para copiar el resultado al portapapeles
const banner = document.querySelectorAll('.banner');// Elementos de la clase "banner" que se esconden o muestran según corresponda

// Define un objeto con las letras que serán encriptadas y sus correspondientes códigos
const keys = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat'
};

// Expresión regular para encontrar y eliminar caracteres no permitidos en el campo de entrada de texto
const regex = /[W]|[áéíóúÁÉÍÓÚñÑ¿«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>?]|[A-Z]/g;
const styles = {
  show: 'block',
  hide: 'none',
};

// Agrega un event listener al inputTextArea que llama a la función validateText cada vez que el usuario ingresa texto
inputTextArea.addEventListener('keyup', validateText);
// Agrega un event listener al botón CopyResult que llama a la función copyResult cuando es presionado
CopyResult.addEventListener('click', copyResult);

function encrypt() {
    // Si el inputTextArea no está vacío, procede a encriptar el texto
  if (!inputTextArea.value) {
    return;
  }

  let encrypted = inputTextArea.value;
  // Recorre el objeto keys y reemplaza cada letra por su código correspondiente
  for (const [key, value] of Object.entries(keys)) {
    const regex = new RegExp(key, 'g');
    encrypted = encrypted.replace(regex, value);
  }
  // Llama a la función writeResult para mostrar el resultado en el outputTextArea
  writeResult(encrypted);
  // Limpia el contenido de inputTextArea
  inputTextArea.value = ""; 
}

function decrypt() {
  if (!inputTextArea.value) {
    return;
  }

  let decrypted = inputTextArea.value;
  // Recorre el objeto keys y reemplaza cada código por su letra correspondiente
  for (const [key, value] of Object.entries(keys)) {
    const regex = new RegExp(value, 'g');
    decrypted = decrypted.replace(regex, key);
  }
   // Llama a la función writeResult para mostrar el resultado en el outputTextArea
  writeResult(decrypted);
  inputTextArea.value = "";
}

// Escribe el resultado en el outputTextArea y mostrarlo en la pantalla
function writeResult(text) {
  outputTextArea.value = text;
  showOrHiddenTextOutput(styles.hide, styles.show);
}

//Copia el contenido del outputTextArea al portapapeles del usuario
function copyResult() {
    // Selecciona el contenido del outputTextArea
  outputTextArea.select();
  // Intenta copiar el contenido seleccionado al portapapeles utilizando el API Clipboard
  // Si el API no está disponible, utiliza el método execCommand del objeto document para copiar el contenido al portapapeles
  navigator.clipboard ? navigator.clipboard.writeText(outputTextArea.value) : document.execCommand('copy');
}

function validateText() {
    // Si el área de entrada de texto está vacía, oculta la salida y muestra un mensaje de banner.
  if (!inputTextArea.value) {
    showOrHiddenTextOutput(styles.show, styles.hide);
    return;
  }

  // Elimina cualquier carácter no deseado ingresado en el área de entrada de texto.
  inputTextArea.value = inputTextArea.value.replace(regex, '');
}

// Muestra o oculta elementos HTML en la página web según los parámetros de estilo.
function showOrHiddenTextOutput(style1, style2) {
    // Itera a través de todos los elementos con la clase "banner" y les cambia el estilo de visualización.
  banner.forEach(el => el.style.display = style1);
  // Cambia el estilo de visualización del área de salida y el botón de copia.
  outputTextArea.style.display = style2;
  CopyResult.style.display = style2;
}
