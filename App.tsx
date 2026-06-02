import { StyleSheet, Text, View,ScrollView, SafeAreaView, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import React, { useState } from 'react'

import * as YUP from 'yup'
import { Formik } from 'formik'
import  BouncyCheckbox  from 'react-native-bouncy-checkbox'


const passwordSchema=YUP.object().shape({
  passwordLength:YUP.number()
  .min(4,'password should be atleast of 4 character')
  .max(10,'password should be atmost of 10 character')
  .required('This password feild is required')
})

export default function App() {

  const [password,setpassword]=useState('')
  const [isPasswordGenerated,passwordGenerator]=useState(false)
  const [isString,checkString]=useState(false)
  const [islowerCase, setLowerCase]=useState(false)
  const [isUpperCase, setUpperCase]=useState(false)
  const [isSymbol, setSymbole]=useState(false) 
  const [isNumber, setNumber]=useState(false)

  const createPassword=(characters:string, passwordLength:number)=>{  
    let result='';
    for(let i=0;i<=passwordLength;i++){
        let characterIndex=Math.floor(Math.random()*characters.length)
        result +=characters.charAt(characterIndex)
    }
    return result;
  }

  const generatepasswordString=(passwordLength:number)=>{
      let characterList='';

      const upperCase='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const lowerCase='abcdefghijklmnopqrstuvwxyz'
      const digits='0123456789'
      const symbols='!@#$%^&*_+'

      if(islowerCase){
        characterList+=lowerCase;
      }
      if(isUpperCase){
        characterList+=upperCase;
      }
      if(isNumber){
        characterList+=digits;
      }
      if(isSymbol){
        characterList+=symbols;
      }

      const passResult=createPassword(characterList,passwordLength)
      setpassword(passResult);
      passwordGenerator(true);
  }


  const resetPassowrd=()=>{
      setpassword('');
      passwordGenerator(false);
      checkString(false);
      setLowerCase(false);
      setUpperCase(false);
      setNumber(false);
      setSymbole(false);

      return 0;
  }
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.mainContainer}>
          <View style={styles.headContainer}>
            <Text style={styles.formHead}>Password Generator</Text>
          </View>
        <View style={styles.formContainer}>
             <Formik
                initialValues={{ passwordLength:''}} 
                validationSchema={passwordSchema} //As it is to validate the password 
                onSubmit={values=>{
                  generatepasswordString(+values.passwordLength) //+converts the datatype to Number
                }} >
                {({
                  isValid,
                  touched,
                  errors,
                  handleChange,
                  handleReset,
                  handleBlur,
                  handleSubmit,
                  values
                   //Other goodies i.e events that are required to use would be included here
                 })=> (
                 <>
                 <View>
                    <View >
                      <View style={styles.inputCon}>
                        <TextInput 
                          style={styles.passLengthinput}
                          keyboardType='numeric'
                          placeholder='Enter length of the password here'
                          value={values.passwordLength}
                          onChangeText={handleChange('passwordLength')}
                       />
                      </View>
                    </View>
                    
                    <View style={styles.inputWrap}>
                      <View >
                        <BouncyCheckbox 
                          isChecked={islowerCase}
                          onPress={()=> setLowerCase(!islowerCase)}
                          fillColor='#d40d0d'
                       />
                      </View>
                      <View>
                        <Text style={styles.heading}>Include LowerCase</Text>
                      </View>
                    </View>
                    <View style={styles.inputWrap}>
                      <View>
                        <BouncyCheckbox 
                      isChecked={isUpperCase}
                      onPress={()=>setUpperCase(!isUpperCase)}
                      fillColor='#70d40d'
                       />
                      </View>
                      <View>
                        <Text style={styles.heading}>Include UpperCase</Text>
                      </View>
                    </View>
                    <View style={styles.inputWrap}>
                      <View>
                        <BouncyCheckbox 
                      isChecked={isNumber}
                      onPress={()=>setNumber(!isNumber)}
                      fillColor='#0ee7bc'
                       />
                      </View>
                      <View>
                        <Text style={styles.heading}>Include Number</Text>
                      </View>
                    </View>
                    <View style={styles.inputWrap}>
                      <View>
                        <BouncyCheckbox 
                      isChecked={isSymbol}
                      onPress={()=>setSymbole(!isSymbol)}
                      fillColor='#0dd487'
                       />
                      </View>
                      <View>
                        <Text style={styles.heading}>Include Symbol</Text>
                      </View>
                    </View>
                    <View style={styles.btnMainContainer}>
                      <View style={styles.BtnStyle}>
                        <TouchableOpacity
                          onPress={()=>{
                           resetPassowrd(),
                           handleReset()
                          }}>
                        <Text style={styles.btnText}>Reset</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.BtnStyle}>
                        <TouchableOpacity
                          disabled={!isValid}
                          onPress={handleSubmit}
                        >
                        <Text style={styles.btnText}>Generate Password</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                 </View>
                 </>
                )}
          </Formik>
        </View>
       <View style={styles.lastMainCard}>
        {
          isPasswordGenerated ?
          <View>
            <View style={[styles.elevation, styles.lastCard]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.result } selectable={true}>{password}</Text>
            </View>
            <View>
               <Text style={styles.description}>Long Press To Copy</Text>
            </View>
          </View>
              :null
        }
       </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    marginTop:150,
    paddingVertical:0,
    borderRadius:10,
    backgroundColor:'#fff',
    marginHorizontal:10
  },
  formContainer:{
    backgroundColor:'#5c42af',
  }, 
  inputCon:{
      backgroundColor:'#3a2386aa',
      borderRadius:20,
      marginVertical:15,
      marginHorizontal:15,
      color:'#ffffff'
  },
  headContainer:{
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:5,
    marginHorizontal:15,
  },
  formHead:{
    fontWeight:800,
    fontSize:30,
    color:'#5C42AF',

  },
  heading:{
    fontSize:20,
    fontWeight:400,
    marginHorizontal:15,
    color:'#fff'
  },
  passLengthinput:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:10
  },
  inputWrap:{
    flexDirection:'row',
    marginVertical:7,
    paddingHorizontal:3,
    marginHorizontal:10,
  },
  formAction:{
    color:'#fff',
  },
  btnMainContainer:{
    flexDirection:'row',
    marginTop:25,
    marginBottom:15,
    alignItems:'center',
    justifyContent:'space-between'
  },
  BtnStyle:{
    backgroundColor:'#ffffff',
    borderRadius:20,
    paddingHorizontal:10,
    marginHorizontal:10,
    elevation:0.5,
    shadowColor:'#000'
  },
  btnText:{
    color:'#5C42AF',
    fontWeight:'500',
    fontSize:25,
  },
  result:{
    fontSize:25,
    fontWeight:600,
    color:'#5C42AF',
    justifyContent:'center',
    textAlign:'center',
    paddingBottom:10
  },
  lastMainCard:{
    borderRadius:20,
    backgroundColor:'#fff',
    marginVertical:20,
    color:'#5C42AF'
  },
  lastCard:{
    borderRadius:10,
    marginHorizontal:20,
  },
  subTitle:{
    color:'#5C42AF',
    fontSize:25,
    fontWeight:300,
    paddingHorizontal:20,
    paddingTop:10,
    textDecorationLine:'underline',
    textDecorationStyle:'dotted'
    
  },
  description:{
    fontSize:15,
    textAlign:'center',
    color:'#5C42AF',
    marginTop:5
  },
  elevation:{
    elevation:0.1,
    shadowColor:'#414141'
  },

})