import React from "react";
import { EquipamentosComponente } from "../components/Equipamentos";
import { blue } from "react-native-reanimated";

export const Equipamentos = () => {
    const [form, onChangeForm] = React.useState({
        tipoEquipamento:"",
        modeloEquipamento:"",
        nSerie:"",
        latitude:"",
        longitude:"",
        obs:""


    })
    const onChangeText = (name:any, value:any) => {
        onChangeForm({...form, [name]: value});
        console.log(form)
      };

    function cadastrar() {
        console.log("Oi");
        
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
