
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 1, 2, 19, 23),
    dataCheckIn: new Date(2024, 1, 2, 20, 20)
  },

  {
    nome: "Nathan Lopes",
    email: 'nathanlopes@gmail.com',
    dataInscricao: new Date(2024, 3, 15, 14, 30), 
    dataCheckIn: null
  },
  {
    nome: "Mayane Brito",
    email: 'maybrito@gmail.com',
    dataInscricao: new Date(2024, 4, 20, 10, 0),
    dataCheckIn: null
  },
  {
    nome: "Noé Oliveira",
    email: 'Noéoliveira@gmail.com',
    dataInscricao: new Date(2024, 5, 5, 8, 45),
    dataCheckIn: new Date(2024, 5, 5, 10, 15)
  },
  {
    nome: "Maria Santos",
    email: 'maria@gmail.com',
    dataInscricao: new Date(2024, 6, 12, 16, 0),
    dataCheckIn: new Date(2024, 6, 12, 17, 30)
  },
  {
    nome: "José Lima",
    email: 'jose@gmail.com',
    dataInscricao: new Date(2024, 7, 25, 13, 10),
    dataCheckIn: new Date(2024, 7, 25, 14, 45)
  },
  {
    nome: "Ana Souza",
    email: 'ana@gmail.com',
    dataInscricao: new Date(2024, 8, 8, 11, 20),
    dataCheckIn: new Date(2024, 8, 8, 12, 35)
  },
  {
    nome: "Paulo Oliveira",
    email: 'paulo@gmail.com',
    dataInscricao: new Date(2024, 9, 19, 9, 0),
    dataCheckIn: new Date(2024, 9, 19, 10, 20)
  },
  {
    nome: "Mariana Silva",
    email: 'mariana@gmail.com',
    dataInscricao: new Date(2024, 10, 30, 18, 15),
    dataCheckIn: new Date(2024, 10, 30, 19, 40)
  },
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in 
      </button>
    `
  }

  return `
<tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
        ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
    .querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

 const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 
  if(confirm(mensagemConfirmacao) == false) {
    return
  } 
  

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
    )

  participante.dataCheckIn = new Date()
  
  atualizarLista(participantes)
}