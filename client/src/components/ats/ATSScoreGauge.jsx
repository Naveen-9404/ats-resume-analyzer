function ATSScoreGauge({ score }) {
  return (
    <div
      style={{
        width: 250,
        height: 250,
        background: "#f1f5f9",
        display: "grid",
        placeItems: "center",
        borderRadius: 20,
      }}
    >
      <h1>{score}%</h1>
    </div>
  );
}

export default ATSScoreGauge;