"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { IoLogoGithub } from "react-icons/io";
import Link from 'next/link';

const Content = () => {
    const [url, setUrl] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [error, setError] = useState('');

    const options = ["PNG", "JPEG", "PDF"];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const qrCodeRef = useRef(null);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

    const handleDownload = async () => {
        if (!qrCodeUrl) return;

        const canvas = await html2canvas(qrCodeRef.current);
        const imageData = canvas.toDataURL(`image/${selectedOption.toLowerCase()}`);

        if (selectedOption === 'PDF') {
            const pdf = new jsPDF();
            pdf.addImage(imageData, 'JPEG', 0, 0);
            pdf.save('download.pdf');
        } else {
            const link = document.createElement('a');
            link.href = imageData;
            link.download = `download.${selectedOption.toLowerCase()}`;
            link.click();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validUrl = false;
        try {
            new URL(url);
            validUrl = true;
        } catch (_) {
            validUrl = false;
        }

        if (url && validUrl) {
            setError('');
            try {
                const Response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url })
                })
                const data = await Response.json();

                if (Response.ok) {
                    setQrCodeUrl(data.qrCodeUrl);
                } else {
                    setError(data.error || 'No Response');
                }
            } catch (error) {
                setError(error.message || 'An error occurred');
            }
        } else {
            setError('Enter a valid URL');
        }
    };

    return (
        <div className='lg:h-[90vh] lg:w-[90vw] h-[98vh] w-[98vw] overflow-y-scroll  bg-white shadow-2xl shadow-black rounded-2xl border-2 border-black flex lg:flex-row flex-col overflow-hidden'>
            <div className='h-full lg:w-[50%] w-[100%] p-6 py-20  flex flex-col gap-20 justify-center'>
                <div className='text-7xl font-extrabold font-sans'>
                    Convert your Link to QR code
                </div>
                <div className="max-w-sm space-y-3">
                    <form onSubmit={handleSubmit} className='flex flex-row gap-2'>
                        <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-white dark:focus:ring-neutral-600" placeholder="PASTE URL HERE" />
                        <input type='submit' className='px-3 text-sm rounded-xl text-white bg-black' />
                    </form>
                    {error && <div className='pl-2' style={{ color: 'red' }}>{error}</div>}
                </div>
                <div className='text-xl'>
                    Your QR code will be generated automatically, and your generated QR code will open this URL.
                </div>
            </div>
            <div className='h-full lg:w-[50%] w-[100%] bg-gray-400/40 flex flex-col items-center justify-center gap-6 p-6'>
                <div ref={qrCodeRef} className='h-[20rem] w-[20rem] border-2 border-solid border-black rounded-2xl overflow-hidden flex items-center justify-center'>
                    {qrCodeUrl ? (
                        <Image className='h-full w-full' height={100} width={100} src={qrCodeUrl} alt="QR Code" />
                    ) : (
                        <div className='text-9xl font-extrabold'>
                            QR
                        </div>
                    )}
                </div>
                <div className='flex flex-row gap-9'>
                    <div onClick={handleDownload} className='px-4 p-2 text-white bg-black rounded-lg cursor-pointer'>
                        DOWNLOAD
                    </div>
                    <div className="w-full">
                        <select
                            value={selectedOption}
                            onChange={handleChange}
                            className="text-sm px-4 p-3 rounded-lg bg-black text-white"
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            <Link href={'https://github.com/AdarshGzz'} className=' absolute rounded-full p-4 flex flex-row items-center'>
                <IoLogoGithub className='h-[2rem] w-[2rem]' />
                <div className=' text-xl font-extrabold'>
                    @AdarshGzz
                </div>
            </Link >
        </div>
    );
}

export default Content;
