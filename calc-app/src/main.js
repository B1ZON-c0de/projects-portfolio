const exam = document.getElementById("exam");
const prevExam = document.getElementById("prevExam");
const negOrPos = document.getElementById("negOrPos");
const buttons = document.querySelectorAll(".btn-input");
const clearBtn = document.getElementById("clearBtn");
const delLastChar = document.getElementById("delLastChar");
const equal = document.getElementById("equal");

equal.addEventListener("click", () => {
  prevExam.value = exam.value;
  try {
    exam.value = eval(exam.value);
    if (exam.value === "Infinity" || exam.value === "-Infinity") {
      exam.value = "Ошибка";
    }
  } catch (e) {
    exam.value = "Ошибка";
  }
  if (exam.value === "Ошибка") {
    setTimeout(() => {
      exam.value = "";
      prevExam.value = "";
    }, 1000);
  }
});

negOrPos.addEventListener("click", () => {
  if (/^-./g.test(exam.value)) {
    exam.value = exam.value.replace("-", "");
  } else {
    exam.value = "-" + exam.value;
  }
});

delLastChar.addEventListener("click", (e) => {
  exam.value = exam.value.slice(0, -1);
});

clearBtn.addEventListener("click", (e) => {
  exam.value = "";
  prevExam.value = "";
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    exam.value += e.target.textContent.trim();
  });
});
