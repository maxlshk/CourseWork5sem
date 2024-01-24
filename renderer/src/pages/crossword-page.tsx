import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { Dots } from "react-activity";
import { Crossword as ImportedCrossword } from '@jaredreisinger/react-crossword';

export default function CrosswordPage() {
    console.log('crossword page is rendered here')
    // localStorage.clear();

    const [theme, setTheme] = useState(localStorage.getItem('theme') || '');
    const [clueStyle, setClueStyle] = useState(localStorage.getItem('clueStyle') || '');
    const [size, setSize] = useState(localStorage.getItem('size') || '');
    const [clueStyleOptions, setClueStyleOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const crosswordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    // const [crosswordData, setCrosswordData] = useState('');
    let defaultCrosswordData;
    console.log(localStorage.getItem('crosswordData'))
    if (localStorage.getItem('crosswordData') === null) {
        defaultCrosswordData = '';
        console.log('crossword data is null')
    }
    else {
        console.log('crossword data is not null, trying to read crossword data...')
        defaultCrosswordData = JSON.parse((localStorage.getItem('crosswordData') as any));
        console.log('crossword data is read and attempted to be parsed')
    }
    const [crosswordData, setCrosswordData] = useState(defaultCrosswordData);

    const allFieldsFilled = theme && clueStyle && size;

    useEffect(() => {
        localStorage.setItem('theme', theme);
        localStorage.setItem('clueStyle', clueStyle);
        localStorage.setItem('size', size);
    }, [theme, clueStyle, size]);

    useEffect(() => {
        console.log(JSON.stringify(crosswordData))
        // console.log(JSON.parse((localStorage.getItem('crosswordData') as any)) )
        localStorage.setItem('crosswordData', JSON.stringify(crosswordData));
    }, [crosswordData])

    const ipcRenderer = (window as any).ipcRenderer;

    ipcRenderer.on('crossword:renderedAccept', (clueStyleOptionsParam: any, sizeOptionsParam: any) => {
        console.log('ipc renderer in crossword page works here')
        setClueStyleOptions(clueStyleOptionsParam);
        setSizeOptions(sizeOptionsParam);
    });
    ipcRenderer.on('crossword:dataAccept', (data: any) => {
        console.log('ipc renderer in component works here')
        // console.log(data);
        setIsLoading(false);
        setCrosswordData(data);
    });

    useEffect(() => {
        console.log('use effect in crossword page works here');
        ipcRenderer.send('crossword:renderedRequest');
    }, []);
    function generateCrosswordData(topic: any, size: any, clueStyle: any) {
        console.log('use effect in component works here');
        ipcRenderer.send('crossword:dataRequest', topic, size, clueStyle);
        setIsLoading(true);
    }
    function checkCrossword() {
        console.log((crosswordRef as any).current.isCrosswordCorrect());
    }

    return (
        <div className='crosswordSpace'>
            <div className='detailsSpace' style={{ width: '100%' }}>
                <details className='detailsBar' style={{ color: 'rgba(174, 203, 250, 1)', cursor: 'pointer' }}>
                    <summary style={{ fontWeight: 'bold', fontSize: '20px' }}>Customization</summary>
                    <div className='flex flex-row'>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>

                            {/* Theme */}
                            <label htmlFor="themeLabel" className="block mt-4 mb-2 text-sm font-medium ">Theme</label>
                            <input type="text" id="themeLabel"
                                className="text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder-inherit"
                                placeholder="Sport"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                required />

                            {/* Clue Style */}
                            <label htmlFor="clueStyle" className="block mt-3 mb-2 text-sm font-medium">Clue Style</label>
                            <select id="clueStyle"
                                className="text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={clueStyle}
                                onChange={(e) => setClueStyle(e.target.value)}>
                                <option value="">Choose an option</option>
                                {clueStyleOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {/* Size */}
                            <label htmlFor="sizeSelect" className="block mt-3 mb-2 text-sm font-medium">Size</label>
                            <select id="sizeSelect"
                                className="text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}>
                                <option value="">Choose an option</option>
                                {sizeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column-reverse', width: '40%', alignItems: 'center' }}>
                            <button type="button"
                                className={` ${!allFieldsFilled ? "cursor-not-allowed opacity-60 " : "dark:shadow-lg dark:shadow-teal-800/80"} w-3/5 h-1/5 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8 dark:bg-sky-700 dark:hover:bg-sky-900 focus:outline-none dark:focus:ring-blue-800`}
                                disabled={!allFieldsFilled}
                                onClick={() => { generateCrosswordData(theme, size, clueStyle) }}>
                                Generate
                            </button>
                            <button type="button"
                                className={` ${!allFieldsFilled ? "cursor-not-allowed opacity-60" : "dark:shadow-lg dark:shadow-gray-900 shadow"} w-3/5 h-1/5 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 mt-8 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 `}
                                disabled={!allFieldsFilled}
                                onClick = {() => { checkCrossword() }}>
                                Check 
                            </button>
                        </div>
                    </div>
                </details>
            </div>
            {/* <Crossword /> */}
            {(crosswordData && !isLoading) ?
                <ImportedCrossword
                    ref={(crosswordRef as any)}
                    data={(crosswordData as any)}
                    theme={{
                        gridBackground: 'rgb(13, 26, 32)',
                        cellBackground: 'rgb(13, 26, 32)',
                        cellBorder: '#cccccc',
                        textColor: '#cccccc',
                        numberColor: '#cccccc',
                        highlightBackground: '#6be1d9',
                        focusBackground: 'rgb(174, 203, 250)',
                        columnBreakpoint: '768px',
                    }}
                />
                : (isLoading ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                        <Dots />
                    </div>
                    : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Generate a crossword</h1>
                    </div>)
            }
        </div>

    )
}
