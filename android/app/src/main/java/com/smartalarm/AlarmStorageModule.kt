package com.smartalarm

import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AlarmStorageModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AlarmStorage"
    }

  @ReactMethod
fun checkAlarm(promise: Promise) {

    val prefs = reactContext.getSharedPreferences(
        "alarm",
        Context.MODE_PRIVATE
    )

    val isAlarmTriggered = prefs.getBoolean(
        "isAlarmTriggered",
        false
    )

    promise.resolve(isAlarmTriggered)
}
}