//Referance from youtube:"https://youtu.be/tBObk72EYYw?si=SQoC2lo2ycZgWCoi"
//Referance from chatgpt:"https://chatgpt.com/share/693dcbc6-add0-8008-bf76-50f05659fc0d"
//Referance from youtube:"https://youtu.be/k3Vfj-e1Ma4?si=5QZWOyVmEaeme-Bu"
export default function AdminDashboard() {
  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Dashboard</h2>

      <ul>
        <li><a href="/admin/users">Manage Users</a></li>
        <li><a href="/admin/providers">Manage Providers</a></li>
      </ul>
    </div>
  );
}
