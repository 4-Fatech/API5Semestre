import React from "react";
import { EquipamentosComponente } from "../components/Equipamentos";

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

    return (
        <EquipamentosComponente
         form={form}
         onChangeText={onChangeText}
        />
        
    );
};
