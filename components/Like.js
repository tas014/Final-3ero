import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { db } from "../APIs/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Like() {
    const {user, authUser} = useContext(UserContext);
    const router = useRouter();
    const [liked, setLiked] = useState(false)
    const lbRef = router.pathname.slice(router.pathname.lastIndexOf('/')+1);

    useEffect(()=>{
        if (user && Object.keys(user).length > 0) {
            if (user.likedGames.includes(lbRef)) {
                setLiked(true)
            } else {
            }
        }
    },[user])

    const handleLike = async () => {
        const likeState = !liked;
        setLiked(likeState);

        const userDoc = doc(db, 'users', authUser.uid);
        const newLikeArr = [...user.likedGames];
        const present = newLikeArr.includes(lbRef)

        if(likeState) {
            newLikeArr.push(lbRef) 
        } else {
            if (present) {
                newLikeArr.splice(newLikeArr.indexOf(lbRef), 1)
            }
        }

        const newData = {
            ...user,
            likedGames: removeDuplicates(newLikeArr)
        }
        try {
            await updateDoc(userDoc, newData);
        } catch (ex) {
            console.log(ex)
        }
    }

    const removeDuplicates = (arr) => {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    return (
        <div className="likeContainer">
            <button className={liked ? 'like like-active' : 'like like-inactive'} onClick={handleLike}>
                <FontAwesomeIcon icon={SolidHeart} />
            </button>
        </div>
    )
};
