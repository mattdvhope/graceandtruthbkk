// This records each click on a video's link (visit to the video page).

export async function addVisit(name, picture) {
  const saved_person = await fetch(`https://graphql-rails-pg1.herokuapp.com/users`, {
  // const saved_person = await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `name=${name}&picture=${picture}`
  });
  const saved_person_data = await saved_person.json()
  sessionStorage.setItem("user_data", JSON.stringify(saved_person_data))
}

export const linkVisit = () => {
  const user_data = JSON.parse(sessionStorage.getItem("user_data"));
  let visits = user_data.user.visits
  addVisit(user_data.user.name, user_data.user.picture)
  console.log(visits + 1)
}