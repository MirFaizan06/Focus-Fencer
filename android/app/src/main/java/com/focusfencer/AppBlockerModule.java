package com.focusfencer;

import android.app.AppOpsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.provider.Settings;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * Native Module for App Blocking and Usage Stats
 * Requires PACKAGE_USAGE_STATS permission
 */
public class AppBlockerModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "AppBlocker";
    private final ReactApplicationContext reactContext;

    public AppBlockerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * Check if the app has usage stats permission
     */
    @ReactMethod
    public void hasUsageStatsPermission(Promise promise) {
        try {
            AppOpsManager appOps = (AppOpsManager) reactContext
                    .getSystemService(Context.APP_OPS_SERVICE);
            int mode = appOps.checkOpNoThrow(
                    AppOpsManager.OPSTR_GET_USAGE_STATS,
                    android.os.Process.myUid(),
                    reactContext.getPackageName()
            );
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED);
        } catch (Exception e) {
            promise.reject("PERMISSION_CHECK_ERROR", e.getMessage());
        }
    }

    /**
     * Request usage stats permission
     */
    @ReactMethod
    public void requestUsageStatsPermission() {
        try {
            Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Get list of installed apps
     */
    @ReactMethod
    public void getInstalledApps(Promise promise) {
        try {
            PackageManager pm = reactContext.getPackageManager();
            List<ApplicationInfo> apps = pm.getInstalledApplications(PackageManager.GET_META_DATA);

            WritableArray appList = new WritableNativeArray();

            for (ApplicationInfo app : apps) {
                // Filter out system apps if needed
                if ((app.flags & ApplicationInfo.FLAG_SYSTEM) == 0) {
                    WritableMap appInfo = new WritableNativeMap();
                    appInfo.putString("packageName", app.packageName);
                    appInfo.putString("appName", app.loadLabel(pm).toString());
                    appList.pushMap(appInfo);
                }
            }

            promise.resolve(appList);
        } catch (Exception e) {
            promise.reject("GET_APPS_ERROR", e.getMessage());
        }
    }

    /**
     * Check if a specific app is currently running
     */
    @ReactMethod
    public void isAppRunning(String packageName, Promise promise) {
        try {
            UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext
                    .getSystemService(Context.USAGE_STATS_SERVICE);

            long currentTime = System.currentTimeMillis();
            long queryTime = currentTime - 1000 * 5; // Last 5 seconds

            List<UsageStats> statsList = usageStatsManager.queryUsageStats(
                    UsageStatsManager.INTERVAL_DAILY,
                    queryTime,
                    currentTime
            );

            if (statsList != null) {
                SortedMap<Long, UsageStats> sortedStats = new TreeMap<>();
                for (UsageStats usageStats : statsList) {
                    sortedStats.put(usageStats.getLastTimeUsed(), usageStats);
                }

                if (!sortedStats.isEmpty()) {
                    String topPackage = sortedStats.get(sortedStats.lastKey()).getPackageName();
                    promise.resolve(topPackage.equals(packageName));
                    return;
                }
            }

            promise.resolve(false);
        } catch (Exception e) {
            promise.reject("CHECK_APP_ERROR", e.getMessage());
        }
    }

    /**
     * Get currently running app
     */
    @ReactMethod
    public void getCurrentApp(Promise promise) {
        try {
            UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext
                    .getSystemService(Context.USAGE_STATS_SERVICE);

            long currentTime = System.currentTimeMillis();
            long queryTime = currentTime - 1000 * 5; // Last 5 seconds

            List<UsageStats> statsList = usageStatsManager.queryUsageStats(
                    UsageStatsManager.INTERVAL_DAILY,
                    queryTime,
                    currentTime
            );

            if (statsList != null && !statsList.isEmpty()) {
                SortedMap<Long, UsageStats> sortedStats = new TreeMap<>();
                for (UsageStats usageStats : statsList) {
                    sortedStats.put(usageStats.getLastTimeUsed(), usageStats);
                }

                if (!sortedStats.isEmpty()) {
                    String topPackage = sortedStats.get(sortedStats.lastKey()).getPackageName();
                    promise.resolve(topPackage);
                    return;
                }
            }

            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("GET_CURRENT_APP_ERROR", e.getMessage());
        }
    }
}
