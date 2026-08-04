package com.smartalarm

import android.app.Service
import android.content.Intent
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.net.Uri
import android.os.IBinder

class AlarmService : Service() {

    private var mediaPlayer: MediaPlayer? = null

    override fun onStartCommand(
        intent: Intent?,
        flags: Int,
        startId: Int
    ): Int {

        if (intent?.action == "STOP_ALARM") {
            mediaPlayer?.stop()
            mediaPlayer?.release()
            mediaPlayer = null

            stopForeground(STOP_FOREGROUND_REMOVE)
            stopSelf()

            return START_NOT_STICKY
        }

        if (mediaPlayer == null) {

            val ringtoneUri = intent?.getStringExtra("ringtoneUri")

            mediaPlayer =
                if (!ringtoneUri.isNullOrEmpty()) {
                    MediaPlayer().apply {
                        setDataSource(this@AlarmService, Uri.parse(ringtoneUri))
                        setAudioAttributes(
                            AudioAttributes.Builder()
                                .setUsage(AudioAttributes.USAGE_ALARM)
                                .build()
                        )
                        prepare()
                    }
                } else {
                    MediaPlayer.create(this, R.raw.alarm)
                }

            mediaPlayer?.isLooping = true
            mediaPlayer?.start()
        }

        return START_STICKY
    }

    override fun onDestroy() {
        mediaPlayer?.stop()
        mediaPlayer?.release()
        mediaPlayer = null
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}