import * as React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import DemoButton from './DemoButton';
import ImgToBase64 from 'react-native-image-base64';

const includeExtra = true;

export default function ImageInput({ form, onChange }: any) {
  const [response, setResponse] = React.useState<any>(null);

  const onButtonPress = ((type: string, options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, res => {
        ImgToBase64.getBase64String(res.assets?.[0].uri)
          .then((base64String: any) => {
            let pic = 'data:' + res.assets?.[0].type + ';base64,' + base64String;
            onChange("foto", [...(form.foto || []), pic])
            setResponse(res)
          })
          .catch((err: any) => console.log(err));
      });
    } else {
      ImagePicker.launchImageLibrary(options, res => {
        ImgToBase64.getBase64String(res.assets?.[0].uri)
          .then((base64String: any) => {
            let pic = 'data:' + res.assets?.[0].type + ';base64,' + base64String;
            onChange("foto", [...(form.foto || []), pic])
            setResponse(res)
          })
          .catch((err: any) => console.log(err));
      });
    }
  });
  const handleDeleteImage = (index: any) => {
    if (Array.isArray(form.foto) && index >= 0 && index < form.foto.length) {      
      const updatedFoto = [...form.foto.slice(0, index), ...form.foto.slice(index + 1)];
      onChange("foto", updatedFoto);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({ title, type, options }) => {
            return (
              <DemoButton
                key={title}
                onPress={() => onButtonPress(type, options)}>
                {title}
              </DemoButton>
            );
          })}
        </View>
        {form.foto &&
          Array.isArray(form.foto) && form.foto.map((uri: any) =>
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{ uri: uri }}
              />

              <TouchableOpacity
                onPress={() => handleDeleteImage(form.foto.indexOf(uri))}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Remover</Text>
              </TouchableOpacity>

            </View>

          )
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  deleteButton: {
    backgroundColor:  '#94C021',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  deleteButtonText: {
    color: 'black',
    textAlign: 'center',
  }
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Capturar Imagem',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Selecionar Imagem',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  }
];