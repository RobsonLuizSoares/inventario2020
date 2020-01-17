
labelsBens = [
  { id: 'pendente', name: 'Pendente' },
  { id: 'ok', name: 'Bens Lidos' }
]

labelsTermo = [
  { id: 'pendente', name: 'Pendente' },
  { id: 'ok', name: 'Termo Entregue' }
]

labelGrupo = [
  { id: '1', name: 'Presidência' },
  { id: '2', name: 'Corregedoria' },
  { id: '3', name: 'Procuradoria' },
  { id: '4', name: 'EJESC' },
  { id: '5', name: 'DG' },
  { id: '6', name: 'SAO' },
  { id: '7', name: 'SGP' },
  { id: '8', name: 'STI' },
  { id: '9', name: 'SJ' },
  { id: '10', name: 'ZE' },
]


const home = async ({ Unidade }, req, res) => {
  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidades = await Unidade.find()
  res.render('unidades/home', { unidades, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const todasUnidades = async ({ Unidade }, req, res) => {
  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidades = await Unidade.find()
  res.render('unidades/todasUnidades', { unidades, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const novaForm = async ({ Unidade }, req, res) => {
  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))
  res.render('unidades/novaUnidade', { erro: [], totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const novaProcess = async ({ Unidade }, req, res) => {
  /* const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' }) 
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))*/

  const unidade = await new Unidade(req.body)
  try {
    await unidade.save()
    res.redirect('/unidades')
  } catch (e) {
    res.render('unidades/novaUnidade', {
      erro: Object.keys(e.errors)
    })
  }
}

const excluir = async ({ Unidade }, req, res) => {

  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const remove = await Unidade.remove({
    _id: req.params.id
  })
  res.redirect('/unidades', { totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const editarForm = async ({ Unidade }, req, res) => {

  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidade = await Unidade.findById({
    _id: req.params.id
  })
  res.render('unidades/editarUnidade', { totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk, unidade, labelsBens, labelsTermo, erro: [] })
}

const editarProcess = async ({ Unidade }, req, res) => {

  // const totalUnidades = await Unidade.countDocuments()
  //const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  //const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  // const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  // const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  // const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  //const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  //const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  // const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidade = await Unidade.findById({ _id: req.params.id })
  unidade.nome = req.body.nome
  unidade.responsavel = req.body.responsavel
  unidade.ul = req.body.ul
  unidade.grupo = req.body.grupo
  unidade.bens = req.body.bens
  unidade.termo = req.body.termo
  await unidade.save()
  res.redirect('/unidades')

}

const info = async ({ Unidade }, req, res) => {

  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidade = await Unidade.findById({ _id: req.params.id })
  res.render('unidades/infoUnidade', { unidade, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk, labelGrupo })
}

const addComentario = async ({ Unidade }, req, res) => {

  //const totalUnidades = await Unidade.countDocuments()
  //const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  //const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  //const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  //const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  //const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  //const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  //const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  //const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  await Unidade.findByIdAndUpdate({ _id: req.params.id }, { $push: { comentario: req.body.comentario } })
  res.redirect('/unidades/info/' + req.params.id)
}

const grupos = async ({ Unidade }, req, res) => {
  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  const unidades = await Unidade.find({ grupo: req.params.grupo, $or: [{ termo: 'pendente' }, { bens: 'pendente' }] }).sort({ nome: 1 })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  res.render('unidades/gruposUnidades', { unidades, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk, labelGrupo })
}

const unidadeComPendenciaTermo = async ({ Unidade }, req, res) => {

  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidades = await Unidade.find({ grupo: req.params.grupo, termo: 'pendente' }).sort({ nome: 1 })
  res.render('unidades/pendencias', { unidades, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const unidadeSemPendenciaTermo = async ({ Unidade }, req, res) => {

  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidades = await Unidade.find({ grupo: req.params.grupo, termo: 'ok' }).sort({ nome: 1 })
  res.render('unidades/pendencias', { unidades, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const unidadesComPendenciaBens = async ({ Unidade }, req, res) => {

  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidades = await Unidade.find({ grupo: req.params.grupo, bens: 'pendente' }).sort({ nome: 1 })
  res.render('unidades/pendencias', { unidades, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const unidadeSemPendenciaBens = async ({ Unidade }, req, res) => {

  const totalUnidades = await Unidade.countDocuments()
  const unidadePendenteTermo = await Unidade.countDocuments({ termo: 'pendente' })
  const unidadeTermoOk = await Unidade.countDocuments({ termo: 'ok' })
  const unidadeBensOk = await Unidade.countDocuments({ bens: 'ok' })
  const unidadesGrupo = await Unidade.countDocuments({ grupo: req.params.grupo })
  const bensOk = await Unidade.countDocuments({ grupo: req.params.grupo, bens: 'ok' })
  const termoOk = await Unidade.countDocuments({ grupo: req.params.grupo, termo: 'ok' })
  //const unidades = await Unidade.find({ grupo: req.params.grupo })
  const percentualTermo = Math.floor(parseInt(termoOk * 100 / unidadesGrupo))
  const percentualBens = Math.floor(parseInt(bensOk * 100 / unidadesGrupo))

  const unidades = await Unidade.find({ grupo: req.params.grupo, bens: 'ok' }).sort({ nome: 1 })
  res.render('unidades/pendencias', { unidades, totalUnidades, percentualTermo, percentualBens, unidadePendenteTermo, unidadeTermoOk, unidadeBensOk })
}

const unidadesOk = async ({ Unidade }, req, res) => {
  const unidades = await Unidade.find({ $and: [{ termo: 'ok' }, { bens: 'ok' }] }).sort({ nome: 1 })
  res.render('unidades/unidadesOk', { unidades })
}
const ok = async ({ Unidade }, req, res) => {
  const unidadesTerminadas = await Unidade.find({ grupo: req.params.grupo, $and: [{ termo: 'ok' }, { bens: 'ok' }] }).sort({ nome: 1 })
  res.render('unidades/grupoOk', { unidadesTerminadas })
}


module.exports = {
  home, novaForm, novaProcess,
  excluir, editarForm, editarProcess,
  info, addComentario, grupos, ok, unidadesOk,
  todasUnidades, unidadeComPendenciaTermo, unidadeSemPendenciaTermo, unidadesComPendenciaBens, unidadeSemPendenciaBens
}