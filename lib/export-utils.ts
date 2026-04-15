import * as XLSX from 'xlsx'
import type { CustoFixo, CustoVariavel, Servico, Cliente, Agendamento, CalculoFinanceiro, Comissao } from './types'

export function exportToExcel(data: any[], filename: string, sheetName: string = 'Dados') {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export function generateRelatorioFinanceiro(
  custosFixos: CustoFixo[],
  custosVariaveis: CustoVariavel[],
  servicos: Servico[],
  clientes: Cliente[],
  agendamentos: Agendamento[],
  financeiro: CalculoFinanceiro,
  comissoes: Comissao[]
) {
  const wb = XLSX.utils.book_new()

  // 1. Custos Fixos
  const custosFixosData = custosFixos.map(custo => ({
    'Nome': custo.nome,
    'Valor': custo.valor,
    'Descrição': custo.descricao,
    'Data de Criação': custo.createdAt ? new Date(custo.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  const wsCustosFixos = XLSX.utils.json_to_sheet(custosFixosData)
  XLSX.utils.book_append_sheet(wb, wsCustosFixos, 'Custos Fixos')

  // 2. Custos Variáveis
  const custosVariaveisData = custosVariaveis.map(custo => ({
    'Nome': custo.nome,
    'Valor': custo.valor,
    'Descrição': custo.descricao,
    'Data': custo.data ? new Date(custo.data).toLocaleDateString('pt-BR') : '',
    'Data de Criação': custo.createdAt ? new Date(custo.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  const wsCustosVariaveis = XLSX.utils.json_to_sheet(custosVariaveisData)
  XLSX.utils.book_append_sheet(wb, wsCustosVariaveis, 'Custos Variáveis')

  // 3. Serviços
  const servicosData = servicos.map(servico => ({
    'Nome': servico.nome,
    'Preço': servico.preco,
    'Duração (min)': servico.duracao,
    'Comissão (%)': servico.comissao,
    'Descrição': servico.descricao,
    'Data de Criação': servico.createdAt ? new Date(servico.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  const wsServicos = XLSX.utils.json_to_sheet(servicosData)
  XLSX.utils.book_append_sheet(wb, wsServicos, 'Serviços')

  // 4. Clientes
  const clientesData = clientes.map(cliente => ({
    'Nome': cliente.nome,
    'Email': cliente.email,
    'Telefone': cliente.telefone,
    'Status': cliente.status,
    'Data de Criação': cliente.createdAt ? new Date(cliente.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  const wsClientes = XLSX.utils.json_to_sheet(clientesData)
  XLSX.utils.book_append_sheet(wb, wsClientes, 'Clientes')

  // 5. Agendamentos
  const agendamentosData = agendamentos.map(agendamento => ({
    'Cliente': agendamento.clienteNome,
    'Serviço': agendamento.servicoNome,
    'Data': agendamento.data ? new Date(agendamento.data).toLocaleDateString('pt-BR') : '',
    'Horário': agendamento.horario,
    'Status': agendamento.status,
    'Valor': agendamento.valor,
    'Data de Criação': agendamento.createdAt ? new Date(agendamento.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  const wsAgendamentos = XLSX.utils.json_to_sheet(agendamentosData)
  XLSX.utils.book_append_sheet(wb, wsAgendamentos, 'Agendamentos')

  // 6. Resumo Financeiro
  const resumoFinanceiro = [{
    'Métrica': 'Total Custos Fixos',
    'Valor': financeiro.totalCustosFixos
  }, {
    'Métrica': 'Total Custos Variáveis',
    'Valor': financeiro.totalCustosVariaveis
  }, {
    'Métrica': 'Receita Atual',
    'Valor': financeiro.receitaAtual
  }, {
    'Métrica': 'Lucro/Prejuízo',
    'Valor': financeiro.lucroAtual
  }, {
    'Métrica': 'Total de Clientes',
    'Valor': clientes.length
  }, {
    'Métrica': 'Total de Agendamentos',
    'Valor': agendamentos.length
  }]
  const wsResumo = XLSX.utils.json_to_sheet(resumoFinanceiro)
  XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo Financeiro')

  // 7. Comissões
  const comissoesData = comissoes.map(comissao => ({
    'Funcionário': comissao.funcionarioNome,
    'Serviço': comissao.servicoNome,
    'Valor do Serviço': comissao.valorServico,
    'Comissão (%)': comissao.percentualComissao,
    'Valor da Comissão': comissao.valorComissao,
    'Data': comissao.data ? new Date(comissao.data).toLocaleDateString('pt-BR') : ''
  }))
  const wsComissoes = XLSX.utils.json_to_sheet(comissoesData)
  XLSX.utils.book_append_sheet(wb, wsComissoes, 'Comissões')

  // Gerar nome do arquivo com data
  const dataAtual = new Date().toISOString().split('T')[0]
  const filename = `relatorio-financeiro-${dataAtual}`

  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export function exportCustosFixos(custosFixos: CustoFixo[]) {
  const data = custosFixos.map(custo => ({
    'Nome': custo.nome,
    'Valor': custo.valor,
    'Descrição': custo.descricao,
    'Data de Criação': custo.createdAt ? new Date(custo.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  exportToExcel(data, 'custos-fixos', 'Custos Fixos')
}

export function exportCustosVariaveis(custosVariaveis: CustoVariavel[]) {
  const data = custosVariaveis.map(custo => ({
    'Nome': custo.nome,
    'Valor': custo.valor,
    'Descrição': custo.descricao,
    'Data': custo.data ? new Date(custo.data).toLocaleDateString('pt-BR') : '',
    'Data de Criação': custo.createdAt ? new Date(custo.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  exportToExcel(data, 'custos-variaveis', 'Custos Variáveis')
}

export function exportServicos(servicos: Servico[]) {
  const data = servicos.map(servico => ({
    'Nome': servico.nome,
    'Preço': servico.preco,
    'Duração (min)': servico.duracao,
    'Comissão (%)': servico.comissao,
    'Descrição': servico.descricao,
    'Data de Criação': servico.createdAt ? new Date(servico.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  exportToExcel(data, 'servicos', 'Serviços')
}

export function exportClientes(clientes: Cliente[]) {
  const data = clientes.map(cliente => ({
    'Nome': cliente.nome,
    'Email': cliente.email,
    'Telefone': cliente.telefone,
    'Status': cliente.status,
    'Data de Criação': cliente.createdAt ? new Date(cliente.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  exportToExcel(data, 'clientes', 'Clientes')
}

export function exportAgendamentos(agendamentos: Agendamento[]) {
  const data = agendamentos.map(agendamento => ({
    'Cliente': agendamento.clienteNome,
    'Serviço': agendamento.servicoNome,
    'Data': agendamento.data ? new Date(agendamento.data).toLocaleDateString('pt-BR') : '',
    'Horário': agendamento.horario,
    'Status': agendamento.status,
    'Valor': agendamento.valor,
    'Data de Criação': agendamento.createdAt ? new Date(agendamento.createdAt).toLocaleDateString('pt-BR') : ''
  }))
  exportToExcel(data, 'agendamentos', 'Agendamentos')
}