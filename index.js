// function to calculate bmi
function bmiCalculator(weight, height) {
    var bmi = weight / Math.pow(height, 2);
    // return bmi and round to 1 decimal place
    return bmi.toFixed(1);
}

function bmiCategory(bmi) {
    if (bmi < 18.5) {
        return {category: "Untergewicht", class: "text-primary"};
    } else if (bmi < 25) {
        return {category: "Normalgewicht", class: "text-success"};
    } else if (bmi < 30) {
        return {category: "Übergewicht", class: "text-warning"};
    } else {
        return {category: "Adipositas", class: "text-danger"};
    }
}

function updateResult(bmi, height, weight) {
    let result = document.getElementById("result");
    let categoryInfo = bmiCategory(bmi);

    result.classList.remove("text-primary", "text-success", "text-warning", "text-danger");
    result.classList.add(categoryInfo.class);

    result.innerHTML = `
    Ihr BMI ist: ${bmi} <br>
    Kategorie: ${categoryInfo.category}
    `;

    // Normalgewichtsbereich berechnen
    let minWeight = 18.5 * Math.pow(height, 2);
    let maxWeight = 24.9 * Math.pow(height, 2);

    // Differenz zum Normalgewicht
    if (bmi < 18.5) {
        result.innerHTML += `<br>Sie sind untergewichtig und müssten etwa ${(minWeight - weight).toFixed(1)} kg zunehmen, um das Normalgewicht für Ihre Größe zu erreichen.`;
    } else if (bmi > 24.9) {
        result.innerHTML += `<br>Sie sind übergewichtig und müssten etwa ${(weight - maxWeight).toFixed(1)} kg abnehmen, um das Normalgewicht für Ihre Größe zu erreichen.`;
    } else {
        result.innerHTML += `<br>Sie haben Normalgewicht.`;
    }

    result.innerHTML += `<br>Der Normalgewichtsbereich für Ihre Größe liegt zwischen ${minWeight.toFixed(1)} kg und ${maxWeight.toFixed(1)} kg.`;
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
            updateResult(bmi, height, weight);
        } else {
            result.innerText = "";
        }
    }

    weightInput.addEventListener("input", updateBMI);
    heightInput.addEventListener("input", updateBMI);
} );
