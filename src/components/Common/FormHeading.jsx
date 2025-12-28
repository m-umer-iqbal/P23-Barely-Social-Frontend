import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const FormHeading = (props) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const navigate = useNavigate();

    const fullText = props.heading;

    useEffect(() => {
        let timer;
        const handleType = () => {
            const i = loopNum % fullText.length;
            const currentText = isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1);

            setText(currentText);
            setTypingSpeed(isDeleting ? 75 : 150);

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        timer = setTimeout(handleType, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, fullText]);

    return (
        <h2 className='text-3xl text-dark-blue-900 font-semibold my-8
                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl'>
            {text}
            <span className="animate-pulse font-thin">|</span>
        </h2>
    )
}

export default FormHeading
