import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux"
import { addNewTicket } from '../actions/actions'

const NewTicketForm = props => {

    const [ newTicket, setNewTicket ] = useState({title: '', description:'', effort:''})

    const submitNewTicket = e => {
        console.log('submitted!')
        e.preventDefault()
        props.addNewTicket(newTicket)
    }

    const handleChanges = e => {
        setNewTicket({...newTicket, [e.target.name]: e.target.value})
    }

    return (


        <Form onSubmit={submitNewTicket}>

            <FormGroup>
            <Label htmlFor="title">
                Title
                <Input
                    id = "title"
                    type = "text"
                    name = "title"
                    value = {newTicket.title}
                    onChange = {handleChanges}
                    placeholder = "Title goes here"
                    />
   
            </Label>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="description">
                Description
                <Input 
                    id = "description"
                    type = "text"
                    name = "description"
                    value = {newTicket.description}
                    onChange = {handleChanges}
                    placeholder = "Describe your problem"
                    />

            </Label>
            </FormGroup>

            <FormGroup>
            <Label htmlFor = "effort">
                What I've tried
                <Input
                    id = "effort"
                    type = "text"
                    name = "effort"
                    value = {newTicket.effort}
                    onChange = {handleChanges}
                    placeholder = "What have you tried doing?"
         
                    />

            </Label>
            </FormGroup>

            <FormGroup>
            <Label htmlFor = "category">
                
                <select
                    id = "category"
                    name = "category">
                        <option>Pick a category</option>
                        <option value = "React">React</option>
                        <option value = "Back End">Back End</option>
                        <option value = "SASS">SASS</option>
                        <option value = "Animation">Animation</option>
                        </select>
            
            </Label>
            </FormGroup>

            <Button type = "submit" onClick={submitNewTicket}>
                Submit Ticket
            </Button>

        </Form>




    )

}

const mapsStateToProps = state => {
    return {
        tickets: state.tickets,
        title: state.title,
        description: state.description,
        effort: state.effort
    }
}

export default connect(
    mapsStateToProps,
    { addNewTicket }
    )(NewTicketForm)