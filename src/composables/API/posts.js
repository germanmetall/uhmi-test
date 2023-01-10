export async function getPosts(){
    let resp = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    return await resp.json();
}