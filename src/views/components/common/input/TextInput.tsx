import React from 'react';
import styled from 'styled-components';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    enter?: () => void;
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({label, className, type = 'text', name, value, placeholder = '', readOnly = false, disabled = false, tabIndex = 0, enter, change } : PropsType) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            if(enter) enter();
        }
    }

    const handleValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(change) change(e);
    }

    return (
        <span className={className}>
            <input type={type} name={name} placeholder={placeholder} readOnly={readOnly} tabIndex={tabIndex} onKeyPress={handleKeyPress} onChange={handleValueChange} />
            {label ? <label htmlFor={name}>{label}</label> : ''}
        </span>
    );
};

export const BasicTextInput = styled(TextInput)`
    display: inline-flex;
    flex-direction: column-reverse;

    label{
        display:block;
        margin-bottom: 5px;
    }
    input {
        padding: 10px;
    }
    
`;

export const MerterialInput = styled(BasicTextInput)`
    position:relative;

    label{
        position:absolute;
        top:0;
        left:5px;
        z-index: 1;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 3px 5px;
        pointer-events: none;
        transition: font-size 0.2s, top 0.2s;
        font-size: 1em;
        transform: translate(0px,0px);
    }

    input {
        &:focus{
            ~ label { 
                height:auto;
                font-size: 0.5em;
                top:-7px;
                /* left: 0; */
                background-color: #fff;
            }
        }
    }
`;

export default BasicTextInput;