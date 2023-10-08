import * as React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';


const includeExtra = true;

export default function ImageInput({ form, onChange }: any) {
  const [response, setResponse] = React.useState<any>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        {form.foto &&
          Array.isArray(form.foto) && form.foto.map((uri: string) =>
            <View key={uri} style={[styles.imageContainer, styles.imageMargin]}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{ uri: uri }}
              />
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const imageMargin = 8; // Define a margem entre as imagens
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
  scrollViewContent: {
    flexDirection: 'row',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageMargin: {
    marginRight: imageMargin,
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