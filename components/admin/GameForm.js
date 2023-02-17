import Form from "../Form"
import Joi from 'joi-browser';
import { db } from '../../APIs/firebaseConfig'
import { collection, addDoc } from "firebase/firestore";

class GameForm extends Form {

    gamesCollectionRef = collection(db, 'games')
    
    state = {
        data:{
            title: '',
            imgUrl: '',
            reference: '',
        },
        errors:{}
    }
    
    schema = {
        title: Joi.string().required().label('Game Title'),
        imgUrl: Joi.string().required().label('Image URL'),
        reference: Joi.string().required().label('Reference to filename'),
    }
        
    doSubmit = async () => {
        console.log(this.state)
        try {
            await addDoc(this.gamesCollectionRef, {
                title:this.state.data.title,
                imgUrl:this.state.data.imgUrl,
                reference:this.state.data.reference 
            });
            console.log(this.state.data, 'submitted')
        } catch (ex) {
            console.log('something went wrong', ex)
        }   
    }

    render(){
        return(
        <form onSubmit={this.handleSubmit}>
            {this.renderInput('title', 'Game Title')}
            {this.renderInput('imgUrl', 'Image URL')}
            {this.renderInput('reference', 'Reference to filename')}
            {this.renderButton('Create')}
        </form>
        )
    }
}

export default GameForm