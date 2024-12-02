
// Access the sliders and their corresponding labels
const stoppageSlider = document.getElementById("stoppage-slider");
const profitSlider = document.getElementById("profit-slider");
const beltLengthSlider = document.getElementById("belt-length-slider");
const beltPriceSlider = document.getElementById("belt-price-slider");
const repairSlider = document.getElementById("repair-slider");

// Display values
const stoppageValue = document.getElementById("stoppage-value");
const profitValue = document.getElementById("profit-value");
const beltLengthValue = document.getElementById("belt-length-value");
const beltPriceValue = document.getElementById("belt-price-value");
const repairValue = document.getElementById("repair-value");

// Update slider labels dynamically
function updateValues() {
    stoppageValue.innerText = stoppageSlider.value;
    profitValue.innerText = profitSlider.value;
    beltLengthValue.innerText = beltLengthSlider.value;
    beltPriceValue.innerText = beltPriceSlider.value;
    repairValue.innerText = repairSlider.value;
}

// Chart.js setup
const ctx = document.getElementById("expenditure-chart").getContext("2d");
let expenditureChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [], // X-axis: Hours
        datasets: [
            {
                label: "HX kullanılmadığında toplam harcama (€)",
                data: [],
                borderColor: "red",
                borderWidth: 2,
                pointBackgroundColor: "red",
                fill: false,
            },
            {
                label: "HX kullanıldığında toplam harcama (€)",
                data: [],
                borderColor: "green",
                borderWidth: 2,
                pointBackgroundColor: "green",
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Saat" } },
            y: { title: { display: true, text: "Maliyet (€)" } },
        },
    },
});


function updateChart() {
    const stoppage = Number(stoppageSlider.value);
    const profit = Number(profitSlider.value);
    const beltLength = Number(beltLengthSlider.value);
    const beltPrice = Number(beltPriceSlider.value);
    const repair = Number(repairSlider.value);

    let hours = [];
    let withoutHX = [];
    let withHX = [];

    for (let i = 0; i <= stoppage; i++) {
        // Expenditures for each hour
        const profitWithoutHX = i * profit;
        const profitWithHX = i * profit * 0.3;

        const beltWithoutHX = beltLength * beltPrice;
        const beltWithHX = beltLength * beltPrice * 0.1;

        const repairWithoutHX = i * repair;
        const repairWithHX = i * repair * 0.3;

        withoutHX.push(profitWithoutHX + beltWithoutHX + repairWithoutHX);
        withHX.push(profitWithHX + beltWithHX + repairWithHX);
        hours.push(i);
    }

    expenditureChart.data.labels = hours;
    expenditureChart.data.datasets[0].data = withoutHX;
    expenditureChart.data.datasets[1].data = withHX;
    expenditureChart.update();
}

document.querySelectorAll("input[type='range']").forEach((slider) => {
    slider.addEventListener("input", () => {
        updateValues();
        updateChart();
    });
});

updateValues();
updateChart();
