export default function ProviderDashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Provider Dashboard</h2>
      <p>You can add cars & cooks here.</p>

      <ul>
        <li><a href="/create-car">Add Car</a></li>
        <li><a href="/create-cook">Add Cook</a></li>
      </ul>
    </div>
  );
}
