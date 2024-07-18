const getIPAddress = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return '';
    }
};
async function sendLeadData() {
    try {
        const ipAddress = await getIPAddress();

        const data = {
            firstName: document.getElementById('Firstname').value,
            lastName: document.getElementById('Lastname').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            countryCode: "GB",
            box_id: "28",
            offer_id: "5",
            landingUrl: window.location.hostname,
            ip: ipAddress,
            password: "qwerty12",
            language: "en"
        };

        const response = await fetch('https://crm.belmar.pro/api/v1/addlead', {
            method: 'POST',
            headers: {
                'token': 'ba67df6a-a17c-476f-8e95-bcdb75ed3958',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('saveButton').addEventListener('click', async function() {
    await sendLeadData();
});