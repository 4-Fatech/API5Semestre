import React from "react";
import { EquipamentosComponente } from "../components/Equipamentos";
import { blue } from "react-native-reanimated";

export const Equipamentos = () => {
    const [form, onChangeForm] = React.useState({
            serial: '',
            latitude: '',
            longitude:'',
            observacoes : '',
            foto : [],
            status : '',
            tipo:"",
            modelo:""
    })
    const onChangeText = (name:any, value:any) => {
        onChangeForm({...form, [name]: value});
      
      };

    function cadastrar() {
      console.log(form)
            const url = "http://10.0.2.2:3001/equipment/create";     
            fetch(url, {
                method: 'POST',
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
                        console.log("Usuário cadastrado");
                        console.log(data)
    
                    }
                })
        
    }
    

    return (
        <EquipamentosComponente
         form={form}
         onChangeText={onChangeText}
         onPress={cadastrar}
         title={'Cadastrar'}
         color={'steelblue'}
         
        />
        
    );
};
