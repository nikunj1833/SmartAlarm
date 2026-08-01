import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { useAlarm } from '../context/AlarmContext';
import { NativeModules } from 'react-native';
const { AlarmScheduler } = NativeModules;
const AddAlarm = ({ navigation }) => {
  const { addAlarm } = useAlarm();
  const [time, setTime] = useState(new Date());
  const [repeatDays, setRepeatDays] = useState([]);

  const [showPicker, setShowPicker] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    console.log('SELECTED TIME:', selectedTime);

    if (selectedTime) {
      setTime(selectedTime);
    }

    setShowPicker(false);
  };

  const formatTime = () => {
    return time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const toggleDay = day => {
    if (repeatDays.includes(day)) {
      setRepeatDays(repeatDays.filter(item => item !== day));
    } else {
      setRepeatDays([...repeatDays, day]);
    }
  };

  const saveAlarm = async () => {
    const now = new Date();

    const alarmTime = new Date();

    alarmTime.setHours(time.getHours());
    alarmTime.setMinutes(time.getMinutes());
    alarmTime.setSeconds(0);
    alarmTime.setMilliseconds(0);

    const newAlarm = {
      id: Date.now().toString(),
      time: alarmTime,
      enabled: true,
      repeat: repeatDays,
    };

    console.log('ALARM SET:', alarmTime);

    addAlarm(newAlarm);

    AlarmScheduler.scheduleAlarm(alarmTime.getTime());

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* BACK BUTTON */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Create Alarm</Text>

        {/* TIME PICKER */}

        <TouchableOpacity
          style={styles.timeCard}
          activeOpacity={0.8}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.time}>{formatTime()}</Text>

          <Text style={styles.label}>Tap to select time</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            is24Hour={false}
            onChange={onTimeChange}
          />
        )}

        {/* REPEAT DAYS */}

        <Text style={styles.sectionTitle}>Repeat</Text>

        <View style={styles.days}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayBox,
                repeatDays.includes(day) && styles.activeDay,
              ]}
              onPress={() => toggleDay(day)}
            >
              <Text style={styles.dayText}>{day.substring(0, 1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SAVE BUTTON */}

        <TouchableOpacity style={styles.saveButton} onPress={saveAlarm}>
          <Text style={styles.saveText}>Save Alarm</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    padding: 20,
  },

  backButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#181818',

    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },

  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 30,
  },

  timeCard: {
    marginTop: 40,
    backgroundColor: '#151515',

    borderRadius: 30,

    padding: 35,

    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#252525',
  },

  time: {
    color: '#FF6B00',
    fontSize: 58,
    fontWeight: '900',
  },

  label: {
    color: '#777',
    marginTop: 10,
    fontSize: 12,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',

    marginTop: 35,
  },

  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  dayBox: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: '#181818',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#303030',
  },

  dayText: {
    color: '#fff',
    fontWeight: '800',
  },
  saveButton: {
    marginTop: 45,
    backgroundColor: '#FF6B00',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  activeDay: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
});
export default AddAlarm;
