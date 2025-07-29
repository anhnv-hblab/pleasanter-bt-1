$p.events.on_analy_load = function () {
    if (!location.pathname.endsWith('/analy')) return;
    $("#MainCommands").append(
        $('<button id="button-chart" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" data-icon="ui-icon-circle-arrow-w"><span class="ui-button-icon-space"> </span><span class="chart-button-text">Show Chart</span></button>')
    );

    // Sự kiện click
    $('#button-chart').on('click', async function () {
        const $container = $('#chart-container');

        // Nếu container chưa tồn tại, tạo mới
        if ($container.length === 0) {
            $('#AnalyBody').prepend('<div id="chart-container" style="display: none; width: 80%; margin: 20px auto;"><canvas id="myChart"></canvas></div>');
        }

        const $chartContainer = $('#chart-container');
        const $buttonText = $('#button-chart .chart-button-text');

        // Nếu đang ẩn → hiển thị và vẽ biểu đồ
        if ($chartContainer.is(':hidden')) {
            $chartContainer.slideDown(400, async function () {
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
                            maintainAspectRatio: false,
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

                    // Cập nhật text nút
                    $buttonText.text('Hide Chart');
                } catch (err) {
                    console.error("Lỗi lấy dữ liệu hoặc vẽ biểu đồ:", err);
                }
            });

            const target = document.getElementById('MainForm');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            $chartContainer.slideUp(300);
            $buttonText.text('Show Chart');
        }
    });
}

$p.events.on_grid_load_arr.push(function () {
    if (!location.pathname.endsWith('/analy')) return;
    $("#MainCommands").append(
        $('<button id="button-chart" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" data-icon="ui-icon-circle-arrow-w"><span class="ui-button-icon-space"> </span><span class="chart-button-text">Show Chart</span></button>')
    );

    // Sự kiện click
    $('#button-chart').on('click', async function () {
        const $container = $('#chart-container');

        // Nếu container chưa tồn tại, tạo mới
        if ($container.length === 0) {
            $('#Application').prepend('<div id="chart-container" style="display: none; width: 80%; margin: 20px auto;"><canvas id="myChart"></canvas></div>');
        }

        const $chartContainer = $('#chart-container');
        const $buttonText = $('#button-chart .chart-button-text');

        // Nếu đang ẩn → hiển thị và vẽ biểu đồ
        if ($chartContainer.is(':hidden')) {
            $chartContainer.slideDown(400, async function () {
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
                            maintainAspectRatio: false,
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

                    // Cập nhật text nút
                    $buttonText.text('Hide Chart');
                } catch (err) {
                    console.error("Lỗi lấy dữ liệu hoặc vẽ biểu đồ:", err);
                }
            });

            const target = document.getElementById('MainForm');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            $chartContainer.slideUp(300);
            $buttonText.text('Show Chart');
        }
    });
});
