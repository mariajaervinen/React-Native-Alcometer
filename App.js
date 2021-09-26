import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';




export default function App() {

  const [weight, setWeight]= useState(0);
  const [bottles, setBottles]= useState(1);
  const [time, setTime]= useState(1);
  const [gender, setGender]= useState('male');
  const [promilles, setPromilles]= useState(0);

  const genders =[
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  const amount = [
    {label: '1 bottle', value: 1},
    {label: '2 bottles', value: 2},
    {label: '3 bottles', value: 3},
    {label: '4 bottles', value: 4},
    {label: '5 bottles', value: 5},
    {label: '6 bottles', value: 6},
    {label: '7 bottles', value: 7},
    {label: '8 bottles', value: 8},
    {label: '9 bottles', value: 9},
    {label: '10 bottles', value: 10}
  ];

  const hours = [
    {label: '1 hour', value: 1},
    {label: '2 hours', value: 2},
    {label: '3 hours', value: 3},
    {label: '4 hours', value: 4},
    {label: '5 hours', value: 5},
    {label: '6 hours', value: 6},
    {label: '7 hours', value: 7},
    {label: '8 hours', value: 8},
    {label: '9 hours', value: 9},
    {label: '10 hours', value: 10}
  ];
  
  function calculate(){
    console.log(time)
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - burning * time;
    
    let promillesMale = gramsLeft / (weight * 0.7);
    let promillesFemale = gramsLeft / (weight * 0.6);
    
    if (gender === 'male'){
      setPromilles(promillesMale);
      if(promillesMale < 0 ){
        setPromilles(0);
      }
    }else{
      setPromilles(promillesFemale);
      if(promillesFemale < 0 ){
        setPromilles(0);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>

        <Text>Weight</Text>
        <TextInput style={styles.input}
        onChangeText={text => setWeight(text)}
        placeholder="in kg"
        keyboardType='numeric'>
        </TextInput>

      </View>

      <View style={styles.field}>
        <Text>Bottles</Text>
        <Picker style={styles.picker}
        onValueChange={(itemValue) => setBottles(itemValue)}
        selectedValue={bottles}>
          
          {amount.map((amount,index)=>(
            <Picker.Item key={index} label={amount.label} 
            value={amount.value}/>
            ))
          }
        </Picker>
      </View>

      <View style={styles.field}>
        <Text>Time</Text>
        <Picker style={styles.picker}
        onValueChange={(itemValue) => setTime(itemValue)}
        selectedValue={time}>
          
          {hours.map((hours,index)=>(
            <Picker.Item key={index} label={hours.label} 
            value={hours.value}/>
            ))
          }
        </Picker>
      </View>

      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm 
        style={styles.radio}
        buttonSize = {10}
        radio_props={genders}
        initial={0}
        onPress={(value) => {setGender(value)}}
        />
        <Text>Promilles</Text>
        <Text>{promilles.toFixed(2)}</Text>
      </View>
      <Button onPress={calculate} title='Calculate'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  field:{
    margin:10,
  },
  input:{
    marginLeft: 10,
  },
  radio:{
    marginTop: 10,
    marginBottom: 10,
  }, 
  picker:{
    width:200,
  },
  
});
