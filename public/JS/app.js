async function deletePost(id) {
  try {
      console.log("Button clicked", id);
      let url = `http://localhost:7080/posts/${id}`;
      let response = await fetch(url, {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      let res = await response.json();
      console.log(res);
  } catch (err) {
      console.error("Error deleting post:", err);
  }
}
