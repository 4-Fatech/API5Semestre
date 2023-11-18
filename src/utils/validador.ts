import { useState } from "react";

const [valida, setValida] = useState(false)
const [validaSenha, setValidaSenha] = useState(false);
const [validaSenhaRegex, setValidaSenhaRegex] = useState(false)
const [validarEmailRegex, setVlidarEmailRegex] = useState(false)
const [validarTexto, setValidarTexto] = useState(false)
const [validaTelefoneCeleluar, setValidarTelefoneCelular] = useState(false)
const [validaTelefoneFixo, setValidarTelefoneFixo] = useState(false)
const [validaMatricula, setValidarMatricula] = useState(false)
const [validaMatriculaRegex, setValidarMatriculaRegex] = useState(false)
const [validaCpfRegex, setValidarCpfRegex] = useState(false)

export const validador = {
  validarVazio(nome: string, sobrenome: string, email: string, telefone1: string, matricula: string, cpf: string, senha: string) {
    if (!nome || !sobrenome || !email || !telefone1 || !matricula || !cpf || !senha) {
      setValida(true)
      return true
    }
    setValida(false)
    return false
  },
  validaTextoSemNmr(nome: string, sobrenome: string) {
    const textoRegex = /^[a-zA-Z]+$/;
    if (!textoRegex.test(nome) || !textoRegex.test(sobrenome)) {
      setValidarTexto(true)
      return true
    }
    setValidarTexto(false)
    return false
  },
  validarTelefone(telefone: string) {
    const celularRegex = /^\d{11}$/;
    if (!celularRegex.test(telefone)) {
      setValidarTelefoneCelular(true)
      return true
    }
    setValidarTelefoneCelular(false)
    return false
  },
  validarTelefoneFixo(telefone: string) {
    const regexTelefoneFixo = /^\d{10}$/;
    if (telefone) {
      if (!regexTelefoneFixo.test(telefone)) {
        setValidarTelefoneFixo(true)
        return true
      }
      setValidarTelefoneFixo(false)
      return false
    }
    setValidarTelefoneFixo(false)
    return false

  },
  validarSenha(senha: string) {
    if (senha.length <= 10 || senha.length >= 20) {
      setValidaSenha(true);
      return true
    }
    setValidaSenha(false)
    return false
  },
  validarSenhaRegex(senha: string) {
    const senhaRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    if (!senhaRegex.test(senha)) {
      setValidaSenhaRegex(true);
      return true
    }
    setValidaSenhaRegex(false)
    return false
  },
  validarEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setVlidarEmailRegex(true)
      return true
    }
    setVlidarEmailRegex(false)
    return false
  },
  validarMatricula(matricula: string) {
    if (matricula.length < 5) {
      setValidarMatricula(true)
      return true
    }
    setValidarMatricula(false)
    return false
  },
  validarMatriculaRegex(matricula: string) {
    const matriculaRegex = /^\d{5,15}$/;
    if (!matriculaRegex.test(matricula)) {
      setValidarMatriculaRegex(true)
      return true
    }
    setValidarMatriculaRegex(false)
    return false
  },
  validarCpfRegex(cpf: string) {
    const CPFRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!CPFRegex.test(cpf)) {
      setValidarCpfRegex(true)
      return true
    }
    setValidarCpfRegex(false)
    return false
  }
}
