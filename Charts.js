<script>
    let chartInitialized = false; // Ellenőrizzük, hogy a grafikon inicializálva van-e

    document.getElementById('toggleChart').addEventListener('click', function () {
        const chartContainer = document.getElementById('chartContainer');

        // Ha a grafikon jelenleg nem látható
        if (chartContainer.style.display === 'none') {
            chartContainer.style.display = 'block';
            this.textContent = 'Grafikon elrejtése';

            // Csak akkor inicializáljuk a grafikont, ha még nem történt meg
            if (!chartInitialized) {
                fetch('/data')
                    .then(response => response.json())
                    .then(data => {
                        const labels = data.map(row => row.timestamp);
                        const currentAData = data.map(row => row.current_a);
                        const voltageABData = data.map(row => row.voltage_ab);
                        const activePowerData = data.map(row => row.active_power_total);

                        const ctx = document.getElementById('myChart').getContext('2d');
                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Current A',
                                        data: currentAData,
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        borderWidth: 2,
                                        fill: false
                                    },
                                    {
                                        label: 'Voltage AB',
                                        data: voltageABData,
                                        borderColor: 'rgba(54, 162, 235, 1)',
                                        borderWidth: 2,
                                        fill: false
                                    },
                                    {
                                        label: 'Active Power Total',
                                        data: activePowerData,
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 2,
                                        fill: false
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                scales: {
                                    x: { title: { display: true, text: 'Timestamp' } },
                                    y: { title: { display: true, text: 'Values' } }
                                }
                            }
                        });

                        chartInitialized = true; // Beállítjuk, hogy a grafikon már inicializálva van
                    })
                    .catch(error => console.error('Error:', error));
            }
        } else {
            // Ha a grafikon már látható, elrejtjük
            chartContainer.style.display = 'none';
            this.textContent = 'Grafikon megjelenítése';
        }
    });
</script>
