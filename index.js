// function to calculate bmi
function bmiCalculator(weight, height) {
    var bmi = weight / Math.pow(height, 2);
    // return bmi and round to 1 decimal place
    return bmi.toFixed(1);
}

function updateResultColor(bmi) {
    let result = document.getElementById("result");

    result.classList.remove("text-primary", "text-success", "text-warning", "text-danger");

    if (bmi < 18.5) {
        result.classList.add("text-primary");
    } else if (bmi < 25) {
        result.classList.add("text-success");
    } else if (bmi < 30) {
        result.classList.add("text-warning");
    } else {
        result.classList.add("text-danger");
    }
}


window.addEventListener("load", function () {
    let weightInput = document.getElementById("weight");
    let heightInput = document.getElementById("height");
    let result = document.getElementById("result");

    function updateBMI() {
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
        if (weight > 0 && height > 0) {
            let bmi = bmiCalculator(weight, height);
            result.innerText = "Ihr BMI ist: " + bmi;
            updateResultColor(bmi);
        } else {
            result.innerText = "";
        }
    }

    weightInput.addEventListener("input", updateBMI);
    heightInput.addEventListener("input", updateBMI);
} );