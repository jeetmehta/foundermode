import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  cancelAlarm,
  getScheduledAlarm,
  scheduleAlarm,
  setupNotifications,
} from "../services/alarmService";
import { fetchEarnings } from "../services/earningsService";

const AlarmScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [earnings, setEarnings] = useState(0);
  const [quote, setQuote] = useState("");
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  useEffect(() => {
    setupNotifications();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchEarnings().then(setEarnings);

    // Check if there's an alarm scheduled
    checkScheduledAlarm();

    return () => clearInterval(timer);
  }, []);

  const checkScheduledAlarm = async () => {
    const scheduledAlarm = await getScheduledAlarm();
    if (scheduledAlarm) {
      setAlarmTime(scheduledAlarm);
      setIsAlarmSet(true);
    } else {
      setIsAlarmSet(false);
    }
  };

  useEffect(() => {
    if (earnings > 0) {
      setQuote("Great job! Let's keep the momentum going!");
    } else {
      setQuote("No earnings yet. Time to make that bread!");
    }
  }, [earnings]);

  const handleSetAlarm = async () => {
    await scheduleAlarm(alarmTime.getHours(), alarmTime.getMinutes());
    setShowTimePicker(false);
    setIsAlarmSet(true);
  };

  const handleCancelAlarm = async () => {
    await cancelAlarm();
    setIsAlarmSet(false);
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || alarmTime;
    setAlarmTime(currentDate);

    if (Platform.OS === "android") {
      setShowTimePicker(false);
      handleSetAlarm();
    }
  };

  const renderTimePicker = () => {
    if (Platform.OS === "ios") {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showTimePicker}
          onRequestClose={() => setShowTimePicker(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DateTimePicker
                testID="dateTimePicker"
                value={alarmTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={onChangeTime}
                textColor="black"
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleSetAlarm}
              >
                <Text style={styles.textStyle}>Confirm Alarm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        showTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={alarmTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime.toLocaleTimeString()}</Text>
      <Text style={styles.earningsText}>${earnings.toFixed(2)}</Text>
      <Text style={styles.quoteText}>{quote}</Text>

      <View style={styles.alarmContainer}>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Set Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelAlarm} style={styles.button}>
          <Text style={styles.buttonText}>Cancel Alarm</Text>
        </TouchableOpacity>
      </View>

      {isAlarmSet && (
        <Text style={styles.alarmText}>
          Alarm set for:{" "}
          {alarmTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}

      {renderTimePicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  earningsText: {
    fontSize: 36,
    color: "#fff",
    marginTop: 20,
  },
  quoteText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  alarmContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  alarmText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AlarmScreen;
