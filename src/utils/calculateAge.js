export function calculateAge(birthDate) {
    const today = new Date();
    const [year, month, day] = birthDate.split("-").map(Number); // Split the date
    const birthDateObj = new Date(year, month - 1, day); // Create Date object (month starts at 0)
  
    let age = today.getFullYear() - birthDateObj.getFullYear(); // Difference in years
  
    // Adjust if the birthday hasn't occurred yet this year
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
  
    if (
      currentMonth < birthDateObj.getMonth() ||
      (currentMonth === birthDateObj.getMonth() && currentDay < birthDateObj.getDate())
    ) {
      age--;
    }
  
    return age;
  }