export function DesktopNotification(body,icon,title){
    if (("Notification" in window)) {
        if (Notification.permission === "granted") {
            console.log("object");
            var options = {
                body: body,
                icon: icon,
            }
            new Notification(title,options);
        }
    }
}
