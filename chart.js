$p.events.on_grid_load = function () {
    // Thêm nút Show/Hide Chart
    $("#MainCommands").append(
        $('<button id="button-chart" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" data-icon="ui-icon-circle-arrow-w"><span class="ui-button-icon-space"> </span>Hiển thị biểu đồ</button>')
    );

    // Biến kiểm tra trạng thái
    let chartVisible = false;
    let chartRendered = false;

    // Sự kiện click
    $('#button-chart').on('click', async function () {
        chartVisible = !chartVisible;

        if (chartVisible) {
            $(this).html('<span class="ui-button-icon-space"> </span>Ẩn biểu đồ');

            // Nếu chưa có container → tạo
            if ($('#chart-container').length === 0) {
                $('#MainForm').prepend('<div id="chart-container" style="width: 600px; margin: 20px auto; display:none;"><canvas id="myChart"></canvas></div>');
            }

            // Hiển thị biểu đồ
            $('#chart-container').slideDown();

            // Nếu chưa vẽ → fetch và vẽ
            if (!chartRendered) {
                try {
                    const res = await $p.apiGet({
                        id: 2,
                        data: {
                            View: {
                                ApiDataType: "KeyValues"
                            }
                        }
                    });

                    const rawItems = res.Response.Data;
                    const countsByAdmin = {};

                    rawItems.forEach(item => {
                        const admin = item.AdminName || "Không xác định";
                        countsByAdmin[admin] = (countsByAdmin[admin] || 0) + 1;
                    });

                    const labels = Object.keys(countsByAdmin);
                    const values = Object.values(countsByAdmin);

                    const ctx = document.getElementById('myChart').getContext('2d');

                    window.myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Số bản ghi theo Admin Name',
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
                                    text: 'Số bản ghi theo Admin Name'
                                }
                            }
                        }
                    });

                    chartRendered = true;

                } catch (err) {
                    console.error("Lỗi khi lấy dữ liệu hoặc vẽ biểu đồ:", err);
                }
            }

        } else {
            $(this).html('<span class="ui-button-icon-space"> </span>Hiển thị biểu đồ');
            $('#chart-container').slideUp();
        }
    });
};
