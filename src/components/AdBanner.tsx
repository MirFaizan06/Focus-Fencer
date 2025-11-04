/**
 * AdBanner Component - Strategic ad placement
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {adManager} from '../utils/ads';

interface AdBannerProps {
  type: 'BANNER_HOME' | 'BANNER_STATS';
  isPremium: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({type, isPremium}) => {
  // Don't show ads if user is premium
  if (isPremium) {
    return null;
  }

  const adUnitId = adManager.getAdUnitId(type);

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
});
