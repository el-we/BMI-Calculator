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

function updateDescription(bmi, height, weight) {
    // Normalgewichtsbereich berechnen
    let minWeight = 18.5 * Math.pow(height, 2);
    let maxWeight = 24.9 * Math.pow(height, 2);

    let description = "";

    // Differenz zum Normalgewicht
    if (bmi < 18.5) {
        description += `<br/>Sie sind untergewichtig und müssten etwa ${(minWeight - weight).toFixed(1)} kg zunehmen, um das Normalgewicht für Ihre Größe zu erreichen.`;
    } else if (bmi > 24.9) {
        description += `<br/>Sie sind übergewichtig und müssten etwa ${(weight - maxWeight).toFixed(1)} kg abnehmen, um das Normalgewicht für Ihre Größe zu erreichen.`;
    } else {
        description += `<br/>Sie haben Normalgewicht.`;
    }

    description += `<br/>Der Normalgewichtsbereich für Ihre Größe liegt zwischen ${minWeight.toFixed(1)} kg und ${maxWeight.toFixed(1)} kg.`;
    return description;
}

jQuery(document).ready(function($) {

    let weightInput = $("#weight");
    let heightInput = $("#height");
    let bmiValue = $("#bmiValue");
    let bmiDescription = $("#bmiDescription");

    function updateBMI() {
        let weight = parseFloat(weightInput.val());
        let height = parseFloat(heightInput.val());

        if (weight > 0 && height > 0) {
            let bmi = bmiCalculator(weight, height);
            let categoryInfo = bmiCategory(bmi);

            bmiValue
                .removeClass("text-primary text-success text-warning text-danger")
                .addClass(categoryInfo.class)
                .text(`Ihr BMI ist: ${bmi}`);

            bmiDescription
                .html(`Kategorie: ${categoryInfo.category}<br/>`)
                .append(updateDescription(bmi, height, weight));
        } else {
            bmiValue.text("");
            bmiDescription.html("");
        }
    }

    weightInput.on('input', updateBMI);
    heightInput.on('input',updateBMI);
});
