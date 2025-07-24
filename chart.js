$p.events.on_grid_load_arr.push(function() {
    // Thêm nút Show/Hide Chart
    $("#MainCommands").append(
        $('<button id="button-chart" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" data-icon="ui-icon-circle-arrow-w"><span class="ui-button-icon-space"> </span>Hiển thị biểu đồ</button>')
    );

    // Biến kiểm tra trạng thái
    let chartVisible = false;
    let chartRendered = false;

    // Sự kiện click

    $('#button-chart').on('click', async function() {
        const $container = $('#chart-container');

        // Nếu container chưa tồn tại, tạo mới
        if ($container.length === 0) {
            $('#MainForm').prepend('<div id="chart-container" style="display: none; width: 80%; margin: 20px auto;"><canvas id="myChart"></canvas></div>');
        }

        // Nếu đang ẩn → hiển thị và vẽ biểu đồ
        if ($('#chart-container').is(':hidden')) {
            $('#chart-container').slideDown(400, async function() {
                // Xóa biểu đồ cũ nếu có
                if (window.myChart instanceof Chart) {
                    window.myChart.destroy();
                }

                try {
                    const res = await $p.apiGet({
                        id: $p.siteId(),
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
                            maintainAspectRatio: false, // Thêm nếu cần chiều cao linh hoạt
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
                } catch (err) {
                    console.error("Lỗi lấy dữ liệu hoặc vẽ biểu đồ:", err);
                }
            });
        } else {
            $('#chart-container').slideUp(300);
        }
    });
});
