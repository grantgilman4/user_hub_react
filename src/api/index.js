
const BASE = 'https://jsonplace-univclone.herokuapp.com'

export async function getUsers() {
  try {
    const response = await fetch(`${BASE}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPostsByUser(userId) {
  try {
    const response = await fetch(`${BASE}/users/${userId}/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTodosByUser(userId) {
  try {
    const response = await fetch(`${BASE}/users/${userId}/todos`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}