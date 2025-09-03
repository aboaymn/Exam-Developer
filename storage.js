function saveResult(result){
  let results = JSON.parse(localStorage.getItem('results')||"[]");
  results.push(result);
  localStorage.setItem('results', JSON.stringify(results));
}
function loadResults(){
  return JSON.parse(localStorage.getItem('results')||"[]");
}