import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import React from 'react';
export const InputPersonalizado = () => {
    return (
    <><Input
            placeholder='BASIC INPUT' /><Input
                placeholder='INPUT WITH ICON'
                leftIcon={{ type: 'font-awesome', name: 'chevron-left' }} /><Input
                placeholder='INPUT WITH CUSTOM ICON'
                leftIcon={<Icon
                    name='user'
                    size={24}
                    color='black' />} /><Input
                placeholder="Comment"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                /><Input
                placeholder='INPUT WITH ERROR MESSAGE'
                errorStyle={{ color: 'red' }}
                errorMessage='ENTER A VALID ERROR HERE' /><Input placeholder="Password" secureTextEntry={true} /></>
    );
}