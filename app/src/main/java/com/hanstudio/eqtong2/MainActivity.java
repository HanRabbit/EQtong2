package com.hanstudio.eqtong2;

import static android.content.ContentValues.TAG;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.net.CookieStore;
import java.net.HttpCookie;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import okhttp3.Cookie;

public class MainActivity extends AppCompatActivity {

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /* WebView 配置部分 */
        WebView wViewMain = (WebView) findViewById(R.id.wViewMain);
        wViewMain.getSettings().setJavaScriptEnabled(true);
        wViewMain.requestFocus();
        wViewMain.setWebChromeClient(new WebChromeClient() {
           @Override
           public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
               AlertDialog.Builder b = new AlertDialog.Builder(MainActivity.this);
               b.setTitle("Alert");
               b.setMessage(message);
               b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                   @Override
                   public void onClick(DialogInterface dialog, int which) {
                       result.confirm();
                   }
               });
               b.setCancelable(false);
               b.create().show();
               return true;
           }
        });
        wViewMain.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                HashMap<String, String> map = new HashMap<String, String>();
                map.put("Referer", view.getUrl());
                view.loadUrl(url, map);
                return true;
            }
        });
        wViewMain.addJavascriptInterface(new androidData(), "androidData");
//        wViewMain.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        String url = "file:///android_asset/mainIndex/index.html";
//        if (syncCookie("127.0.0.1", "SIFT_PROV=['天津']")) {
//            Toast.makeText(this, "OK :)", Toast.LENGTH_SHORT).show();
//        } else {
//            Toast.makeText(this, "FAILED :(", Toast.LENGTH_SHORT).show();
//        }
        wViewMain.loadUrl(url);

        makeStatusBarTransparent(this);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
//        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);

        getWindow().setNavigationBarColor(Color.WHITE);
    }

    public VirusData virusData = new VirusData();

    /* 发送从 URL 中获得的 JSON 字符串 */
    private class androidData {
        @JavascriptInterface
        public String getVirusJson() {
//            Log.i("dev_han", "GET DATA");
            return virusData.getVirusJson();
        }
        @JavascriptInterface
        public void switchAct(String str) {
            Intent intent;
            switch (str) {
                case "about":
                    intent = new Intent(MainActivity.this, MineActivity.class);
                    startActivity(intent);
                    break;
                case "login":
                    intent = new Intent(MainActivity.this, LoginActivity.class);
                    startActivity(intent);
                    break;
            }
        }
        @JavascriptInterface
        public void setNavColor(int r, int g, int b) {
            getWindow().setNavigationBarColor(Color.rgb(r, g, b));
        }
        @JavascriptInterface
        public void downloadAPK(String url) {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
//            Log.i("dev_han", url);
            startActivity(intent);
        }
    }

    public static void makeStatusBarTransparent(Activity activity) {
        Window window = activity.getWindow();
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        int option = window.getDecorView().getSystemUiVisibility() | View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
        window.getDecorView().setSystemUiVisibility(option);
        window.setStatusBarColor(Color.TRANSPARENT);
    }
    public static boolean syncCookie(String url,String cookie) {
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setCookie(url, cookie);//如果没有特殊需求，这里只需要将session id以"key=value"形式作为cookie即可
        String newCookie = cookieManager.getCookie(url);
        return !TextUtils.isEmpty(newCookie);
    }
}