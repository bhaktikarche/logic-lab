const ResultModal = ({ results }) => (
  <div className="mt-4 bg-gray-100 p-4 rounded">
    <h3 className="text-lg font-semibold">Results</h3>
    {results.results.map((r, i) => (
      <div key={i} className="my-2 p-2 border rounded">
        <p><strong>Input:</strong> {r.input}</p>
        <p><strong>Expected:</strong> {r.expected}</p>
        <p><strong>Actual:</strong> {r.actual}</p>
        <p className={r.passed ? "text-green-600" : "text-red-600"}>
          {r.passed ? "Passed ✅" : "Failed ❌"}
        </p>
      </div>
    ))}
    {results.passedAll && <p className="text-green-700 font-bold mt-2">🎉 All Test Cases Passed!</p>}
  </div>
);

export default ResultModal;
