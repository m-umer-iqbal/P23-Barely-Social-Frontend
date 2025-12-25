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
            <h1 className='font-semibold text-5xl text-off-blue-200
                            sm:text-6xl
                            md:text-7xl
                            lg:text-8xl
                            xl:text-9xl'>
                {text}
                <span className="animate-pulse font-thin">|</span>
            </h1 >

            {(props.slash === "true" && props.width === "100vw") && (
                <div className='flex gap-2 my-4 text-off-blue-200
                                md:my-6 md:text-2xl
                                xl:my-8 xl:text-3xl'>
                    <a href="/login" onClick={() => {
                        navigate("/login")
                    }}>
                        <button className='bg-dark-blue-900 text-off-blue-200 border-2 border-off-blue-200 font-semibold rounded-4xl px-4 py-2 hover:bg-off-blue-200 hover:text-dark-blue-900 cursor-pointer transition-all duration-300 ease-in-out
                                            md:px-6 md:py-3
                                            xl:px-8 xl:py-4'>Log In</button>
                    </a>

                    <a href="/create-account" onClick={() => {
                        navigate("/create-account")
                    }}>
                        <button className='bg-dark-blue-900 text-off-blue-200 border-2 border-off-blue-200 font-semibold rounded-4xl px-4 py-2 hover:bg-off-blue-200 hover:text-dark-blue-900 cursor-pointer transition-all duration-300 ease-in-out
                                            md:px-6 md:py-3
                                            xl:px-8 xl:py-4'>Sign Up</button>
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