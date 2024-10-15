import * as Notifications from "expo-notifications";

let alarmIdentifier: string | null = null;

export const scheduleAlarm = async (hour: number, minute: number) => {
  // Cancel any existing alarm first
  await cancelAlarm();

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Wake Up, Founder!",
      body: "Time to check your earnings and start hustling!",
      sound: true, // Use default alarm sound
    },
    trigger: {
      hour: hour,
      minute: minute,
      repeats: false, // Change to false so it doesn't repeat daily
    },
  });

  alarmIdentifier = identifier;
  return identifier;
};

export const cancelAlarm = async () => {
  if (alarmIdentifier) {
    await Notifications.cancelScheduledNotificationAsync(alarmIdentifier);
    alarmIdentifier = null;
  }
};

export const setupNotifications = async () => {
  await Notifications.requestPermissionsAsync();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Add a listener for when a notification is received
  Notifications.addNotificationReceivedListener(() => {
    // Clear the alarm when it's received (i.e., when it rings)
    cancelAlarm();
  });
};

export const getScheduledAlarm = async (): Promise<Date | null> => {
  if (!alarmIdentifier) return null;

  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  const alarm = notifications.find((n) => n.identifier === alarmIdentifier);

  if (
    alarm &&
    alarm.trigger &&
    typeof alarm.trigger === "object" &&
    "hour" in alarm.trigger &&
    "minute" in alarm.trigger
  ) {
    const now = new Date();
    const alarmDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      alarm.trigger.hour,
      alarm.trigger.minute
    );

    // If the alarm time has already passed for today, set it for tomorrow
    if (alarmDate < now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    return alarmDate;
  }

  return null;
};
