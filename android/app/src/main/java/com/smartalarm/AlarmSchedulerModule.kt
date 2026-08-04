package com.smartalarm

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AlarmSchedulerModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AlarmScheduler"
    }

    @ReactMethod
    fun scheduleAlarm(
        timestamp: Double,
        ringtoneUri: String
    ) {

        val intent = Intent(reactContext, AlarmReceiver::class.java).apply {
            putExtra("ringtoneUri", ringtoneUri)
        }

        val pendingIntent = PendingIntent.getBroadcast(
            reactContext,
            1001,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val alarmManager =
            reactContext.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            timestamp.toLong(),
            pendingIntent
        )
    }
}