package com.smartalarm

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class AlarmActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
        } else {
            window.addFlags(
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON or
                WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
            )
        }

        window.addFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
        )

        setContentView(R.layout.activity_alarm)


        findViewById<Button>(R.id.btnStop).setOnClickListener {

            val intent = Intent(this, AlarmService::class.java)
            intent.action = "STOP_ALARM"
            startService(intent)

            finish()
        }


        findViewById<Button>(R.id.btnSnooze).setOnClickListener {

            val intent = Intent(this, AlarmService::class.java)
            intent.action = "STOP_ALARM"
            startService(intent)

            finish()
        }
    }


    override fun onBackPressed() {
        // alarm screen se back disable
    }
}