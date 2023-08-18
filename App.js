import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View,ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL')
  const [moedaDestino, setMoedaDestino] = useState('USD')
  const [valorConvertido, setValorConvertido] = useState('')
  const [valorOriginal, setValorOriginal] = useState('99.99999')

  const buscarHandle = async () => {
    let URL = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`
    try {
      let page = await fetch(URL)
      let json = await page.json()
      console.log(json)
      let indice = parseFloat(json[`${moedaOrigem}${moedaDestino}`].high)
      setValorConvertido(indice)
      console.log(indice)
    } catch (error) {
      setValorConvertido(`Erro: $error.message`)
    }
    // setValorConvertido(URL);
  }

  const limparResultado = ()=> {
    setValorConvertido('')
    setValorOriginal('33.3333')
    setMoedaOrigem('BRL')
    setMoedaDestino('USD')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titu}>Conversor de Moedas</Text>
      <View>
        <Text>Moeda 1</Text>
        <View style={styles.borda}>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={moedaOrigem}
          onValueChange={(itemValue, itemIndex) => setMoedaOrigem(itemValue)}
        >
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
        </View>
      </View>
      <View>
        <Text>Moeda 2</Text>
        <View style={styles.borda}>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={moedaDestino}
          onValueChange={(itemValue, itemIndex) => setMoedaDestino(itemValue)}
        >
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
        </View>
      </View>
      <View>
        <TextInput value={valorOriginal} onChangeText={setValorOriginal} keyboardType='numeric'/>
      </View>
      <Pressable onPress={buscarHandle}><Text>Buscar Valor</Text></Pressable>
      <Pressable onPress={limparResultado}><Text>Limpar Valor</Text></Pressable>
      <Text>{`Resultado: ${valorConvertido}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titu:{
    paddingBottom:12,
    fontSize:30,
    color:'#FF8DD0',
  },
  borda:{
    borderWidth:2,
    borderColor:'#FF8DD0',
  }
});
