function calculateBMR() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseFloat(document.getElementById("age").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const lactation = parseFloat(document.getElementById("lactation").value);
  const resultBox = document.getElementById("result");

  if (isNaN(weight) || isNaN(height) || isNaN(age)) {
    resultBox.innerHTML = "⚠️ Mohon isi semua data!";
    resultBox.classList.remove("d-none");
    return;
  }

  // Rumus BMR untuk wanita
  let bmr = 10 * weight + 6.25 * height - 5 * age - 161;

  // TDEE (BMR × faktor aktivitas)
  let tdee = bmr * activity;

  // Tambahan kalori untuk ibu menyusui
  let totalCalories = tdee + lactation;

  resultBox.innerHTML = `
      🔹 BMR: ${bmr.toFixed(0)} kalori<br>
      🔹 Kebutuhan harian (TDEE): ${tdee.toFixed(0)} kalori<br>
      🔹 Total kebutuhan (dengan menyusui): <b>${totalCalories.toFixed(
        0
      )} kalori</b>
    `;
  resultBox.classList.remove("d-none");
}
