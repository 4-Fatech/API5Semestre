import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import MostrarImagem from "../../components/Common/ImageInput/MostrarImagem";
import { Label } from "../../components/Common/Label/Label";
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../../components/Common/Button";
import { UsuariosComponente } from "../../components/Usuarios";
import { GlobalContext } from "../../Context/GlobalProvider";
import { apiurl } from "../../Helpers/ApiUrl";
import LoadingComponent from "../../components/Common/Loading/Loading";
import { TextComponent } from "../../components/Common/Texto/TextComponent";
import { TextocTiutloComponent } from "../../components/Common/Texto/TextocTituloComponent";
import { TextTelefone } from "../../components/Common/Texto/TextTelefone";


export const Perfil = () => {
    const context = useContext(GlobalContext);
    const token = context?.token || "";
    const [mostrarApenasTexto, setMostrarApenasTexto] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const { user }: any = useContext(GlobalContext)


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
        const celularRegex = /\+\d{13}/;
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
    const onChangeText = (name: string, value: string) => {
        onChangeForm({ ...form, [name]: value });
    };
    const editar = () => {
        setMostrarApenasTexto(true);
    }
    const cancelar = () => {
        setMostrarApenasTexto(false);
    }

    const editarUsu = () => {
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
        const url = apiurl + "/user/updatePerfil/" + user.id;

        setLoadingButton(true)
        fetch(url, {
            method: 'PATCH',
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
                        'Alterar usuário',
                        'Erro ao alterar usuário.',
                        [

                            {
                                text: 'OK', onPress: () => setMostrarApenasTexto(false)
                            },
                        ],
                        { cancelable: false }
                    );

                } else {
                    var newForm = {
                        nome: data.nome,
                        sobrenome: data.sobrenome,
                        email: data.email,
                        telefone1: data.telefone1,
                        telefone2: data.telefone2,
                        matricula: data.matricula,
                        cpf: data.cpf,
                        foto: data.foto,
                        senha: data.senha,

                    }
                    onChangeForm(newForm)
                    Alert.alert(
                        'Alterar usuário',
                        'Usuário alterado com sucesso.',
                        [

                            {
                                text: 'OK', onPress: () => setMostrarApenasTexto(false)
                            },
                        ],
                        { cancelable: false }
                    );


                }
            })
            .finally(() => setLoadingButton(false))

    }

    const showAlertUpdate = () => {
        Alert.alert(
            'Alterar usuário',
            'Deseja alterar este usuário?',
            [
                {
                    text: 'NÃO',
                    onPress: () => '',
                    style: 'cancel',
                },
                { text: 'SIM', onPress: () => editarUsu() },
            ],
            { cancelable: false }
        );
    };

    const showAlertCancelar = () => {
        cancelar()

    };

    useEffect(() => {
        setLoading(true)
        var newForm = {
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            telefone1: user.telefone1,
            telefone2: user.telefone2,
            matricula: user.matricula,
            cpf: user.cpf,
            foto: user.foto,
            senha: '',

        }
        onChangeForm(newForm)
        setLoading(false)

    }, []);
    return (
        <>
            {
                loading ?
                    <LoadingComponent />
                    :
                    <>
                        {mostrarApenasTexto ? (
                            <>
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
                                    <Text style={{ color: "red", paddingLeft: 12 }}>O número do celular deve conter o DDI, DDD e ao menos 9 números.</Text>
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
                                    <Text style={{ color: "red", paddingLeft: 12 }}>O CPF deve conter o padrão xxx.xxx.xxx-xx e não pode possuir letras.</Text>
                                    : ""
                                }
                                <ScrollView>
                                    <UsuariosComponente
                                        form={form}
                                        onChangeText={onChangeText}
                                        onPress={loading ? null : showAlertUpdate}
                                        onpress2={loading ? null : showAlertCancelar}
                                        title={loadingButton ? <ActivityIndicator color={'white'} /> : 'Alterar'}
                                        title2={'Cancelar'}
                                        corTexto={'black'}
                                        color={'#4682B4'}
                                        color2={'#87CEFA'}
                                        color4={'#ff524a'}
                                        color3={'#ff4627'}
                                        corTexto2={'white'}
                                        perfil={1}
                                    />
                                </ScrollView>
                            </>

                        ) :
                            <ScrollView>
                                <View style={styles.alinhamentoCentro}>
                                    <ScrollView style={styles.imagens}>
                                        <MostrarImagem
                                            form={form}
                                        />
                                    </ScrollView>
                                </View>
                                <View style={styles.alinhamentoCentro}>
                                    <View style={styles.container1}>
                                        <TextComponent styleTexto={{ color: '#000000', textAlign: 'center', lineHeight: 28 }} nome={user.nome + " " + user.sobrenome} styleDiv={styles.campoNomeSobrenome} />
                                    </View>
                                </View>
                                <View style={styles.alinhamentoCentro}>
                                    <TextocTiutloComponent nome={user.email} styleDiv={styles.campoSerial} estiloTexto={{ color: '#000000', textAlign: 'left', lineHeight: 28, marginLeft: 5 }} styleDiv2={styles.container} titulo="E-mail:" />
                                </View>
                                <View style={styles.alinhamentoCentro}>
                                    <ScrollView
                                        horizontal={true}
                                        contentContainerStyle={styles.scrollViewContent}
                                    >
                                        <View style={styles.containerTelefones}>
                                            <TextTelefone nome={user.telefone1} estiloTexto={styles.telefones} styleDiv2={styles.container2} titulo="Telefone Celular:" />
                                            <TextTelefone nome={user.telefone2} estiloTexto={styles.telefones} titulo="Telefone Fixo/recado:" styleDiv2={styles.container2} />
                                        
                                        </View>
                                    </ScrollView>
                                </View>
                                <View style={styles.alinhamentoCentro}>
                                    <TextocTiutloComponent nome={user.matricula} styleDiv={styles.campoSerial} estiloTexto={{ color: '#000000', textAlign: 'left', lineHeight: 28, marginLeft: 5 }} styleDiv2={styles.container} titulo="Matrícula:" />
                                </View>
                                <View style={styles.alinhamentoCentro}>
                                    <TextocTiutloComponent nome={user.cpf} styleDiv={styles.campoSerial} estiloTexto={{ color: '#000000', textAlign: 'left', lineHeight: 28, marginLeft: 5 }} styleDiv2={styles.container} titulo="CPF:" />
                                </View>
                                <View style={styles.alinhamentoCentro}>
                                    <View style={styles.ativarDesativar}>
                                        <CustomButton title="Editar" corTexto="#000000" onPress={editar} color='#9ACD32' color2="#94C021" />
                                    </View>
                                </View>
                            </ScrollView>
                        }
                    </>
            }



        </>
    );
};

const styles = StyleSheet.create({
    alinhamentoCentro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagens: {
        width: 250
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 80,
        marginTop: 10,
    },
    scrollViewContent: {
        flexDirection: 'row',
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginTop: 5
    },
    containerTelefones: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 296,
        height: 50,
        marginTop: 20,
        padding: 5
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    campoNomeSobrenome: {
        width: 'auto',
        height: 30,
        alignItems: 'center',
        borderColor: 'black',
    },
    campoSerial: {
        borderColor: 'black',
        borderWidth: 1 ,
        width: 296,
        borderRadius: 8,
        height: 30,
    },
    telefones: {
        color: '#5A6BFF',
    },
    campoObservacao: {
        borderColor: "#000000",
        width: 296,
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginTop: 8,
    },
    ativarDesativar: {
        height: 'auto',
        width: 'auto',
        marginTop: 30,
    },
    cancelarEditar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        marginTop: 30,
    },
    divTexto: {
        textAlign: 'left'
    }
});
