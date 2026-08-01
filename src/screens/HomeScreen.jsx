import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Switch,
} from 'react-native';
import { useAlarm } from '../context/AlarmContext';
import SoundService from '../services/SoundService';

const HomeScreen = ({ navigation }) => {
  const { alarms, deleteAlarm, updateAlarm } = useAlarm();
  const [currentTime, setCurrentTime] = useState(new Date());
  const triggeredAlarm = useRef(null);

useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();

    alarms.forEach(alarm => {
      if (!alarm.enabled) return;

      const alarmTime = new Date(alarm.time);

      const sameHour =
        alarmTime.getHours() === now.getHours();

      const sameMinute =
        alarmTime.getMinutes() === now.getMinutes();

      const sameSecond =
        now.getSeconds() === 0;


      if (
        sameHour &&
        sameMinute &&
        sameSecond &&
        triggeredAlarm.current !== alarm.id
      ) {

        triggeredAlarm.current = alarm.id;

        SoundService.playAlarm();

        navigation.navigate('AlarmScreen', {
          alarmId: alarm.id,
        });
      }

    });

  },1000);


  return () => clearInterval(interval);

},[alarms,navigation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTime = () => {
    return currentTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getDate = () => {
    return currentTime.toLocaleDateString([], {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  const toggleAlarm = alarm => {
    updateAlarm({
      ...alarm,
      enabled: !alarm.enabled,
    });
  };

  const renderAlarm = ({ item }) => (
    <View style={styles.alarmCard}>
      <View>
        <Text style={styles.alarmTime}>
          {item.time.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </Text>

        <Text style={styles.repeatText}>
          {item.repeat.length === 0 ? 'One Time' : item.repeat.join(', ')}
        </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Switch value={item.enabled} onValueChange={() => toggleAlarm(item)} />

        <TouchableOpacity onPress={() => deleteAlarm(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>SMART</Text>

          <Text style={styles.title}>Alarm</Text>
        </View>

        <View style={styles.iconBox}>
          <Text style={styles.icon}>⏰</Text>
        </View>
      </View>

      {/* Live Clock */}

      <View style={styles.clockCard}>
        <Text style={styles.time}>{getTime()}</Text>

        <Text style={styles.day}>{getDate()}</Text>
      </View>

      {/* Empty */}

      {/* Alarm List */}

      <FlatList
        data={alarms}
        keyExtractor={item => item.id}
        renderItem={renderAlarm}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🔔</Text>

            <Text style={styles.emptyTitle}>No Alarm Set</Text>

            <Text style={styles.emptyText}>
              Tap below to create your first alarm
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddAlarm')}
      >
        <Text style={styles.buttonText}>+ Add Alarm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  smallTitle: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 3,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 28,
  },

  clockCard: {
    marginTop: 40,
    backgroundColor: '#151515',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },

  time: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: '900',
  },

  day: {
    color: '#777777',
    marginTop: 8,
    fontSize: 15,
  },

  emptyCard: {
    marginTop: 25,
    backgroundColor: '#151515',
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 45,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 15,
  },

  emptyText: {
    color: '#777777',
    marginTop: 8,
    textAlign: 'center',
  },

  button: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,

    backgroundColor: '#FF6B00',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  alarmCard: {
    marginTop: 20,
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  alarmTime: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },

  repeatText: {
    color: '#888',
    marginTop: 5,
  },

  deleteText: {
    color: '#FF6B00',
    marginTop: 8,
    fontWeight: '700',
  },
});

export default HomeScreen;
