import React from 'react'
// import "./style.css";
import { Crossword as ImportedCrossword } from '@jaredreisinger/react-crossword';

export default function Crossword() {
    const data =
    {
        across: {
            '2': {
                clue: " A tiny shrimp-like creature, found in Antarctica's icy waters, is a food source for whales; its name starts and ends with a certain letter.",
                answer: 'Krill',
                row: 3,
                col: 20
            },
            '3': {
                clue: " A sea creature's home, often found in vibrant reefs, built from its own secretions.",
                answer: 'Coral',
                row: 1,
                col: 21
            },
            '5': {
                clue: " A sea flower, with petals shaped like a dancer's tutu, brings good luck to sailors in myth.",
                answer: 'Anemone',
                row: 5,
                col: 15
            },
            '10': {
                clue: ' A mollusc-like creature dwells within its spiral home, secreting calcium to build layers of protection.',
                answer: 'Mollusk',
                row: 17,
                col: 2
            },
            '11': {
                clue: ' An eight-tentacled mollusk, master of disguise undersea.',
                answer: 'Octopus',
                row: 17,
                col: 10
            },
            '12': {
                clue: ' Creature with stinging tentacles, underwater it pulses like a jelly - what is this?',
                answer: 'Jellyfish',
                row: 8,
                col: 8
            },
            '14': {
                clue: ' A playful aquatic mammal has a fin on each side, resembling a smiley face when leaping from water.',
                answer: 'Dolphin',
                row: 14,
                col: 0
            },
            '17': {
                clue: ' Huddled in a can, these small fish are packed like sardines (9)',
                answer: 'Sardine',
                row: 15,
                col: 7
            },
            '18': {
                clue: ' Served with lemons and dill, this fish may be found swimming upstream (6).',
                answer: 'Salmon',
                row: 13,
                col: 8
            },
            '19': {
                clue: " In tropical seas, an agile hunter with a fearsome grin; its nickname's a type of fish, and it's a car model too.",
                answer: 'Barracuda',
                row: 11,
                col: 8
            },
            '20': {
                clue: ' Packed in oil, found in your sandwiches, often canned, it has no bones but might have some spines; what am I?',
                answer: 'Tuna',
                row: 3,
                col: 14
            }
        },
        down: {
            '1': {
                clue: " A wave's force pulls back with the moon's gravitational sway; in essence, this power comes from far above and beneath today. (Answer: Tidal)",
                answer: 'Tidal',
                row: 13,
                col: 5
            },
            '3': {
                clue: ' A constant flow of electricity is what we call this, but its meaning goes beyond just volts and amps (8)',
                answer: 'Current',
                row: 1,
                col: 21
            },
            '4': {
                clue: ' Aquatic algae used as a tasty snack by sly marine mammals, not seagulls.',
                answer: 'Kelp',
                row: 6,
                col: 11
            },
            '5': {
                clue: " From the depths of ocean's heart, an expanse of darkness where none can chart.",
                answer: 'Abyss',
                row: 5,
                col: 15
            },
            '6': {
                clue: ' A sheltered spot where fisherfolk may hide their boats (4).',
                answer: 'Cove',
                row: 5,
                col: 9
            },
            '7': {
                clue: ' A body of water not quite sea but not quite stream, with shores that form a languid dream (5).',
                answer: 'Lagoon',
                row: 10,
                col: 12
            },
            '8': {
                clue: ' A submerged mountain range full of vibrant marine life, also known as a barrier to navigation (7).',
                answer: 'Reef',
                row: 5,
                col: 13
            },
            '9': {
                clue: " In Jules Verne's world, a dwelling with spiral chambers and a unique living arrangement.",
                answer: 'Nautilus',
                row: 10,
                col: 16
            },
            '13': {
                clue: ' A famous fisherman might hook this large, tropical fish often caught off the Florida coast.',
                answer: 'Marlin',
                row: 0,
                col: 24
            },
            '15': {
                clue: ' A marine mammal that breaches with such grace, carrying tales of Moby Dick on its vast expanse.',
                answer: 'Whale',
                row: 1,
                col: 17
            },
            '16': {
                clue: " A fish with many scales, found in a go-by sea, its name's an onomatopoeia.",
                answer: 'Goby',
                row: 4,
                col: 19
            },
            '18': {
                clue: ' A predator with razor-sharp teeth lurks beneath the sea surface, hunting its prey with stealth and speed.',
                answer: 'Shark',
                row: 13,
                col: 8
            },
        }
    }

    const clueStyleOptions = [
        'one', 'two', 'three'
    ];

    const sizeOptions = [
        'Small', 'Medium', 'Large'
    ];

    return (

        <ImportedCrossword
            data={data}
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

    )
}
