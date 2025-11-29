export default function UserDashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h2>User Dashboard</h2>
      <p>You can book cars & cooks here.</p>

      <ul>
        <li><a href="/cars">View Cars</a></li>
        <li><a href="/cooks">View Cooks</a></li>
      </ul>
    </div>
  );
}
