async function getLeadsStatuses(startDate, endDate) {
    try {
        const response = await fetch('https://crm.belmar.pro/api/v1/getstatuses', {
            method: 'POST',
            headers: {
                'token': 'ba67df6a-a17c-476f-8e95-bcdb75ed3958',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching leads statuses:', error);
        return [];
    }
}

function populateTable(leads) {
    const tableBody = document.getElementById('leadsTableBody');
    tableBody.innerHTML = '';

    leads.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${lead.id}</th>
            <td>${lead.email}</td>
            <td>${lead.status}</td>
            <td>${lead.ftd}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('filterButton').addEventListener('click', async function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate && endDate) {
        const leads = await getLeadsStatuses(startDate, endDate);
        populateTable(leads);
    } else {
        alert('Please select both start and end dates.');
    }
});

document.addEventListener('DOMContentLoaded', async function() {
    const leads = await getLeadsStatuses();
    populateTable(leads);
});
