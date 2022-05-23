// react
import { useContext } from "react";

// styles
import * as S from "./NotificationReminder.styled"

// context
import { NotificationContext } from "../../context/NotificationContext";

// assets
import notificationIcon from "../../assets/notification-icon.png"

const NotificationReminder = () => {
    // states
    const { setShowNotificationReminder, setShowNotificationHelper } = useContext(NotificationContext)

    // click for desktop makes a NotificationHelper to pop up (modal)
    const handleClick = () => {
        if (Notification.permission !== "granted") {
            setShowNotificationHelper(prev => true)

            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    setShowNotificationReminder(prev => false)
                    setShowNotificationHelper(prev => false)
                }
            })
        }
    }

    return <S.NotificationReminderContainer onClick={handleClick}>
        <S.Icon src={notificationIcon} alt="reminderIcon" />
    </S.NotificationReminderContainer>;
};

export default NotificationReminder;
