package com.smartalarm

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AlarmControlModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AlarmControl"
    }


    @ReactMethod
    fun stopAlarm() {

        val intent = Intent(
            reactContext,
            AlarmService::class.java
        )

        intent.action = "STOP_ALARM"

        reactContext.startService(intent)
    }
}