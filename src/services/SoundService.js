import Sound from 'react-native-sound';

Sound.setCategory('Playback');

class SoundService {
  constructor() {
    this.sound = null;
  }

  playAlarm() {
    if (this.sound) {
      this.sound.stop();
      this.sound.release();
      this.sound = null;
    }

    this.sound = new Sound(
      'alarm.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Sound Error:', error);
          return;
        }

        this.sound.setNumberOfLoops(-1);
        this.sound.setVolume(1);

        this.sound.play(success => {
          if (!success) {
            console.log('Playback failed');
          }
        });
      },
    );
  }

  stopAlarm() {
    if (this.sound) {
      const currentSound = this.sound;

      this.sound = null;

      currentSound.stop(() => {
        currentSound.release();
      });
    }
  }
}

export default new SoundService();