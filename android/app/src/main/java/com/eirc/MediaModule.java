package com.eirc;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Looper;
import android.util.Log;
import android.os.Handler;

public class MediaModule extends ReactContextBaseJavaModule {
    private MediaPlayer mediaPlayer;
    private Integer currentPosition;
    private int listenerCount = 0;
    //private Handler myHandler = new Handler(Looper.getMainLooper());
    MediaModule(ReactApplicationContext context) {
        super(context);
    }

    private void sendEvent(ReactApplicationContext reactContext,
                           String eventName,
                           WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void addListener(String eventName) {
        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }
        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    @Override
    public String getName() {
        return "MediaModule";
    }

    @ReactMethod
    public void playSound(String uri){
         try{
             if(mediaPlayer == null) {
                 mediaPlayer = MediaPlayer.create(getReactApplicationContext(), R.raw.podcast);
                 mediaPlayer.start();
             } else mediaPlayer.start();

             WritableMap params = Arguments.createMap();
             params.putString("duration", String.valueOf(mediaPlayer.getDuration()));
             sendEvent(getReactApplicationContext(), "eventDuration", params);

            //  mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            //      @Override
            //      public void onCompletion(MediaPlayer mediaPlayer) {
            //          WritableMap params = Arguments.createMap();
            //          params.putString("isPlaying", "false");
            //          sendEvent(getReactApplicationContext(), "eventStopping", params);
            //          Log.d("this is onCompletion", "and this text: " + mediaPlayer.isPlaying() );
            //      }
            //  });


            //  myHandler.postDelayed(new Runnable() {
            //      @Override
            //      public void run() {
            //          WritableMap params = Arguments.createMap();
            //          params.putString("eventProperty", String.valueOf(mediaPlayer.getCurrentPosition()));
            //          sendEvent(getReactApplicationContext(), "currentPosition", params);
            //          myHandler.postDelayed(this, 100);
            //      }
            //  }, 1000 );
         }
         catch (Exception exception) {
             Log.d("this is exception", "and this text: " + exception.getMessage() );
         }
    }

    @ReactMethod
    public void pauseSound(){
        try{
            mediaPlayer.pause();
            Log.d("this is message", "sdfsdfdsd");
        }
        catch (Exception exception) {
            Log.d("this is exception", "and this text: " + exception.getMessage() );
        }
    }

    @ReactMethod
    public void seekTo(Integer position){
        try{
            mediaPlayer.seekTo(position);
            Log.d("this is seekTo", "sdfsdfdsd");
        }
        catch (Exception exception) {
            Log.d("this is exception", "and this text: " + exception.getMessage() );
        }
    }
}
