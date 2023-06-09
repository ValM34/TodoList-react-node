function User() {
  fetch('http://127.0.0.1:3000/user')
    .then(res => res.json())
    .then(res => console.log(res))
  return (
    <div>
      Liste de tous les utilisateurs
    </div>
  );
}

export default User;