import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    try {
      const data = await AsyncStorage.getItem('ALARMS');

      if (data) {
        const parsed = JSON.parse(data);

        const formatted = parsed.map(item => ({
          ...item,
          time: new Date(item.time),
        }));

        setAlarms(formatted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveAlarms = async updatedAlarms => {
    try {
      await AsyncStorage.setItem('ALARMS', JSON.stringify(updatedAlarms));
    } catch (error) {
      console.log(error);
    }
  };

  const addAlarm = alarm => {
    const updated = [...alarms, alarm];

    setAlarms(updated);

    saveAlarms(updated);
  };

  const deleteAlarm = id => {
    const updated = alarms.filter(item => item.id !== id);

    setAlarms(updated);

    saveAlarms(updated);
  };

  const updateAlarm = updatedAlarm => {
    const updated = alarms.map(item =>
      item.id === updatedAlarm.id ? updatedAlarm : item,
    );

    setAlarms(updated);

    saveAlarms(updated);
  };

  return (
    <AlarmContext.Provider
      value={{
        alarms,
        addAlarm,
        deleteAlarm,
        updateAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = () => useContext(AlarmContext);
