import notifee, {
    AndroidImportance,
    TriggerType,
} from '@notifee/react-native';
import Sound from 'react-native-sound';

class NotificationService {
    async createChannel() {
        await notifee.createChannel({
            id: 'alarm-channel',
            name: 'Alarm Channel',
            importance: AndroidImportance.HIGH,

            vibration: true,
            vibrationPattern: [300, 500, 300, 500],

            sound: 'alarm',
            soundURI: 'android.resource://com.smartalarm/raw/alarm',
        });
    }

    async requestPermission() {
        await notifee.requestPermission();
    }

    async displayNotification() {
        await notifee.displayNotification({
            title: 'Smart Alarm',
            body: 'Alarm Time Reached 🔔',

            android: {
                channelId: 'alarm-channel',
                importance: AndroidImportance.HIGH,
                sound: 'alarm',

                pressAction: {
                    id: 'default',
                },
            },
        });
    }
    async scheduleAlarm(date) {
        await notifee.createTriggerNotification(
            {
                title: 'Smart Alarm',
                body: 'Alarm Time Reached 🔔',

                android: {
  channelId: 'alarm-channel',
  importance: AndroidImportance.HIGH,
  vibration: true,
  vibrationPattern: [300, 500, 300, 500],
  sound: 'alarm',

  pressAction: {
    id: 'default',
  },
}
            },
            {
                type: TriggerType.TIMESTAMP,
                timestamp: date.getTime(),
            },
        );
    }
}

export default new NotificationService();