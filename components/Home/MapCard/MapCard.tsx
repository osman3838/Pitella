import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View,ScrollView } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// ----------------------
// GOOGLE MAPS API KEY
// ----------------------
const GOOGLE_MAPS_KEY = "AIzaSyCzj-3xo-m1JYvyB63JTOcX1ZQi5iwWtf8";

type Pin = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
};

const MIN_RADIUS_KM = 1;
const MAX_RADIUS_KM = 10;

export default function MapCard() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [status, setStatus] = useState<'locating' | 'denied' | 'error' | 'ready'>('locating');
  const [radiusKm, setRadiusKm] = useState<number>(3);

  // Örnek otomatlar (statik)
  const pins: Pin[] = [
    { id: 1, name: 'Bahçelievler Otomat', latitude: 38.695, longitude: 35.553, distanceKm: 1.4 },
    { id: 2, name: 'Mevlana Otomat', latitude: 38.687, longitude: 35.562, distanceKm: 2.7 },
    { id: 3, name: 'Cemil Baba Otomat', latitude: 38.702, longitude: 35.545, distanceKm: 3.1 }
  ];

  // -------------------------
  // KULLANICININ KONUMUNU AL
  // -------------------------
  useEffect(() => {
    const init = async () => {
      const { status: perm } = await Location.requestForegroundPermissionsAsync();
      if (perm !== "granted") {
        setStatus("denied");
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        setCoords({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        });
        setStatus("ready");
      } catch (e) {
        setStatus("error");
      }
    };

    init();
  }, []);

  // -------------------------
  // YARIÇAP / REGION HESAPLA
  // -------------------------
  const effectiveRadiusMeters = radiusKm * 1000;

  const region = coords
    ? {
        ...coords,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      }
    : undefined;

  // -------------------------
  // BUTONLAR
  // -------------------------
  const inc = () => setRadiusKm(r => Math.min(r + 1, MAX_RADIUS_KM));
  const dec = () => setRadiusKm(r => Math.max(r - 1, MIN_RADIUS_KM));

  // -------------------------
  // DURUM METNİ
  // -------------------------
  const statusText =
    status === "locating"
      ? "Aranıyor."
      : status === "denied"
      ? "Konum izni verilmedi."
      : status === "error"
      ? "Hata oluştu."
      : "Konum hazır.";

  // -------------------------
  // YÜZDELİK PROGRESS
  // -------------------------
  const progress = (radiusKm - MIN_RADIUS_KM) / (MAX_RADIUS_KM - MIN_RADIUS_KM);

  if (status !== "ready" || !coords) {
    return (
      <View style={[styles.card, { height: 180, justifyContent: "center" }]}>
        <ActivityIndicator size="large" />
        <Text style={styles.info}>{statusText}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      
   
      <View style={styles.card}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={region}
          provider={PROVIDER_GOOGLE}
          showsCompass={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
        >
          {/* TURUNCU DAİRE */}
          <Circle
            center={coords}
            radius={effectiveRadiusMeters}
            strokeColor="#FF6B00"
            fillColor="rgba(255, 107, 0, 0.09)"
            strokeWidth={2}
          />

          {/* MAVİ NOKTA */}
          <Marker coordinate={coords} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.userDotOuter}>
              <View style={styles.userDotInner} />
            </View>
          </Marker>

          {/* ÖRNEK OTOMAT PİNLERİ */}
          {pins.map((p, i) => (
            <Marker
              key={p.id}
              coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            >
              <View style={[styles.pin, i === 0 ? styles.pinActive : styles.pinInactive]} />
            </Marker>
          ))}
        </MapView>

        {/* SOL ÜST: ŞEHİR-SEMT */}
        <Text style={styles.city}>Kayseri / Talas</Text>

        {/* SOL ALT: STATÜ */}
        <Text style={styles.status}>{statusText}</Text>

        {/* SAĞ ALT: + - BUTONLAR */}
        <View style={styles.zoomButtons}>
          <Pressable style={styles.zoomBtn} onPress={inc}>
            <Text style={styles.zoomText}>+</Text>
          </Pressable>
          <Pressable style={styles.zoomBtn} onPress={dec}>
            <Text style={styles.zoomText}>-</Text>
          </Pressable>
        </View>
      </View>

      {/* --------------------------- */}
      {/*        RADIUS PROGRESS      */}
      {/* --------------------------- */}
      <View style={styles.progressRow}>
        <Text style={styles.kmLabel}>1 km</Text>

        <View style={styles.progressBox}>
          <View style={styles.track}>
            <View style={[styles.trackFill, { flex: progress }]} />
            <View style={{ flex: 1 - progress }} />
          </View>
          <Text style={styles.progressText}>{radiusKm} km</Text>
        </View>

        <Text style={styles.kmLabel}>10 km</Text>
      </View>

      {/* --------------------------- */}
      {/*       OTOMAT LİSTESİ        */}
      {/* --------------------------- */}
      <ScrollView style={styles.list} contentContainerStyle={{ gap: 6 }}>
        {pins.map((p, i) => (
          <View
            key={p.id}
            style={[styles.row, i === 0 ? styles.rowActive : styles.rowInactive]}
          >
            <Text style={[styles.rowName, i === 0 ? styles.rowNameActive : {}]}>
              {p.name}
            </Text>

            <Text style={styles.rowDistance}>{p.distanceKm} km</Text>

            <Pressable
              style={[styles.routeBtn, i === 0 ? styles.routeBtnActive : styles.routeBtnInactive]}
            >
              <Text
                style={[
                  styles.routeText,
                  i === 0 ? styles.routeTextActive : styles.routeTextInactive,
                ]}
              >
                Rota
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { padding: 10, backgroundColor: "#f7f7f7", borderRadius: 12 },

  card: {
    height: 180,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 10,
  },

  info: { textAlign: "center", marginTop: 8 },

  city: {
    position: "absolute",
    top: 8,
    left: 8,
    fontSize: 11,
    fontWeight: "600",
    color: "#000",
  },

  status: {
    position: "absolute",
    bottom: 8,
    left: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },

  zoomButtons: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
    gap: 4,
  },

  zoomBtn: {
    width: 32,
    height: 32,
    backgroundColor: "#FF6B00",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomText: { color: "#fff", fontSize: 20, fontWeight: "700" },

  userDotOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(0,174,239,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  userDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00AEEF",
  },

  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pinActive: { backgroundColor: "#ff4d00" },
  pinInactive: { backgroundColor: "#999" },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  kmLabel: { width: 40, textAlign: "center", fontSize: 12, color: "#444" },
  progressBox: { flex: 1 },
  track: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
  },
  trackFill: {
    backgroundColor: "#FF6B00",
  },
  progressText: { marginTop: 4, fontSize: 11, textAlign: "center" },

  list: { maxHeight: 220 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  rowActive: { backgroundColor: "#FF6B00" },
  rowInactive: { backgroundColor: "#e0e0e0" },

  rowName: { flex: 1, fontSize: 13, fontWeight: "600" },
  rowNameActive: { color: "#fff" },

  rowDistance: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    fontSize: 11,
    fontWeight: "700",
    color: "#000",
  },

  routeBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  routeBtnActive: { backgroundColor: "#fff" },
  routeBtnInactive: { backgroundColor: "#ccc" },

  routeText: { fontSize: 11, fontWeight: "800" },
  routeTextActive: { color: "#FF6B00" },
  routeTextInactive: { color: "#555" },
});
