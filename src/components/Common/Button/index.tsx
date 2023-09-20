import React from "react";
import {StyleSheet, Text, Pressable, ViewStyle, TextStyle} from 'react-native';

interface ButtonProps {
    title: string,
    onPress: any,
    color: string
}

export const CustomButton: React.FC<ButtonProps> = ({ title, onPress, color }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? color : 'steelblue',
                },
                styles.container,
              ]}>
        
            <Text>{title}</Text>
        </Pressable >
        // <Button
        //     borderRadius= '2'
        //     color={color}
        //     title={title}
        //     onPress={onPress}

        // ></Button>
    );
}

interface Styles {
    container: ViewStyle;
    text: TextStyle;
  }
  
const styles = StyleSheet.create<Styles>({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      minWidth: '45%',
      marginHorizontal: 8,
      marginVertical: 4,
      borderRadius: 8,
    },
    text: {
      textAlign: 'center',
      color: 'white',
    },
  });


