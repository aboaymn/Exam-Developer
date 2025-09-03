// حفظ اختيار التقنية والمستوى
document.querySelectorAll('.tech-options button').forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem('selectedTech', btn.dataset.tech);
  });
});
document.querySelectorAll('.level-options button').forEach(btn => {
  btn.addEventListener('click', () => {
    const level = btn.dataset.level;
    const tech = localStorage.getItem('selectedTech') || 'ALL';
    window.location.href = `quiz.html?tech=${tech}&level=${level}`;
  });
});