import { memo } from 'react'
import './MovieForm.css'
import { useState } from 'react'
const MovieForm = () => {
    const [title, setTitle] = useState("")
    const [openingText, setOpeningText] = useState("")
    const [releaseDate, setReleaseDate] = useState("")

    const titleHandeler = (e) => {
        console.log(e.target.value)
        setTitle(e.target.value)
    }

    const openingTextHandeler = (e) => {
        setOpeningText(e.target.value)
    }

    const releaseDateHandeler = (e) => {
        setReleaseDate(e.target.value)
    }


    // when user submit the form 
    const movieSubmitHandeler = (e) => {
        e.preventDefault()
        const SubmitedData = {
            title: title,
            ReleaseDate: releaseDate,
            openingText: openingText,
        }
        console.log(SubmitedData)

        setTitle("");
        setOpeningText("");
        setReleaseDate("");
    }

    return <div>
        <form className='main-form' >
            <div className='form-item-wrapper'>
                <div className='form-container'>
                    <label htmlFor='name'>Title</label>
                    <input type='text' className='form-inputs' value={title} onChange={titleHandeler} />
                </div>
                <div className='form-container'>
                    <label htmlFor='name'>Opening Text</label>
                    <input type='text' className='form-inputs' value={openingText} onChange={openingTextHandeler} />
                </div>
                <div className='form-container'>
                    <label htmlFor='name'>Release Date</label>
                    <input type='text' className='form-inputs' value={releaseDate} onChange={releaseDateHandeler} />
                </div>
                <button className='form-submit-btn' onClick={movieSubmitHandeler}>Add Now</button>
            </div>
        </form>
    </div>
}

export default memo(MovieForm);