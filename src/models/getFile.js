const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const stream = fs.createReadStream('./meu-arquivo.txt');
const formInfo = new FormData();
formInfo.append('file', stream);

 const formHeader = formInfo.getHeaders();
 const URL = 'http://localhost:3000/files';

 axios.post(URL, formInfo, { headers: { ...formHeader } })
  .then(() => console.log('Enviado com sucesso'));