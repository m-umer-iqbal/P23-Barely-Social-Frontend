import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logo = (props) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const navigate = useNavigate();

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
            className="bg-dark-blue-900 min-h-screen flex flex-col justify-center items-center"
            style={{ minWidth: props.width }}
        >
            <h1 className='font-semibold text-9xl text-blue-400'>
                {text}
                <span className="animate-pulse font-thin">|</span>
            </h1 >

            {(props.slash === "true" && props.width === "100vw") && (
                <div className='flex gap-4 my-8'>
                    <a href="/login" onClick={() => {
                        navigate("/login")
                    }}>
                        <button className='text-3xl bg-blue-400 text-dark-blue-900 font-semibold rounded my-4 px-8 py-4 hover:bg-off-blue-200 cursor-pointer'>Login</button>
                    </a>

                    <a href="/create-account" onClick={() => {
                        navigate("/create-account")
                    }}>
                        <button className='text-3xl bg-blue-400 text-dark-blue-900 font-semibold rounded my-4 px-8 py-4 hover:bg-off-blue-200 cursor-pointer'>Create Account</button>
                    </a>
                </div>
            )}
            {(props.slash === "false" && props.width === "100vw") && (
                <div className="flex flex-col gap-2 justify-center items-center mt-4">
                    <p className="text-blue-400 text-4xl font-semibold animate-pulse mt-6">
                        Loading...
                    </p>
                    <p className="text-blue-400 text-4xl font-semibold animate-pulse mt-6">
                        Because Being Social Takes Efforts...
                    </p>
                </div>
            )}
        </div >
    )
}

export default Logo