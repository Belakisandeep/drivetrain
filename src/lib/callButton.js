export const handleCallClick = () => {
    // Define the phone number you want to call
    const phoneNumber = "+18888551808"; // Replace with your desired phone number

    // Open the phone dialer with the phone number
    setTimeout(() => {
        window.location.href = "tel:" + phoneNumber;
    }, [200])
};