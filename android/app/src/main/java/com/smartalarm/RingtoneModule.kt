package com.smartalarm

import android.media.MediaPlayer
import android.media.RingtoneManager
import android.net.Uri
import com.facebook.react.bridge.*

class RingtoneModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private var mediaPlayer: MediaPlayer? = null

    override fun getName(): String = "RingtoneModule"

    @ReactMethod
    fun getRingtones(promise: Promise) {

        val list = Arguments.createArray()

        val types = listOf(
            RingtoneManager.TYPE_ALARM,
            RingtoneManager.TYPE_RINGTONE,
            RingtoneManager.TYPE_NOTIFICATION
        )

        for (type in types) {

            val manager = RingtoneManager(reactContext)
            manager.setType(type)

            val cursor = manager.cursor

            while (cursor.moveToNext()) {

                val item = Arguments.createMap()
                item.putString(
                    "title",
                    cursor.getString(RingtoneManager.TITLE_COLUMN_INDEX)
                )
                item.putString(
                    "uri",
                    manager.getRingtoneUri(cursor.position).toString()
                )

                list.pushMap(item)
            }

            cursor.close()
        }

        promise.resolve(list)
    }

    @ReactMethod
    fun playRingtone(uri: String) {

        mediaPlayer?.release()

        mediaPlayer = MediaPlayer().apply {
            setDataSource(reactContext, Uri.parse(uri))
            prepare()
            start()
        }
    }

    @ReactMethod
    fun stopPreview() {
        mediaPlayer?.release()
        mediaPlayer = null
    }
}