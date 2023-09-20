
import React, { useState, useEffect } from 'react';
import { UsuariosComponente } from "../components/Usuarios";
import { apiurl } from '../Helpers/ApiUrl';
import { CustomButton } from '../components/Common/Button';
import { Text, View } from 'react-native';



export const UpdateUsu = ({ route, navigation }: any) => {

    const { id } = route.params
    const [form, onChangeForm] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone1: "",
        telefone2: "",
        matricula: "",
        cpf: "",
        foto: [],
        senha: "",

    })
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
    const onChangeText = (name: string, value: string) => {
        onChangeForm({ ...form, [name]: value });


    };
    function validarVazio(nome: string, sobrenome: string, email: string, telefone1: string, matricula: string, cpf: string, senha: string) {
        if (!nome || !sobrenome || !email || !telefone1 || !matricula || !cpf || !senha) {
            setValida(true)
            return true
        }
        setValida(false)
        return false
    }
    function validaTextoSemNmr(nome: string, sobrenome: string) {
        const textoRegex = /^[a-zA-Z]+$/;
        if (!textoRegex.test(nome) || !textoRegex.test(sobrenome)) {
            setValidarTexto(true)
            return true
        }
        setValidarTexto(false)
        return false
    }

    function validarTelefone(telefone: string) {
        const celularRegex = /^\d{11}$/;
        if (!celularRegex.test(telefone)) {
            setValidarTelefoneCelular(true)
            return true
        }
        setValidarTelefoneCelular(false)
        return false
    }
    function validarTelefoneFixo(telefone: string) {
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

    }

    function validarSenha(senha: string) {
        if (senha.length <= 10 || senha.length >= 20) {
            setValidaSenha(true);
            return true
        }
        setValidaSenha(false)
        return false
    }
    function validarSenhaRegex(senha: string) {
        const senhaRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
        if (!senhaRegex.test(senha)) {
            setValidaSenhaRegex(true);
            return true
        }
        setValidaSenhaRegex(false)
        return false
    }
    function validarEmail(email: string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setVlidarEmailRegex(true)
            return true
        }
        setVlidarEmailRegex(false)
        return false
    }
    function validarMatricula(matricula: string) {
        if (matricula.length < 5) {
            setValidarMatricula(true)
            return true
        }
        setValidarMatricula(false)
        return false
    }
    function validarMatriculaRegex(matricula: string) {
        const matriculaRegex = /^\d{5,15}$/;
        if (!matriculaRegex.test(matricula)) {
            setValidarMatriculaRegex(true)
            return true
        }
        setValidarMatriculaRegex(false)
        return false
    }
    function validarCpfRegex(cpf: string) {
        const CPFRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!CPFRegex.test(cpf)) {
            setValidarCpfRegex(true)
            return true
        }
        setValidarCpfRegex(false)
        return false
    }


    function getUsuario() {

        const url = apiurl + '/user/list/' + id;
        console.log(url)

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data !== null) {
                    console.log(data.foto);

                    // Atualize os campos do formulário com os dados obtidos
                    onChangeForm({
                        ...form,
                        nome: data.nome || "",
                        sobrenome: data.sobrenome || "",
                        email: data.email || "",
                        telefone1: data.telefone1 || "",
                        telefone2: data.telefone2 || "",
                        matricula: data.matricula || "",
                        cpf: data.cpf || "",
                        foto: data.foto || [],
                        senha: data.senha || ""
                    });

                }
                console.log(data)
            });


    }


    useEffect(() => {
        getUsuario();
    }, []);



    function updateUsuario() {

        const url = apiurl + "/user/update/" + id;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(form)

        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data.error) {
                    console.log("Erro");

                } else {
                    console.log("Usuário alterado");
                    navigation.navigate("Usuários", { userAlterado: true });

                }
            })
    }

    function deletarUsuario() {
        let url = apiurl + "/user/delete"
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: id })
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                console.log("Erro");

            } else {
                console.log('Usuário deletado');
                navigation.navigate("Usuários", { userDeletado: true });


            }

        })
    }

    return (
        <>
            <UsuariosComponente
                form={form}
                onChangeText={onChangeText}
                onPress={updateUsuario}
                title={'Alterar'}
                title2={'Deletar'}
                color2={'red'}
                onpress2={deletarUsuario}
                color={'steelblue'}


            />
        </>

    );
};

