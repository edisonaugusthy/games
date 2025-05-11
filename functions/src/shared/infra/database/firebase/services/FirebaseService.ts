import { getFirestore } from "firebase-admin/firestore";

export class FirebaseService {
  private readonly db = getFirestore();
  private collection: string;
  constructor(collection: string) {
    this.collection = collection;
  }

  async createOne(data: any) {
    const response = await this.db
      .collection(this.collection)
      .doc(data.gameId)
      .set(data);
    return response;
  }

  // getAll() {

  // }

  // getOne() {
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `users/${userId}`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // updateOne() {
  //   const db = getDatabase();

  //   // A post entry.
  //   const postData = {
  //     author: username,
  //     uid: uid,
  //     body: body,
  //     title: title,
  //     starCount: 0,
  //     authorPic: picture,
  //   };

  //   // Get a key for a new Post.
  //   const newPostKey = push(child(ref(db), "posts")).key;

  //   // Write the new post's data simultaneously in the posts list and the user's post list.
  //   const updates = {};
  //   updates["/posts/" + newPostKey] = postData;
  //   updates["/user-posts/" + uid + "/" + newPostKey] = postData;

  //   return update(ref(db), updates);
  // }

  // deleteOne() {
  //   //remove
  // }
}
