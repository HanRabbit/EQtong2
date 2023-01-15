package com.hanstudio.eqtong2;

import android.webkit.JavascriptInterface;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class VirusData {
    /* 发送 GET 请求，返回 JSON 字符串 */
    static String GET_URL = "https://interface.sina.cn/news/wap/fymap2020_data.d.json";
    public String virusJson = null;
    public boolean isStarted = false;

    public void updateVirusJson() {
        /* 更新 JSON 数据 */
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().url(GET_URL).build();
        Call call = okHttpClient.newCall(request);
        try {
            Response response = call.execute();
            virusJson = response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getVirusJson() {
        if (!isStarted) {
            updateVirusJson();
            isStarted = true;
        }
        return virusJson;
    }
}