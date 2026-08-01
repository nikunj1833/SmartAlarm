package com.smartalarm

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.*

class AlarmSchedulerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AlarmScheduler"
    }

    @ReactMethod
    fun scheduleAlarm(timestamp: Double) {

        val alarmManager =
            reactContext.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        val intent = Intent(reactContext, AlarmReceiver::class.java)

        val pendingIntent = PendingIntent.getBroadcast(
            reactContext,
            1001,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            timestamp.toLong(),
            pendingIntent
        )
    }
}