import { async } from "@firebase/util"
import { db } from '../../APIs/firebaseConfig'
import { updateDoc, deleteDoc ,doc } from "firebase/firestore";

export default function GamesList({ data:games }) {

    const handleEdit = async (id) =>{
        const gameDoc = doc(db, 'games', id)
        const newFields = {
            title: 'PULL IT',
        }

        try {
            await updateDoc(gameDoc, newFields)
            console.log('updated', gameDoc)  
        } catch (ex) {
            console.log(ex)
        }
        
    }

    const handleDelete = async (id) =>{
        const gameDoc = doc(db, 'games', id)
        
        try {
            await deleteDoc(gameDoc)
            console.log('RIPBOZO') 
        } catch (ex) {
            console.log(ex)
        }        
    }

    return (
        <div>
            <div>
                <span>Title</span>
                <span>Reference</span>
            </div>
            <div>
            {games.map((game) => {
                return (
                    <div key={game.id}>
                        <div>
                            <h3>{game.title}</h3>
                            <small>{game.reference}</small>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(game.id)} >Edit</button>
                            <button onClick={() => handleDelete(game.id)}>Delete</button>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
};
