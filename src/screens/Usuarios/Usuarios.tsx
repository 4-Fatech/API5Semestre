
import React, { useContext, useState } from "react";
import { UsuariosComponente } from "../../components/Usuarios";
import { Text, View, Alert, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { apiurl } from "../../Helpers/ApiUrl";
import { validador } from "../../utils/validador";
import { GlobalContext } from "../../Context/GlobalProvider";

export const Usuarios = ({ navigation }: any) => {
    const context = useContext(GlobalContext);
    const token = context?.token || "";
    const [form, onChangeForm] = React.useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone1: "",
        telefone2: "",
        matricula: "",
        cpf: "",
        foto: [],
        senha: "",
        profile: "admin"

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
    const [loading, setLoading] = useState(false);

    const onChangeText = (name: any, value: any) => {
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
        const celularRegex = /^\d{13}$/;
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
        if (senha.length < 9 || senha.length >= 20) {
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

    function cadastrarUsuario() {
        if (validarVazio(form.nome, form.sobrenome, form.email, form.telefone1, form.matricula, form.cpf, form.senha)) {
            return
        }
        if (validaTextoSemNmr(form.nome, form.sobrenome)) {
            return
        }
        if (validarEmail(form.email)) {
            return
        }
        if (validarTelefone(form.telefone1)) {
            return
        }
        if (validarTelefoneFixo(form.telefone2)) {
            return
        }
        if (validarMatricula(form.matricula)) {
            return
        }
        if (validarMatriculaRegex(form.matricula)) {
            return
        }
        if (validarCpfRegex(form.cpf)) {
            return
        }
        if (validarSenha(form.senha)) {
            return
        }
        if (validarSenhaRegex(form.senha)) {
            return
        }



        const url = apiurl + "/user/create";
        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)

        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data.error) {
                    Alert.alert(
                        'Cadastrar usuário',
                        'Erro ao cadastrar usuário.',
                        [

                            {
                                text: 'OK', onPress: () => console.log(data.error)
                            },
                        ],
                        { cancelable: false }
                    );

                } else {
                    Alert.alert(
                        'Cadastrar usuário',
                        'Usuário cadastrado com sucesso.',
                        [

                            {
                                text: 'OK', onPress: () => ''
                            },
                        ],
                        { cancelable: false }
                    );
                    navigation.navigate("Usuários", { userCadastrado: true });

                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function cancelar() {
        navigation.navigate("Usuários");

    }


    const showAlertCadastrar = () => {
        Alert.alert(
            'Cadastrar usuário',
            'Deseja cadastrar este usuário?',
            [
                {
                    text: 'NÃO',
                    onPress: () => '',
                    style: 'cancel',
                },
                { text: 'SIM', onPress: () => cadastrarUsuario() },
            ],
            { cancelable: false }
        );
    };


    return (
        <>
            <ScrollView style={styles.bg}>

                {valida ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>Campos com * são obrigatórios.</Text>
                    : ""
                }
                {validaSenha ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>A senha deve ter entre 10 e 20 caracteres.</Text>
                    : ""
                }
                {validaSenhaRegex ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>A senha deve conter uma letra maiúscula, um caractere especial e números entre 0 e 9.</Text>
                    : ""
                }
                {validarEmailRegex ?
                    <View>
                        <Text style={{ color: "red", paddingLeft: 12 }}>O e-mail deve conter os seguintes itens:</Text>
                        <Text style={{ color: "red", paddingLeft: 12 }}>Pelo menos um caractere antes do '@'</Text>
                        <Text style={{ color: "red", paddingLeft: 12 }}>Pelo menos um caractere antes do ponto '.' no domínio</Text>
                        <Text style={{ color: "red", paddingLeft: 12 }}>O domínio deve conter pelo menos duas letras (por exemplo, 'com', 'org', 'net')</Text>
                        <Text style={{ color: "red", paddingLeft: 12 }}>Não deve conter espaços em branco</Text>
                    </View>
                    : ""
                }
                {validarTexto ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>Nome ou sobrenome deve conter apenas letras.</Text>
                    : ""
                }
                {validaTelefoneCeleluar ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>O número do celular deve ter 11 números.</Text>
                    : ""
                }
                {validaTelefoneFixo ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>O telefone de recado deve ter 10 números.</Text>
                    : ""
                }
                {validaMatricula ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>A matricula deve conter no minimo 5 números.</Text>
                    : ""
                }
                {validaMatriculaRegex ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>A matricula deve conter apenas números.</Text>
                    : ""
                }
                {validaCpfRegex ?
                    <Text style={{ color: "red", paddingLeft: 12 }}>O CPF deve conter o padrão xxx.xxx.xxx-xx.</Text>
                    : ""
                }
                <UsuariosComponente
                    form={form}
                    onChangeText={onChangeText}
                    onPress={loading ? null : showAlertCadastrar}
                    onpress2={cancelar}
                    title2={'Cancelar'}
                    title={loading ? <ActivityIndicator color={'white'} /> : 'Cadastrar'}
                    corTexto={'black'}
                    color={'#9ACD32'}
                    color2={'#94C021'}
                    color4={'#ff2d15'}
                    color3={'#ff4627'}
                    perfil={0}
                />
            </ScrollView>
        </>


    );
};


const styles = StyleSheet.create({
    bg: {
      backgroundColor: '#1F303E'
  }
  
  })
