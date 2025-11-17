import React, { useState, useEffect } from 'react'

const Logo = (props) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const fullText = 'Barely Social';

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
        <div
            className="bg-dark-blue-900 min-h-screen flex justify-center items-center"
            style={{ minWidth: props.width }}
        >
            <h1 className='font-semibold text-9xl text-blue-400'>
                {text}
                <span className="animate-pulse font-thin">|</span>
            </h1 >
        </div >
    )
}

export default Logo