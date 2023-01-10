export async function getComments(){
    let resp = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    return await resp.json();
}