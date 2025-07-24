$p.events.on_grid_load = function() {
    $("#MainCommands").append(
        $('<button id="button-chart" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" accesskey="" onclick="$p.send($(this))" data-icon="ui-icon-circle-arrow-w" data-action="GridRows" data-method="post"><span class="ui-button-icon-space"> </span>Chart</button>')
    );


    $('#button-chart').on('click', async function() {
        console.log(1)
        if ($('#chart-container').length === 0) {
            console.log(2)
            $('#MainForm').prepend('<div id="chart-container" style="width: 600px; margin: 20px auto;"><canvas id="myChart"></canvas></div>');
        }
        try {
            console.log(3)
            const res = await $p.apiGet({
                id: 2, // ID của bảng bạn lấy dữ liệu
                data: {
                    View: {
                        ApiDataType: "KeyValues"
                    }
                }
            });

            console.log(res)

            // Giả sử bạn muốn tổng population theo country
            const rawItems = res.Response.Data;
            const countsByAdmin = {};

            rawItems.forEach(item => {
                const admin = item.AdminName || "Không xác định";
                countsByAdmin[admin] = (countsByAdmin[admin] || 0) + 1;
            });

            const labels = Object.keys(countsByAdmin);
            const values = Object.values(countsByAdmin);



            // Vẽ biểu đồ
            const ctx = document.getElementById('myChart').getContext('2d');

            window.myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Population by Country',
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Population by Country'
                        }
                    }
                }
            });

        } catch (err) {
            console.error("Lỗi lấy dữ liệu hoặc vẽ biểu đồ:", err);
        }
    });
}
