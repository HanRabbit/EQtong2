package com.hanstudio.eqtong2;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebView;

public class StartActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);

        WebView wViewStart = (WebView) findViewById(R.id.wViewStart);
        wViewStart.loadUrl("file:///android_asset/startIndex/index.html");

        fullscreen(true, this);

        Intent intentMain = new Intent(this, MainActivity.class);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                startActivity(intentMain);
                StartActivity.this.finish();
            }
        }, 3000);

        getWindow().setNavigationBarColor(Color.WHITE);
    }

    /* 全屏显示 */
    public void fullscreen(boolean isFullscreen, Activity activity) {
        Window thisWindow = activity.getWindow();
        WindowManager.LayoutParams lp = thisWindow.getAttributes();
        if (isFullscreen) {
            lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            thisWindow.setAttributes(lp);

            lp.flags |= WindowManager.LayoutParams.FLAG_FULLSCREEN;
            thisWindow.setAttributes(lp);
            thisWindow.addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        } else {
            lp.flags &= (~WindowManager.LayoutParams.FLAG_FULLSCREEN);
            thisWindow.setAttributes(lp);
            thisWindow.clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        }
    }
}