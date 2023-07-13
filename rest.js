import db from "./db.js";
import { collection, query, addDoc, getDocs } from "firebase/firestore";

async function addPost(data) {

    try {

        const postRef = await addDoc(collection(db, "posts"), data);

        console.log(`post: ${postRef.id}`)

        return true;

    } catch (e) {

        console.log("Error:", e);

        return false;

    }
    
}

async function getPosts() {

    try {

        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });

        return posts;

    } catch (e) {

        console.log("Error:", e)
        
    }
    
}

export { addPost, getPosts };