import React from 'react'

function Form({value, onPaste, onInput, form_num}) {
    return (
        <div className='text-input'>
            <label htmlFor="one">{form_num}:</label>
            <input
                className='form_input'
                type="text"
                value={value}
                onInput={onInput}
                onPaste={onPaste}
                required
                autoFocus={form_num == 1? true: false}
            />
        </div>
    )
}

export default Form