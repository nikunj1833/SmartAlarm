import React, { useEffect } from 'react';

import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SoundService from '../services/SoundService';
import { NativeModules } from 'react-native';

const { AlarmScheduler, AlarmControl } = NativeModules;

const AlarmScreen = ({ navigation, route }) => {

  const alarmTime =
    route?.params?.alarmTime || 'Wake Up';


  useEffect(() => {

    const backAction = () => {
      return true;
    };


    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );


    return () => backHandler.remove();

  }, []);


const stopAlarm = () => {

  SoundService.stopAlarm();

  if (AlarmControl) {
    AlarmControl.stopAlarm();
  }

  navigation.replace('Home');

};

 const snoozeAlarm = () => {

  SoundService.stopAlarm();

  if (AlarmControl) {
    AlarmControl.stopAlarm();
  }

  const snoozeTime =
    Date.now() + 5 * 60 * 1000;

  if (AlarmScheduler) {
    AlarmScheduler.scheduleAlarm(snoozeTime);
  }

  navigation.replace('Home');

};

  return (

    <SafeAreaView style={styles.container}>


      <View style={styles.top}>

        <Text style={styles.icon}>
          ⏰
        </Text>


        <Text style={styles.title}>
          Alarm Ringing
        </Text>


      </View>



      <View style={styles.center}>


        <Text style={styles.time}>
          {alarmTime}
        </Text>


        <Text style={styles.goodMorning}>
          Good Morning 🌅
        </Text>


        <Text style={styles.subtitle}>
          Your alarm is ringing...
        </Text>


      </View>



      <View style={styles.buttons}>


        <TouchableOpacity
          style={styles.snoozeButton}
          onPress={snoozeAlarm}
        >

          <Text style={styles.buttonText}>
            Snooze 5 min
          </Text>

        </TouchableOpacity>



        <TouchableOpacity
          style={styles.stopButton}
          onPress={stopAlarm}
        >

          <Text style={styles.buttonText}>
            STOP ALARM
          </Text>

        </TouchableOpacity>


      </View>


    </SafeAreaView>

  );
};


export default AlarmScreen;



const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#080808',
    paddingHorizontal:25,
    paddingTop:60,
    paddingBottom:40,
  },


  top:{
    alignItems:'center',
  },


  icon:{
    fontSize:70,
  },


  title:{
    marginTop:20,
    color:'#FF6B00',
    fontSize:28,
    fontWeight:'900',
  },


  center:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },


  time:{
    color:'#FFFFFF',
    fontSize:58,
    fontWeight:'900',
  },


  goodMorning:{
    marginTop:25,
    color:'#FFFFFF',
    fontSize:26,
    fontWeight:'800',
  },


  subtitle:{
    marginTop:12,
    color:'#888',
    fontSize:16,
  },


  buttons:{
    gap:15,
  },


  snoozeButton:{
    backgroundColor:'#222',
    padding:20,
    borderRadius:22,
    alignItems:'center',
  },


  stopButton:{
    backgroundColor:'#FF6B00',
    padding:20,
    borderRadius:22,
    alignItems:'center',
  },


  buttonText:{
    color:'#FFFFFF',
    fontSize:18,
    fontWeight:'900',
  },

});