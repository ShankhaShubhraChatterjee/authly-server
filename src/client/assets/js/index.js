const closeNotificationBtn = document.getElementById(
    'notification-close-button'
)
if (closeNotificationBtn !== null) {
    closeNotificationBtn.addEventListener('click', () => {
        document.querySelector('.notification').style.display = 'none'
    })
}
